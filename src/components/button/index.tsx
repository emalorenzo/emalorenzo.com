import clsx from "clsx";
import { HTMLMotionProps, motion } from "framer-motion";

import styles from "./button.module.scss";

type Props = HTMLMotionProps<"button">;

export function Button({ className, children, ...props }: Props) {
  return (
    <motion.button className={clsx(styles.button, className)} {...props}>
      {children}
    </motion.button>
  );
}
