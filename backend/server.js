const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');


app.use(cors());  // Permet d'autoriser les requêtes cross-origin

app.get('/', (req, res) => {
    res.send('Backend is running!');
});

app.get('/api/matches', (req, res) => {

    console.log("Demande de match.")

    const matches = [
        {
            id: 1,
            teamA: "Équipe A",
            teamB: "Équipe B",
            score: "3 - 2",
            date: "2025-02-01"
        },
        {
            id: 2,
            teamA: "Équipe C",
            teamB: "Équipe D",
            score: "1 - 1",
            date: "2025-02-08"
        },
        {
            id: 3,
            teamA: "Équipe A",
            teamB: "Équipe D",
            score: "4 - 0",
            date: "2025-02-15"
        },
        {
            id: 4,
            teamA: "Équipe B",
            teamB: "Équipe C",
            score: "2 - 3",
            date: "2025-02-22"
        }
    ];

    res.json(matches);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
