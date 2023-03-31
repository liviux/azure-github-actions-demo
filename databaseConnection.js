const sql = require('mssql');

// Configure the database connection
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        enableArithAbort: true
    }
};


// Connect to the database
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to the database');
        return pool;
    })
    .catch(error => console.error('Error connecting to the database:', error));

// Function to get a random quote from the database
async function getRandomQuote() {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT TOP 1 * FROM Quotes ORDER BY NEWID()');
        return result.recordset[0].Text;
    } catch (error) {
        console.error('Error fetching random quote:', error);
        throw error;
    }
}

module.exports = {
    getRandomQuote
};
