import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="nav-wrapper">
      <div className="link">
        <NavLink to="/">Home</NavLink>
      </div>

      <div className="link">
        <NavLink to="/random">Random</NavLink>
      </div>

      <div className="link">
        <NavLink to="/">Home</NavLink>
      </div>

      <div className="link">
        <NavLink to="/">Home</NavLink>
      </div>

      <div className="link">
        <NavLink to="/">Home</NavLink>
      </div>
    </div>
  );
}
