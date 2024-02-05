import { Link } from "~/components/link";
import { HackerText } from "../hacker-text";
import styles from "./header.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" navigationOptions={{ delay: 700 }}>
        <HackerText className={styles.title}>EMALORENZO</HackerText>
      </Link>
      {/* <nav className={styles.nav}>
        <ul>
          <Link href="/posts">posts</Link>
          <Link href="/shaders">shaders</Link>
          <Link href="/scenes">scenes</Link>
        </ul>
      </nav> */}
    </header>
  );
}
