import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./Navbar.css";

export default function Navbar({ title, showBack = true }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar" role="navigation" aria-label="Order tracking navigation">
      <div className="navbar-inner">
        {showBack ? (
          <button
            className="navbar-back"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft size={20} strokeWidth={2.5} />
          </button>
        ) : (
          <div className="navbar-spacer" />
        )}
        <h1 className="navbar-title">{title}</h1>
        <div className="navbar-spacer" />
      </div>
    </nav>
  );
}
