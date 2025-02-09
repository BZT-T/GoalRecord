require('dotenv').config(); // Charge les variables d'environnement du fichier .env

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,  // Utilisation de la variable d'environnement
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

module.exports = pool;
