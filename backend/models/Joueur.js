const db = require('../db');

class Joueur {
    constructor(id, nom, prenom, nbBut, nbPasseD, nbVictoire, nbMatch) {
        this.idjoueur = id;
        this.nom = nom;
        this.prenom = prenom;
        this.nbBut = nbBut;
        this.nbPasseD = nbPasseD;
        this.nbVictoire = nbVictoire;
        this.nbMatch = nbMatch;
    }

    async getClassementJoueurs() {
        try {
            const result = await this.pool.query(`
            SELECT
                j.idjoueur,
                j.nom,
                j.prenom,
                COUNT(CASE WHEN ((mj.equipe = 'A' AND m.scoreequipea > m.scoreequipeb) OR (mj.equipe = 'B' AND m.scoreequipeb > m.scoreequipea)) THEN 1 END) AS nbVictoire,
                COUNT(bm.idbuteurmatch) AS nbBut,
                COUNT(pm.idbuteurmatch) AS nbPasseD,
                COUNT(mj.idmatchjoueur) AS nbMatch
            FROM
                public.joueur j
            JOIN
                public.match_joueur mj ON j.idjoueur = mj.idjoueur
            JOIN
                public.match m ON mj.idmatch = m.idmatch
            LEFT JOIN
                public.buteurs_match bm ON bm.idjoueurbuteur = j.idjoueur AND bm.idmatch = m.idmatch
            LEFT JOIN
                public.buteurs_match pm ON pm.idjoueurpasseur = j.idjoueur AND pm.idmatch = m.idmatch  -- Jointure avec la table des passes décisives
            GROUP BY
                j.idjoueur, j.nom, j.prenom
            ORDER BY
                nbBut DESC, nbPasseD DESC;
        `);
            return result.rows;
        } catch (error) {
            console.error("Erreur lors de la récupération du classement des joueurs :", error);
            throw new Error('Erreur lors de la récupération du classement des joueurs');
        }
    }

    static async getClassement() {
        try {
            const result = await db.pool.query(`
                SELECT
                    j.idjoueur,
                    j.nom,
                    j.prenom,
                    COUNT(CASE WHEN ((mj.equipe = 'A' AND m.scoreequipea > m.scoreequipeb) OR (mj.equipe = 'B' AND m.scoreequipeb > m.scoreequipea)) THEN 1 END) AS nbVictoire,
                    COUNT(bm.idbuteurmatch) AS nbBut,
                    COUNT(pm.idbuteurmatch) AS nbPasseD,
                    COUNT(mj.idmatchjoueur) AS nbMatch
                FROM
                    public.joueur j
                JOIN
                    public.match_joueur mj ON j.idjoueur = mj.idjoueur
                JOIN
                    public.match m ON mj.idmatch = m.idmatch
                LEFT JOIN
                    public.buteurs_match bm ON bm.idjoueurbuteur = j.idjoueur AND bm.idmatch = m.idmatch
                LEFT JOIN
                    public.buteurs_match pm ON pm.idjoueurpasseur = j.idjoueur AND pm.idmatch = m.idmatch  -- Jointure avec la table des passes décisives
                GROUP BY
                    j.idjoueur, j.nom, j.prenom
                ORDER BY
                    nbBut DESC, nbPasseD DESC;
            `);
            const data = result.rows
            return data.map(joueur => {

                const idjoueur = joueur.idjoueur;
                const nom = joueur.nom;
                const prenom = joueur.prenom;
                const nbButs = joueur.nbbut;
                const nbPasseD = joueur.nbpassed;
                const nbVictoire = joueur.nbvictoire;
                const nbMatch = joueur.nbmatch;

                // Crée une nouvelle instance de Joueur avec les données vérifiées et transformées
                return new Joueur(idjoueur, nom, prenom, nbButs, nbPasseD, nbVictoire, nbMatch);
            })
        } catch (error) {
            console.error("Erreur lors de la récupération du classement :", error);
            throw new Error('Impossible de récupérer le classement');
        }
    }

    static async chercheJoueurs(sRecherche) {
        try {
            const result = await db.pool.query(`
              SELECT * FROM joueur 
              WHERE LOWER(nom) LIKE LOWER($1) 
              OR LOWER(prenom) LIKE LOWER($1) 
              LIMIT 10
            `, [`%${sRecherche}%`]);
            return result.rows;
        } catch (error) {
            console.error("Erreur lors de la récupération du classement des joueurs :", error);
            throw new Error('Erreur lors de la récupération du classement des joueurs');
        }
    }
    static async creerJoueur(nom, prenom, age) {
        try {
            const result = await db.pool.query(`
              INSERT INTO joueur (nom, prenom, age) VALUES ($1, $2, $3) RETURNING *
            `, [nom, prenom, age]);
            return result.rows;
        } catch (error) {
            console.error("Erreur lors de la récupération du classement des joueurs :", error);
            throw new Error('Erreur lors de la récupération du classement des joueurs');
        }
    }
}

module.exports = Joueur;
