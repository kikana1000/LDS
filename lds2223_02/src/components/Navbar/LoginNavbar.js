/** @jsxImportSource theme-ui */

import { useColorMode } from "theme-ui";
import "./LoginNavbarStyle.css";

const LoginNavbar = () => {

  const [colorMode, setColorMode] = useColorMode();
  return (
    <div>
      <nav className="NavbarItems" sx={{ backgroundColor: "background" }}>
      <ul className="nav-menu ">
        <a href="/">
          <h1
            className="logo"
            sx={{
              color: "colorblue",
            }}
          >
            <img src="./../../../logo.png" /> Traceability
          </h1>
        </a>
        <li><p
            className="theme-icon"
            onClick={() =>
              setColorMode(colorMode === "light" ? "dark" : "light")
            }
          >
            {colorMode === "light" ? "🌙" : "☀️"}
          </p></li>
        </ul>
      </nav>
    </div>
  );
};

export default LoginNavbar;