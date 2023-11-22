import KnotIllustration from "../assets/knotIllustration.svg";
import styles from "./divider.module.scss";

export default function Divider() {
  return (
    <div className={styles.divider}>
      <span />
      <KnotIllustration />
      <span />
    </div>
  );
}
