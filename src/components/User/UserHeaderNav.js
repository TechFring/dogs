import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../UserContext";
import useMedia from "../../hooks/useMedia";

import { ReactComponent as MinhasFotos } from "../../assets/feed.svg";
import { ReactComponent as Estatisticas } from "../../assets/estatisticas.svg";
import { ReactComponent as AdicionarFoto } from "../../assets/adicionar.svg";
import { ReactComponent as Sair } from "../../assets/sair.svg";

import styles from "./UserHeaderNav.module.css";

const UserHeaderNav = () => {
  const { userLogout } = React.useContext(UserContext);
  const mobile = useMedia("(max-width: 40rem)");
  const [mobileMenu, setMobileMenu] = React.useState(false);

  const { pathname } = useLocation();

  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <>
      {mobile && (
        <button
          aria-label="Menu"
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}

      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <NavLink activeClassName={styles.active} end to="/conta">
          <MinhasFotos />
          {mobile && "Minhas Fotos"}
        </NavLink>

        <NavLink activeClassName={styles.active} to="/conta/estatisticas">
          <Estatisticas />
          {mobile && "Estatísticas"}
        </NavLink>

        <NavLink activeClassName={styles.active} to="/conta/postar">
          <AdicionarFoto />
          {mobile && "Adicionar Foto"}
        </NavLink>

        <button onClick={userLogout} activeClassName={styles.active}>
          <Sair />
          {mobile && "Sair"}
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;
