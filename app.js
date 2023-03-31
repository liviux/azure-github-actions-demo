// Import required modules
const express = require('express');
const { getRandomQuote } = require('./databaseConnection');

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Define the API endpoint to get a random quote
app.get('/api/quote', async (req, res) => {
    try {
        const quote = await getRandomQuote();
        res.json({ quote });
    } catch (error) {
        console.error('Error fetching quote:', error);
        res.status(500).json({ error: 'Error fetching quote' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
