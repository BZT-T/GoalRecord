const express = require('express');
const app = express();
const port = 3000;
const db = require('./db');
const Joueur = require('./models/Joueur');
const Match = require('./models/Match');
const Saison = require('./models/Saison');
const cors = require('cors');


app.use(cors());  // Permet d'autoriser les requêtes cross-origin
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend is running!');
});

app.get('/api/matchs', async (req, res) => {
    console.log("Demande de matchs");
    try {
        const matches = await Match.getMatchsParSaison();  // Utiliser la méthode getMatches
        console.log("<"+matches.length+"> matchs trouvés");
        res.json(matches);  // Renvoyer les matchs sous forme de JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur lors de la récupération des matchs" });
    }
});

app.get('/api/saison-actuelle', async (req, res) => {
    console.log("Demande de la saison actuelle");
    try {
        const saison = await Saison.getSaisonActuelle();
        console.log("Saison actuelle : "+saison.nom);
        res.json(saison);
    } catch (error) {
        console.error('Erreur lors de la récupération de la saison actuelle:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

app.get('/api/classement', async (req, res) => {
    console.log("Demande du classement des joueurs");
    try {
        const classement = await Joueur.getClassement();
        console.log(`<${classement.length}> joueurs trouvés`);
        res.json(classement);
    } catch (error) {
        console.error('Erreur lors de la récupération du classement des joueurs:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

app.post('/api/Creerjoueur', async (req, res) => {
    try {
        const { nom, prenom, age } = req.body;

        if (!nom || !prenom || !age) {
            return res.status(400).json({ error: "Tous les champs sont obligatoires" });
        }

        const result = await Joueur.creerJoueur(nom, prenom, age);
        res.status(201).json(result[0]); // Retourne le joueur créé
    } catch (error) {
        console.error("Erreur lors de l'ajout du joueur :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

app.get("/api/recherche-joueurs", async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ error: "Requête vide" });
        }

        const result = await Joueur.chercheJoueurs(query);

        res.json(result);
    } catch (error) {
        console.error("Erreur lors de la recherche des joueurs :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

app.post('/api/creer-match', async (req, res) => {
    const { dateMatch, lieuMatch, scoreEquipeA, scoreEquipeB, equipeA, equipeB } = req.body;

    const idMatch = await Match.creerMatch(dateMatch, lieuMatch, scoreEquipeA, scoreEquipeB, equipeA, equipeB);

    if (idMatch > 0) {
        res.status(201).json({ message: "Match et joueurs enregistrés avec succès", idmatch: idMatch });
    }else {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

app.post("/api/ajouter-buts", async (req, res) => {
    const { idMatch, buts } = req.body;

    const resultat = Match.ajouteButeur(idMatch, buts)

    if (resultat) {
        res.status(201).json({ message: "Buts ajoutés avec succès !" });
    }else {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

app.get('/api/match/:id', async (req, res) => {
    const matchId = req.params.id;
    console.log("Demande de récupération du match avec l'ID : " + matchId);

    try {
        const match = await Match.getMatchById(matchId);
        if (!match) {
            return res.status(404).json({ message: 'Match non trouvé' });
        }
        res.json(match); // Retourner le match trouvé en réponse
    } catch (error) {
        console.error('Erreur lors de la récupération du match:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
