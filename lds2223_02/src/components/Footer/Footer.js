/** @jsxImportSource theme-ui */

import "./FooterStyle.css";
import React from "react";
import { Link } from "theme-ui";

function Footer() {
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading" sx={{
              color: "colorblue" }}>
          Laboratório de Desenvolvimento de Software
        </p>
        <div className="input-areas"></div>
      </section>

      <div className="footer-link-wraper">
        <div className="footer-link-items">
          <h2>Information</h2>
          <a
            href="/about"
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
            About Traceability
          </a>
        </div>

        <div className="footer-link-items">
          <h2>Grupo 2</h2>
          <a
            href="/contacts"
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
            Contacts
          </a>
        </div>
      </div>

      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.estg.ipp.pt"
              className="social-logo"
              sx={{
                color: "text",
                ":focus": {
                  outline: "2px solid",
                },
                ":hover": {
                  color: "colorblue",
                },
              }}
            >
              Escola Superior de Tecnologia e Gestão &nbsp;
            </a>
          </div>
          <small className="website-rights">2022/2023</small>
        </div>
      </section>
    </div>
  );
}

export default Footer;
