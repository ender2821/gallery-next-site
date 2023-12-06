import Link from "next/link";
import styles from "./button.module.scss";
import { ButtonHTMLAttributes } from "react";

interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  link?: string;
  text: string;
  onClick?: () => void;
}

export default function Button(props: Button) {
  const { link, text, onClick, type } = props;
  return (
    <>
      {link ? (
        <Link href={link} className={styles.button}>
          <span className={styles.borderTop} />
          <span className={styles.borderRight} />
          <span className={styles.borderBottom} />
          <span className={styles.borderLeft} />
          {text ? text : "Button missing label"}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className={styles.button}
          type={type ? type : "button"}
        >
          <span className={styles.borderTop} />
          <span className={styles.borderRight} />
          <span className={styles.borderBottom} />
          <span className={styles.borderLeft} />
          {text ? text : "Button missing label"}
        </button>
      )}
    </>
  );
}
