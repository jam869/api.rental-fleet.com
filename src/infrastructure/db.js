import { createPool } from 'mariadb';
import { DB_CONFIG } from '#configs';

const pool = createPool({
     host: DB_CONFIG.host,
     port: DB_CONFIG.port, 
     user: DB_CONFIG.user, 
     password: DB_CONFIG.password,
     database: DB_CONFIG.database,
     
     bigIntAsNumber: true,
     namedPlaceholders: true, // Required to use :name syntax

     // --- Pool Specific Settings ---
     connectionLimit: 10,      // Max number of connections to hold
     acquireTimeout: 10000,    // Wait 10s for a connection before failing
     idleTimeout: 30000,       // Close connections idle for 30s
     minimumIdleWeight: 1      // Keep at least 1 connection alive
});

export default pool;