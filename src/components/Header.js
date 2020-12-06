import React from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.css";
import { ReactComponent as Dogs } from "../assets/dogs.svg";
import { UserContext } from "../UserContext";

const Header = () => {
  const { data } = React.useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={"container " + styles.nav}>
        <Link to="/" className={styles.logo} aria-label="Dogs - Home">
          <Dogs />
        </Link>

        {data ? (
          <Link to="/conta" className={styles.login}>
            {data.nome}
          </Link>
        ) : (
          <Link to="/login" className={styles.login}>
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
