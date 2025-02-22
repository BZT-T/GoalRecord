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

    static async getClassement() {
        try {
            const data = await db.getClassementJoueurs();
            console.log(data);
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
}

module.exports = Joueur;
