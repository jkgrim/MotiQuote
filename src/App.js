import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRandomQuote = () => {
    setIsLoading(true);
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.content);
        setAuthor(data.author);
        setIsLoading(false);
        setCopied(false);
      })
      .catch((error) => {
        console.error("Error fetching quote:", error);
        setQuote("I have a bad feeling about this...")
        setAuthor("Luke Skywalker")
        setErrorMsg("Error: Try again later")
        setIsLoading(false);
      });
  };

  const updateAndCopyToClipboard = () => {
    const combinedString = `"${quote}" -${author}`;

    navigator.clipboard
      .writeText(combinedString)
      .then(() => {
        console.log("Combined string copied to clipboard successfully!");
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch((error) => {
        console.error("Failed to copy combined string: ", error);
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
            <p className="error-msg">{errorMsg}</p>
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

      <button
        className="copy-quote-btn"
        onClick={updateAndCopyToClipboard}
        disabled={isLoading}
      >
        {copied ? "Copied to Clipboard Successfully!" : "Copy to Clipboard"}
      </button>
    </div>
  );
}

export default App;
