import { Link } from "react-router-dom";
import "./Header.css"; // create this file for header-specific styles

export default function Header() {
  return (
    <header className="header">
      <div className="header-title">
        Hearth
      </div>
      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/recipes">Recipes</Link>
        <Link to="/workout">Workouts</Link>
      </nav>
    </header>
  );
}
