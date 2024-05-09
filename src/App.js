import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./App.css";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRandomQuote = () => {
    setIsLoading(true);
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        setQuotes([...quotes, { quote: data.content, author: data.author }]);
        setCurrentIndex(quotes.length);
        setIsLoading(false);
        setCopied(false);
      })
      .catch((error) => {
        console.error("Error fetching quote:", error);
        setQuotes([
          ...quotes,
          {
            quote: "I have a bad feeling about this...",
            author: "Luke Skywalker",
          },
        ]);
        setCurrentIndex(quotes.length);
        setIsLoading(false);
      });
  };

  const navigate = (step) => {
    const newIndex = currentIndex + step;
    if (newIndex >= 0 && newIndex < quotes.length) {
      setCurrentIndex(newIndex);
    }
  };

  const updateAndCopyToClipboard = () => {
    const { quote, author } = quotes[currentIndex];
    const combinedString = `"${quote}" - ${author}`;

    navigator.clipboard
      .writeText(combinedString)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch((error) => {
        console.error("Failed to copy combined string: ", error);
      });
  };

  useEffect(() => {
    fetchRandomQuote();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <div className="title-wrapper">
        <button
          className="history-btn"
          onClick={() => navigate(-1)}
          disabled={isLoading || currentIndex === 0}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <h1 className="title">
          "Moti<em>Quote</em>"
        </h1>

        <button
          className="history-btn"
          onClick={() => navigate(1)}
          disabled={isLoading || currentIndex === quotes.length - 1}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      <div>
        {isLoading ? (
          <p className="loader"></p>
        ) : (
          <>
            <p className="quote">"{quotes[currentIndex]?.quote}"</p>
            <p className="author">- {quotes[currentIndex]?.author}</p>
          </>
        )}
      </div>

      <div className="btn-wrapper">
        <button
          className="copy-quote-btn"
          onClick={updateAndCopyToClipboard}
          disabled={isLoading || currentIndex === -1}
        >
          {copied ? "Copied to Clipboard Successfully!" : "Copy to Clipboard"}
        </button>

        <button
          className="new-quote-btn"
          onClick={fetchRandomQuote}
          disabled={isLoading}
        >
          {isLoading ? "Fetching..." : "Generate New Quote"}
        </button>
      </div>

      <div className="a">
        Hi DevPipeline. This is how quickly Vercel can update your changes.
        Pretty cool, huh?
      </div>
    </div>
  );
}

export default App;
