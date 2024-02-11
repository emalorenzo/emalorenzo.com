import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./initial-loader.module.scss";

const messages = [
  "BOOTING SYSTEM...",
  // "CHECKING RESOURCES...",
  // "GETTING CACHE...",
  // "APPLYING GLOBAL STYLES...",
  "LOADING POSTS...",
  "INITIALIZING WEBGL...",
  // "SETTING UP ENVIRONMENT...",
  "RUNNING SHADERS...",
  // "CONFIGURING SETTINGS...",
  "PREPARING DATA MODELS...",
  // "ESTABLISHING DATABASE CONNECTIONS...",
  "OPTIMIZING PERFORMANCE...",
  // "LOADING COMPONENTS...",
  // "FINALIZING...",
  // "STARTING SERVICES...",
  // "CONNECTING TO NETWORK...",
  "LAUNCHING INTERFACE...",
  "SYSTEM CHECK...",
  // "ALMOST THERE...",
  "READY.",
];

type Props = {
  visible: boolean;
  duration: number;
  onComplete?: () => void;
};

export function BootingSecuence({ visible, duration, onComplete }: Props) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const intervalDuration = (duration / messages.length) * 1000;

    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex < messages.length) {
          return nextIndex;
        } else {
          clearInterval(interval);
          onComplete?.();

          return prevIndex;
        }
      });
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <div className={styles.bootingSecuence}>
          {messages.map((message, i) => {
            return i <= currentMessageIndex ? (
              <div key={i}>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: i <= currentMessageIndex ? 1 : 0,
                    transition: { duration: 0.1 },
                  }}
                  exit={{ y: 20 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  {message}
                </motion.p>
              </div>
            ) : null;
          })}
        </div>
      )}
    </AnimatePresence>
  );
}
