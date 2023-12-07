"use client";

import React, { useEffect } from "react";
import styles from "./navDrawer.module.scss";
import Link from "next/link";
import urlFor from "../../utils/urlFor";
import Image from "next/image";
import { Drawer, IconButton } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { usePathname } from "next/navigation";

function NavDrawer(props: Global) {
  const { logo } = props;
  const pathname = usePathname();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const Nav = () => {
    return (
      <ul className={styles.navList}>
        <li>
          <Link
            href={"/"}
            className={pathname === "/" ? styles.activeLink : ""}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href={"/custom-garments"}
            className={pathname === "/custom-garments" ? styles.activeLink : ""}
          >
            Custom Garments
          </Link>
        </li>
        <li>
          <Link
            href={"/products"}
            className={pathname === "/products" ? styles.activeLink : ""}
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            href={"/alterations"}
            className={pathname === "/alterations" ? styles.activeLink : ""}
          >
            Alterations
          </Link>
        </li>
        <li>
          <Link
            href={"/sewing-lessons"}
            className={pathname === "/sewing-lessons" ? styles.activeLink : ""}
          >
            Sewing Lessons
          </Link>
        </li>
        <li>
          <Link
            href={"/contact"}
            className={pathname === "/contact" ? styles.activeLink : ""}
          >
            Contact
          </Link>
        </li>
      </ul>
    );
  };

  return (
    <nav className={styles.nav}>
      {logo && (
        <Link href="/" className={styles.logoContain}>
          <Image src={urlFor(logo?.asset).url()} alt={logo?.alt} fill />
        </Link>
      )}
      <div className={styles.navDesktop}>
        <Nav />
      </div>
      <div>
        {(["left"] as const).map((anchor) => (
          <React.Fragment key={anchor}>
            <IconButton
              onClick={toggleDrawer(anchor, true)}
              className={styles.hamburgerMenu}
              aria-label="menu"
            >
              <MenuRoundedIcon className={styles.icon} />
            </IconButton>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              variant="temporary"
              PaperProps={{
                sx: { width: "80%" },
                onClick: toggleDrawer(anchor, false),
              }}
              ModalProps={{
                keepMounted: false,
              }}
            >
              <div>
                <Nav />
              </div>
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
}

export default NavDrawer;
