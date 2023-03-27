const sql = require('mssql');
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME
};

let quotes = [];

async function getQuotes() {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT Quote FROM ConfuciusQuotes`;
    quotes = result.recordset.map(record => record.Quote);
    newQuote();
  } catch (err) {
    console.error(err);
  }
}

function newQuote() {
  const quoteElement = document.getElementById('quote');
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteElement.textContent = quotes[randomIndex];
}

getQuotes();
