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
    try {
        const matches = await db.getMatches();  // Utiliser la méthode getMatches
        res.json(matches);  // Renvoyer les matchs sous forme de JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur lors de la récupération des matchs" });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
