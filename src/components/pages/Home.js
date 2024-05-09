export default function Home() {
  return (
    <div className="home-page">
      <h1>Welcome to Motivational Quotes</h1>
      <p>Get inspired with daily doses of motivation!</p>
      <div className="quote-container">
        <h2>Quote of the Day</h2>
        <div className="quote">
          <blockquote>
            "Believe you can and you're halfway there." - Theodore Roosevelt
          </blockquote>
          <p>- Theodore Roosevelt</p>
        </div>
      </div>
      <div className="cta-container">
        <p>Ready to get inspired?</p>
        <button>Explore Quotes</button>
      </div>
    </div>
  );
}
