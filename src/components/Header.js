import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(Context);

  return (
    <nav
      className="navbar is-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          Home
        </Link>
        {isLoggedIn && (
          <Link className="navbar-item" to="/favorites">
            Favorites
          </Link>
        )}
      </div>
      <div className="navbar-menu   navbar-end is-active">
        {!isLoggedIn && (
          <div className="navbar-item">
            <button
              type="button"
              className="button is-primary"
              onClick={() => setIsLoggedIn(true)}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
