const sql = require('mssql');
const express = require('express');
const app = express();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME
};

async function getQuotes() {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT Quote FROM ConfuciusQuotes`;
    const quotes = result.recordset.map(record => record.Quote);
    return quotes;
  } catch (err) {
    console.error(err);
  }
}

app.get('/quotes', async (req, res) => {
  const quotes = await getQuotes();
  res.json(quotes);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});