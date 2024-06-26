import React, { Component } from "react";
import styles from "./css/styles.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

class Footer extends Component {
  render() {
    const footerLinks = [
      { text: "•", link: "#" },
      { text: "Privacy Policy", link: "/privacy" },
      { text: "•", link: "#" },
      { text: "Terms of Use", link: "/terms-of-use" },
      { text: "•", link: "#" },
      { text: "Legal License", link: "/license" },
      { text: "•", link: "#" },
      { text: "©2023", link: "#" },
      { text: "•", link: "#" },
    ];
    const footerSocials = [
      "/img/discordSocial.svg",
      "/img/XSocial.svg",
      "/img/chat.svg",
    ];
    return (
      <footer className={styles.footer}>
        <div className={styles.footer__links}>
          {footerLinks.map((link, index) => (
            <Link key={index} to={link.link}>
              {link.text}
            </Link>
          ))}
          <div className={styles.footer__socials}>
            {footerSocials.map((social, index) => (
              <img key={index} src={social} alt="social" />
            ))}
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
