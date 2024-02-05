import { AnimatePresence, motion } from "framer-motion";
import { useLoaderStore } from "~/store/loader";

import { useGSAP } from "@gsap/react";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import styles from "./initial-loader.module.scss";

export function InitialLoader() {
  const ref = useRef<HTMLDivElement>(null!);

  const setReady = useLoaderStore((state) => state.setInitialLoadReady);
  const { active: isLoadingAssets } = useProgress();

  const { contextSafe } = useGSAP({ scope: ref });

  const exitTransition = contextSafe(() => {
    gsap.to(ref.current, {
      x: "100%",
      duration: 0.7,
      ease: "sine.inOut",
    });
  });

  useEffect(() => {
    if (!isLoadingAssets) {
      setReady(true);
      exitTransition();
    }
  }, [isLoadingAssets, setReady, exitTransition]);

  return (
    <AnimatePresence>
      <motion.div ref={ref} className={styles.initialLoader} />
    </AnimatePresence>
  );
}
