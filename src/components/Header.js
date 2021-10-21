import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn, isDark } = useContext(Context);

  return (
    <nav
      className={`navbar level is-mobile ${isDark ? "is-dark" : "is-light"}`}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand level-left">
        <Link to="/" className="navbar-item level-tiem">
          Home
        </Link>
        {isLoggedIn && (
          <Link
            to="/favorites"
            className="navbar-item level-item
          "
          >
            Favorites
          </Link>
        )}
      </div>
      <div className="level-right">
        {!isLoggedIn && (
          <div className="navbar-item level-item ">
            <button
              type="button"
              className="button is-primary  is-normal"
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
