const db = require('../db');
const Joueur = require('./Joueur');

class Match {

    constructor(idmatch, dateMatch, lieuMatch, scoreEquipeA, scoreEquipeB, idSaison) {
        this.idmatch = idmatch;
        this.dateMatch = dateMatch;
        this.lieuMatch = lieuMatch;
        this.scoreEquipeA = scoreEquipeA;
        this.scoreEquipeB = scoreEquipeB;
        this.idSaison = idSaison;
        this.joueursA = [];
        this.joueursB = [];
    }

    // Méthode pour récupérer un match par son ID
    static async getMatchById(id) {
        try {
            const query = `
            SELECT m.idmatch, m.datematch, m.lieumatch, m.scoreequipea, m.scoreequipeb, m.idsaison,
                   j.idjoueur, j.nom, j.prenom, mj.equipe
            FROM public.match AS m
            JOIN public.match_joueur AS mj ON mj.idmatch = m.idmatch
            JOIN public.joueur AS j ON j.idjoueur = mj.idjoueur
            WHERE m.idmatch = $1
        `;

            // Exécution de la requête SQL avec le paramètre d'ID
            const result = await db.pool.query(query, [id]);

            if (result.rows.length > 0) {
                const matchData = result.rows[0];

                // Créer un objet pour le match avec les informations récupérées
                const match = new Match(
                    matchData.idmatch,
                    matchData.datematch,
                    matchData.lieumatch,
                    matchData.scoreequipea,
                    matchData.scoreequipeb,
                    matchData.idsaison
                );

                // Parcourir les résultats pour ajouter les joueurs à l'équipe correspondante
                result.rows.forEach(row => {
                    const joueur = {
                        idjoueur: row.idjoueur,
                        nom: row.nom,
                        prenom: row.prenom
                    };

                    // Ajouter le joueur à l'équipe A ou B selon la valeur de 'equipe'
                    if (row.equipe === 'A') {
                        match.joueursA.push(joueur);
                    } else if (row.equipe === 'B') {
                        match.joueursB.push(joueur);
                    }
                });

                return match;
            } else {
                throw new Error('Match non trouvé');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération du match:', error);
            throw new Error('Erreur lors de la récupération du match');
        }
    }


    static async getMatchsParSaison() {
        try {
            const result = await db.pool.query(`
            SELECT 
                m.idmatch, m.datematch, 
                m.scoreequipea, m.scoreequipeb, 
                j.idjoueur, j.nom, j.prenom, mj.equipe
            FROM public.match m 
            JOIN match_joueur mj ON m.idmatch = mj.idmatch 
            JOIN joueur j ON j.idjoueur = mj.idjoueur
            `);            let matchesMap = new Map(); // Pour regrouper les joueurs par match

            result.rows.forEach(row => {
                // Vérifie si le match existe déjà dans la map
                if (!matchesMap.has(row.idmatch)) {
                    matchesMap.set(row.idmatch, new Match(
                        row.idmatch,
                        row.datematch,
                        row.lieumatch,
                        row.scoreequipea,
                        row.scoreequipeb,
                        row.idsaison
                    ));
                }

                let match = matchesMap.get(row.idmatch);

                match.ajouteJoueur(new Joueur(row.idjoueur,row.nom,row.prenom), row.equipe);
            });

            return Array.from(matchesMap.values());
        } catch (error) {
            console.error('Erreur lors de la récupération des matchs:', error);
            throw new Error('Erreur lors de la récupération des matchs');
        }
    }

    static async creerMatch(dateMatch, lieuMatch, scoreEquipeA, scoreEquipeB, equipeA, equipeB) {
        const client = await db.pool.connect(); // Connexion à la base pour gérer la transaction

        try {
            await client.query('BEGIN');
            const queryMatch = `
            INSERT INTO match (datematch, lieumatch, scoreequipea, scoreequipeb, idsaison)
            VALUES ($1, $2, $3, $4, 3) RETURNING idmatch`;
            const valuesMatch = [dateMatch, lieuMatch, scoreEquipeA, scoreEquipeB];

            const resultMatch = await client.query(queryMatch, valuesMatch);
            const idMatch = resultMatch.rows[0].idmatch;

            // Insérer les joueurs des équipes A et B
            const queryJoueur = `INSERT INTO match_joueur (idmatch, idjoueur, equipe) VALUES ($1, $2, $3)`;

            for (const joueur of equipeA) {
                await client.query(queryJoueur, [idMatch, joueur.idjoueur, 'A']);
            }
            for (const joueur of equipeB) {
                await client.query(queryJoueur, [idMatch, joueur.idjoueur, 'B']);
            }

            await client.query('COMMIT');
            return idMatch;
        } catch (error) {
            await client.query('ROLLBACK'); // Annuler la transaction en cas d'erreur
            console.error("Erreur lors de l'enregistrement du match :", error);
            return 0;
        } finally {
            client.release(); // Libérer la connexion
        }
    }

    ajouteJoueur(joueur, equipe){
        if (equipe === 'A'){
            this.joueursA.push(joueur);
        }else {
            this.joueursB.push(joueur);
        }
    }

    static async ajouteButeur(idMatch, buts) {
        try {

            for (const but of buts) {
                await db.pool.query(
                    "INSERT INTO buteurs_match (idmatch, idjoueurbuteur, idjoueurpasseur, minutedubut) VALUES ($1, $2, $3, $4)",
                    [idMatch, but.buteur, but.passeur || null, but.minute]
                );
            }

            return true;
        } catch (error) {
            console.error("Erreur lors de l'ajout des buts :", error);
            return false;
        }
    }
}

module.exports = Match;
