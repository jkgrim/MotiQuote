import {
  Route,
  Routes,
  BrowserRouter as Router,
  Outlet,
} from "react-router-dom";

import Navbar from "./components/navigation/Navbar";
import Home from "./components/pages/Home";
import RandomQuote from "./components/pages/RandomQuote";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Outlet />} // Use Outlet here
          >
            <Route index element={<Home />} />
            <Route path="random" element={<RandomQuote />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
