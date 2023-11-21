"use client";

import React, { useEffect } from "react";
import styles from "./navDrawer.module.scss";
import Link from "next/link";
import urlFor from "../lib/urlFor";
import Image from "next/image";
import { Drawer, IconButton } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useRouter } from "next/navigation";

function NavDrawer(props: Global) {
  const { logo } = props;
  const router = useRouter();

  const [state, setState] = React.useState({
    left: false,
  });

  useEffect(() => {
    if ({ state: true }) {
      setState({ left: false });
    }
  }, [router.refresh]);

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
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/custom"}>Custom Garments</Link>
        </li>
        <li>
          <Link href={"/products"}>Products</Link>
        </li>
        <li>
          <Link href={"/alterations"}>Alterations</Link>
        </li>
        <li>
          <Link href={"/lessons"}>Sewing Lessons</Link>
        </li>
        <li>
          <Link href={"/contact"}>Contact</Link>
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
