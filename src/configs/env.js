export const DB_CONFIG = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT), // Convert "3307" to 3307
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};