import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchRandomQuote = () => {
    setIsLoading(true);
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.content);
        setAuthor(data.author);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quote:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
    <div className="App">
      <h1 className="title">MotiQuote</h1>
      <div>
        {isLoading ? (
          <p className="quote">Loading...</p>
        ) : (
          <>
            <p className="quote">"{quote}"</p>
            <p className="author">- {author}</p>
          </>
        )}
      </div>
      <button
        className="new-quote-btn"
        onClick={fetchRandomQuote}
        disabled={isLoading}
      >
        {isLoading ? "Fetching..." : "Generate New Quote"}
      </button>
    </div>
  );
}

export default App;
