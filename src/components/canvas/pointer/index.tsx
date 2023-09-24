import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { useStore } from "~/lib/store";
import styles from "./pointer.module.scss";

export function Pointer() {
  const ref = useRef<HTMLDivElement>(null!);

  const cursor = useStore((s) => s.cursor);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const offsetX = 10;
    const offsetY = 10;

    const targetX = e.clientX + offsetX;
    const targetY = e.clientY + offsetY;

    const keyframes = {
      transform: `translate(${targetX}px, ${targetY}px)`,
    };
    ref.current.animate(keyframes, {
      duration: 800,
      easing: "linear",
      fill: "forwards",
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    document.body.onmouseover = (e) => {
      ref.current.style.opacity = "1";
    };
    document.body.onmouseout = (e) => {
      ref.current.style.opacity = "0";
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <div ref={ref} className={styles.wrapper}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={cursor}
          className={styles.pointer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div className={styles.mask} animate={{ padding: !!cursor ? "1rem" : "4px" }}>
            <motion.div
              className={styles.content}
              initial={{ y: "150%" }}
              animate={{ y: 0 }}
              exit={{ y: "150%" }}
              transition={{ duration: 0.3 }}
            >
              {cursor}
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
