const express = require('express');
const app = express();
const port = 3000;
const db = require('./db');
const cors = require('cors');


app.use(cors());  // Permet d'autoriser les requêtes cross-origin

app.get('/', (req, res) => {
    res.send('Backend is running!');
});

app.get('/api/matches', async (req, res) => {
    console.log("Demande de matchs");
    try {
        const matches = await db.getMatches();  // Utiliser la méthode getMatches
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
        const saison = await db.getSaisonActuelle();
        console.log("Saison actuelle : "+saison.nom);
        res.json(saison);
    } catch (error) {
        console.error('Erreur lors de la récupération de la saison actuelle:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
