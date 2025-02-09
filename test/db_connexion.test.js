const { Pool } = require('pg');
require('dotenv').config(); // Charger les variables d'environnement

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

describe("Test de connexion à la base de données", () => {
    test("La connexion doit être établie avec succès", async () => {
        const client = await pool.connect();
        expect(client).toBeDefined(); // Vérifie que la connexion est bien établie
        client.release();
    });

    test("Une requête SELECT simple doit fonctionner", async () => {
        const result = await pool.query("SELECT NOW();"); // Vérifie que la base répond
        expect(result.rows.length).toBeGreaterThan(0);
    });
});
