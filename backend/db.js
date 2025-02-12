const { Pool } = require('pg');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

class DB {
    constructor() {
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
        });
    }

    // Méthode pour récupérer tous les matchs
    async getMatches() {
        try {
            const result = await this.pool.query(`
                SELECT m.idMatch, m.dateMatch, m.lieuMatch, m.scoreEquipeA, m.scoreEquipeB, s.nom AS saison
                FROM "match" m
                JOIN "saison" s ON m.idSaison = s.idSaison
                ORDER BY m.dateMatch DESC
            `);
            return result.rows;  // Retourne les résultats
        } catch (error) {
            console.error("Erreur lors de la récupération des matchs : ", error);
            throw new Error('Erreur lors de la récupération des matchs');
        }
    }

    // Méthode pour récupérer un match par son ID
    async getMatchById(id) {
        try {
            const result = await this.pool.query(`
                SELECT m.idMatch, m.dateMatch, m.scoreÉquipeA, m.scoreÉquipeB, s.nom AS saison
                FROM "Match" m
                JOIN "Saison" s ON m.idSaison = s.idSaison
                WHERE m.idMatch = $1
            `, [id]);

            return result.rows[0];  // Retourne un seul match
        } catch (error) {
            console.error("Erreur lors de la récupération du match : ", error);
            throw new Error('Erreur lors de la récupération du match');
        }
    }

    // Méthode pour ajouter un match (exemple)
    async addMatch(date, scoreEquipeA, scoreEquipeB, idSaison) {
        try {
            const result = await this.pool.query(`
                INSERT INTO "Match" (dateMatch, scoreÉquipeA, scoreÉquipeB, idSaison)
                VALUES ($1, $2, $3, $4) RETURNING idMatch
            `, [date, scoreEquipeA, scoreEquipeB, idSaison]);

            return result.rows[0].idMatch;  // Retourne l'ID du match ajouté
        } catch (error) {
            console.error("Erreur lors de l'ajout du match : ", error);
            throw new Error('Erreur lors de l\'ajout du match');
        }
    }

    async getSaisonActuelle() {
        try {
            const result = await this.pool.query(
                `SELECT * FROM Saison WHERE enCours = true LIMIT 1`
            );
            return result.rows[0] || { nom: "Aucune saison en cours", anneeDebut: "", anneeFin: "" };
        } catch (error) {
            console.error("Erreur lors de la récupération de la saison actuelle :", error);
            throw error;
        }
    }
}

module.exports = new DB();  // Exporte une instance de la classe
