import Image from "next/image";
import styles from "./home.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1>Home Page</h1>
      </section>
    </main>
  );
}
