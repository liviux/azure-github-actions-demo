const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./databaseConnection');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Serve static files from the current folder

app.get('/api/random-quote', async (req, res) => {
    try {
        const randomQuote = await db.getRandomQuote();
        res.status(200).json(randomQuote);
    } catch (error) {
        console.error('Error fetching random quote:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
