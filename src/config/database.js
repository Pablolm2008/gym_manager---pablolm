const mysql = require("mysql2/promise");
require("dotenv").config();

const requiredEnvironment = [
    "DB_HOST",
    "DB_PORT",
    "DB_USER",
    "DB_NAME"
];

for (const variable of requiredEnvironment) {
    if (!process.env[variable]) {
        throw new Error(`Falta la variable de entorno requerida: ${variable}`);
    }
}

const port = Number(process.env.DB_PORT);
const connectionLimit = Number(process.env.DB_CONNECTION_LIMIT || 10);

if (!Number.isInteger(port) || port <= 0) {
    throw new Error("DB_PORT debe ser un número entero positivo.");
}

if (!Number.isInteger(connectionLimit) || connectionLimit <= 0) {
    throw new Error("DB_CONNECTION_LIMIT debe ser un entero positivo.");
}

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit,
    queueLimit: 0,
    decimalNumbers: true,
    dateStrings: true
});

module.exports = pool;
