import { motion } from "framer-motion";
import { useLoaderStore } from "~/store/loader";
import styles from "./root-layout.module.scss";

export function MiniMap() {
  const appReady = useLoaderStore((state) => state.appReady);

  return (
    <div className={styles.miniMap}>
      <motion.div
        className={styles.border}
        initial={{ y: "100%" }}
        animate={{ y: appReady ? 0 : "100%" }}
        transition={{ duration: 0.7, delay: 0.7, ease: "easeInOut" }}
      />
    </div>
  );
}
