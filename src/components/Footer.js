import React, { useContext } from "react";
import { Context } from "../Context";

const Footer = () => {
  const isDark = useContext(Context);
  return (
    <footer className={`footer ${isDark && "footerDark"}`}>
      <div className="content has-text-centered">
        <p>
          <strong>React Test Project</strong> by{" "}
          <a href="https://github.com/rentorious" target="_blank">
            Ognjen Popovic
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
