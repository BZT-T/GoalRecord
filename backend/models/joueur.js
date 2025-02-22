const db = require('../db');

class Joueur {
    constructor(id, nom, prenom, nbBut, nbVictoire, nbMatch) {
        this.idjoueur = id;
        this.nom = nom;
        this.prenom = prenom;
        this.nbBut = nbBut;
        this.nbVictoire = nbVictoire;
        this.nbMatch = nbMatch;
    }

    static async getClassement() {
        try {
            const data = await db.getClassementJoueurs(); // Récupère les données brutes
            return data.map(joueur => {
                // Vérification et transformation des données avant de créer le joueur
                const idjoueur = joueur.idjoueur || 0; // Valeur par défaut en cas de donnée manquante
                const nom = joueur.nom || "Nom inconnu";
                const prenom = joueur.prenom || "Prénom inconnu";
                const nbButs = joueur.nbBut || 0; // Valeur par défaut pour les buts
                const nbVictoire = joueur.nbVictoire || 0; // Valeur par défaut pour les victoires
                const nbMatch = joueur.nbMatch || 0; // Valeur par défaut pour les matchs joués

                // Crée une nouvelle instance de Joueur avec les données vérifiées et transformées
                return new Joueur(idjoueur, nom, prenom, nbButs, nbVictoire, nbMatch);
            })
        } catch (error) {
            console.error("Erreur lors de la récupération du classement :", error);
            throw new Error('Impossible de récupérer le classement');
        }
    }
}

module.exports = Joueur;
