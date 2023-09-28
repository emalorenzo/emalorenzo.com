import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { CursorType } from "~/types";
import styles from "./pointer.module.scss";

export function Pointer() {
  const ref = useRef<HTMLDivElement>(null!);
  const [cursor, setCursor] = useState<CursorType>(null);

  const animateMove = (e: MouseEvent, interacting: boolean) => {
    const offsetX = interacting ? 0 : 10;
    const offsetY = interacting ? 0 : 10;

    const targetX = e.clientX - ref.current.offsetWidth / 2 + offsetX;
    const targetY = e.clientY - ref.current.offsetHeight / 2 + offsetY;

    const keyframes = {
      transform: `translate(${targetX}px, ${targetY}px)`,
      ease: "linear",
    };
    ref.current.animate(keyframes, {
      duration: 800,
      easing: "linear",
      fill: "forwards",
    });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const interactable = e?.target?.closest("[data-interactable]");
    const interacting = interactable !== null;

    if (interacting) {
      const type = interactable.dataset.type;
      setCursor(type as CursorType);
    } else {
      setCursor(null);
    }

    animateMove(e, interacting);
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
      <motion.div
        key={cursor}
        className={styles.pointer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
      >
        <motion.div className={styles.mask}>
          <AnimatePresence mode="wait">
            {!!cursor && (
              <motion.div
                className={styles.content}
                initial={{ opacity: 0, y: "110%" }}
                animate={{ opacity: 1, y: "0%" }}
                exit={{ opacity: 0, y: "-110%" }}
                transition={{ duration: 0.2 }}
              >
                {cursor}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
