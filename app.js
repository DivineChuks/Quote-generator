const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newBtn = document.getElementById("new-quote");
const quoteContainer = document.getElementById("quote-container");
const loader = document.getElementById("loader");

let apiQuotes = [];

function loading() {
  loader.style.display = "block";
  quoteContainer.style.display = "none";
}

function completed() {
  loader.style.display = "none";
  quoteContainer.style.display = "block";
}

function newQuotes() {
  loading();
  const quotes = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  console.log(quotes);
  if (!quotes.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quotes.author;
  }

  if (quotes.text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.innerText = quotes.text;
  completed();
}

const getQuotes = async () => {
  loading();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const res = await fetch(apiUrl);
    apiQuotes = await res.json();
    newQuotes();
  } catch (error) {
    console.error(error.message);
  }
};

function tweetQuotes() {
  const tweet = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(tweet, "_blank");
}

// Add Event listener

newBtn.addEventListener("click", newQuotes);
twitterBtn.addEventListener("click", tweetQuotes);

// Onload
getQuotes();
