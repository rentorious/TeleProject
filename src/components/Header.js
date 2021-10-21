import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context";

const Header = () => {
  const { isLoggedIn } = useContext(Context);
  const navMenuRef = useRef(null);

  const handleToggle = (e) => {
    // Get the target freom the "data-target" attribute
    const target = e.target;

    console.log(target);
    navMenuRef.current.classList.toggle("is-active");

    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    // e.classList.toggle("is-active");
    target.classList.toggle("is-active");
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          Home
        </Link>
        {isLoggedIn && (
          <Link className="navbar-item" to="/favorites">
            Favorites
          </Link>
        )}
        {/* <a
          href="javascript:void(0);"
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={(e) => handleToggle(e)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a> */}
      </div>
    </nav>
  );
};

export default Header;
