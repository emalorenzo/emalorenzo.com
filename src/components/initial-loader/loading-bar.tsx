import clsx from "clsx";
import { motion } from "framer-motion";
import { memo } from "react";
import styles from "./initial-loader.module.scss";

type Props = {
  visible: boolean;
};

export const BootingBar = memo(function LoadingBar({ visible }: Props) {
  console.log("render loadingbar", visible);
  return (
    <motion.div
      className={clsx(styles.bootingBar)}
      initial={{ height: "50px" }}
      animate={{ height: visible ? "50px" : 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <div className={styles.barWrapper}>
        <div className={styles.bar}></div>
      </div>
    </motion.div>
  );
});
