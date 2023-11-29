"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import styles from "./backButton.module.scss";

export default function BackButton() {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className={styles.icon}>
      <ArrowBackIcon />
    </button>
  );
}
