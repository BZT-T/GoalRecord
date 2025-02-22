const db = require('../db');

class Saison {
    constructor(idSaison, nom, lieuMatch, anneeDebut, anneeFin, enCours) {
        this.idSaison = idSaison;
        this.nom = nom;
        this.anneeDebut = anneeDebut;
        this.anneeFin = anneeFin;
        this.enCours = enCours;
    }

    static async getSaisonActuelle() {
        try {
            const result = await db.pool.query(
                `SELECT * FROM Saison WHERE enCours = true LIMIT 1`
            );
            return result.rows[0] || { nom: "Aucune saison en cours", anneeDebut: "", anneeFin: "" };
        } catch (error) {
            console.error("Erreur lors de la récupération de la saison actuelle :", error);
            throw error;
        }
    }
}

module.exports = Saison;
