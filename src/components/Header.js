import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { Context } from "../Context";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn, isDark } = useContext(Context);

  return (
    <nav
      className={`navbar ${isDark ? "is-dark" : "is-light"}`}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          Home
        </Link>
        {isLoggedIn && (
          <Link to="/favorites" className="navbar-item">
            Favorites
          </Link>
        )}
      </div>
      <div className="navbar-menu navbar-end is-active">
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
        {/* // * Only used for testing */}
        {/* {isLoggedIn && (
          <div className="navbar-item">
            <button
              type="button"
              className="button is-danger"
              onClick={() => setIsLoggedIn(false)}
            >
              Log Out
            </button>
          </div>
        )} */}
      </div>
    </nav>
  );
};

export default Header;
