/** @jsxImportSource theme-ui */

import { useColorMode } from "theme-ui";
import React, { Component, useState } from "react";
import { MenuItems } from "./MenuItems";
import DropdownNavbar from "./Dropdown";
import "./NavbarStyle.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [clickedHamburguer, setClickedHamburguer] = useState(false);

  let history = useNavigate();

  let user = localStorage.getItem("LoggedUser");
  let userLogged = false;

  if (user !== null) {

    userLogged = true;

  }

  const [openDropdown, setOpenDropdown] = useState(false);

  const handleClickHamburguer = () => {
    setClickedHamburguer(!clickedHamburguer);
  };

  const handleOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const signOut = () => {

    localStorage.removeItem("LoggedUser");
    history('/login', { replace: true });


  };

  const goLogin = () => {

    history('/login', { replace: true });

  };

  const [colorMode, setColorMode] = useColorMode();
  return (
    <div>
      <nav className="NavbarItems" sx={{ backgroundColor: "background" }}>
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

        <ul className={clickedHamburguer ? "nav-menu active" : "nav-menu "}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                {userLogged ? (
                  item.submenu ? (
                    <DropdownNavbar
                      submenu={item.submenu}
                      title={item.title}
                    ></DropdownNavbar>
                  ) : (
                    <a
                      href={item.url}
                      className={item.cName}
                      sx={{
                        color: "inherit",
                        ":focus": {
                          outline: "2px solid",
                        },
                        ":hover": {
                          color: "colorblue",
                        },
                      }}
                    >
                      {item.title}
                    </a>
                  )
                ) : (
                  <></>
                )}

              </li>
            );
          })}
          <p
            className="theme-icon"
            onClick={() =>
              setColorMode(colorMode === "light" ? "dark" : "light")
            }
          >
            {colorMode === "light" ? "🌙" : "☀️"}
          </p>
          <li></li>
        </ul>

        <ul className="nav-menu-last">
          <div className="menu-icons" onClick={handleClickHamburguer}>
            <i
              className={clickedHamburguer ? "fas fa-times" : "fas fa-bars"}
            ></i>

          </div>
          <li key="1">
            {userLogged ? (
              <a className="nav-links-last" onClick={() => signOut()}>Sign Out</a>
            ) : (
              <a className="nav-links-last" onClick={() => goLogin()}>Sign in</a>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};
// }

export default Navbar;
