"use client";

import React from "react";
import styles from "./navDrawer.module.scss";
import Link from "next/link";
import urlFor from "../lib/urlFor";
import Image from "next/image";
import { Button, Drawer } from "@mui/material";

function NavDrawer(props: Global) {
  const { logo } = props;

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
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

  const nav = () => {
    return (
      <>
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
      </>
    );
  };

  return (
    <nav className={styles.nav}>
      {logo && (
        <Link href="/" className={styles.logoContain}>
          <Image src={urlFor(logo?.asset).url()} alt={logo?.alt} fill />
        </Link>
      )}
      <ul className={styles.navDesktop}>{nav()}</ul>
      <div>
        {(["left"] as const).map((anchor) => (
          <React.Fragment key={anchor}>
            <Button
              onClick={toggleDrawer(anchor, true)}
              className={styles.hamburgerMenu}
            >
              Menu
            </Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              <ul>{nav()}</ul>
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
}

export default NavDrawer;
