const express = require('express');
const app = express();
const port = 3000;
const db = require('./db');
const Joueur = require('./models/Joueur');
const Match = require('./models/Match');
const Saison = require('./models/Saison');
const cors = require('cors');


app.use(cors());  // Permet d'autoriser les requêtes cross-origin

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


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
