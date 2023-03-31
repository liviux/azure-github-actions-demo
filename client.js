document.addEventListener('DOMContentLoaded', () => {
    const quoteDisplay = document.getElementById('quote');
    const getQuoteButton = document.getElementById('get-quote');

    getQuoteButton.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/random-quote');
            const data = await response.json();

            quoteDisplay.innerText = data.quote;
        } catch (error) {
            console.error('Error fetching quote:', error);
            quoteDisplay.innerText = 'Error fetching quote. Please try again later.';
        }
    });
});
