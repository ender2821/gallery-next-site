import Link from "next/link";
import styles from "./button.module.scss";

type Button = {
  link?: string;
  text: string;
  onClick?: () => void;
};

export default function Button(props: Button) {
  const { link, text, onClick } = props;
  return (
    <>
      {link && (
        <Link href={link} className={styles.button}>
          <span className={styles.borderTop} />
          <span className={styles.borderRight} />
          <span className={styles.borderBottom} />
          <span className={styles.borderLeft} />
          {text ? text : "Button missing label"}
        </Link>
      )}
      {onClick && (
        <button onClick={onClick} className={styles.button}>
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
