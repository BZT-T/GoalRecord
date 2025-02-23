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
            const result = await db.pool.query('SELECT * FROM public.match WHERE idmatch = $1', [id]);
            if (result.rows.length > 0) {
                const matchData = result.rows[0];
                return new Match(
                    matchData.idmatch,
                    matchData.datematch,
                    matchData.lieumatch,
                    matchData.scoreequipea,
                    matchData.scoreequipeb,
                    matchData.idsaison
                );
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
        // static async getMatchsParSaison(idSaison) {
    //     try {
    //         const result = await db.query('SELECT * FROM public.match WHERE idsaison = $1', [idSaison]);
    //         return result.rows.map(matchData =>
    //             new Match(
    //                 matchData.idmatch,
    //                 matchData.datematch,
    //                 matchData.lieumatch,
    //                 matchData.scoreequipea,
    //                 matchData.scoreequipeb,
    //                 matchData.idsaison
    //             )
    //         );
    //     } catch (error) {
    //         console.error('Erreur lors de la récupération des matchs:', error);
    //         throw new Error('Erreur lors de la récupération des matchs');
    //     }
    // }

    // Méthode pour créer un nouveau match
    static async createMatch(dateMatch, lieuMatch, scoreEquipeA, scoreEquipeB, idSaison) {
        try {
            const result = await db.query(
                'INSERT INTO public.match (datematch, lieumatch, scoreequipea, scoreequipeb, idsaison) VALUES ($1, $2, $3, $4, $5) RETURNING idmatch',
                [dateMatch, lieuMatch, scoreEquipeA, scoreEquipeB, idSaison]
            );
            return new Match(
                result.rows[0].idmatch,
                dateMatch,
                lieuMatch,
                scoreEquipeA,
                scoreEquipeB,
                idSaison
            );
        } catch (error) {
            console.error('Erreur lors de la création du match:', error);
            throw new Error('Erreur lors de la création du match');
        }
    }

    // Méthode pour supprimer un match
    static async deleteMatch(idmatch) {
        try {
            const result = await db.query('DELETE FROM public.match WHERE idmatch = $1 RETURNING *', [idmatch]);
            if (result.rows.length === 0) {
                throw new Error('Match non trouvé');
            }
            return `Match ${idmatch} supprimé avec succès`;
        } catch (error) {
            console.error('Erreur lors de la suppression du match:', error);
            throw new Error('Erreur lors de la suppression du match');
        }
    }

    ajouteJoueur(joueur, equipe){
        if (equipe === 'A'){
            this.joueursA.push(joueur);
        }else {
            this.joueursB.push(joueur);
        }
    };
}

module.exports = Match;
