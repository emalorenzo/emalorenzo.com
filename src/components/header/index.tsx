import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useStore } from "~/lib/store";
import styles from "./header.module.scss";

export function Header() {
  const pathname = usePathname();

  const posts = useStore((s) => s.posts);
  const selectedPostIndex = useStore((s) => s.selectedPostIndex);

  const post = selectedPostIndex !== null ? posts[selectedPostIndex] : null;

  return (
    <motion.header
      className={styles.header}
      initial={{ y: "-100%" }}
      animate={{ y: pathname !== "/" ? 0 : "-100%" }}
      transition={{ duration: 0.5 }}
    >
      <h3 className={styles.title}>{post?.title}</h3>
    </motion.header>
  );
}
