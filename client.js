let quotes = [];

function getQuotes() {
  // Make a request to your server-side code to retrieve the quotes
  fetch('/quotes')
    .then(response => response.json())
    .then(data => {
      quotes = data;
      newQuote();
    });
}

function newQuote() {
  const quoteElement = document.getElementById('quote');
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteElement.textContent = quotes[randomIndex];
}

getQuotes();