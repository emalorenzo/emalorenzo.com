import { motion } from "framer-motion";
import { Link } from "~/components/link";
import { useLoaderStore } from "~/store/loader";
import { HackerText } from "../hacker-text";
import styles from "./header.module.scss";

export function Header() {
  const appReady = useLoaderStore((state) => state.appReady);

  return (
    <header className={styles.header}>
      <motion.div
        className={styles.headerBorder}
        initial={{ x: "-100%" }}
        animate={{ x: appReady ? 0 : "-100%" }}
        transition={{ duration: 0.7, delay: 0.7, ease: "easeInOut" }}
      />
      {appReady && (
        <Link href="/" navigationOptions={{ delay: 700 }}>
          <HackerText className={styles.title} active iterationsToAdvance={3} speed={20}>
            EMALORENZO
          </HackerText>
        </Link>
      )}
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
