// export function Pointer({ position, ...props }: Props) {
//   // const ref = useRef<THREE.Mesh>(null!);

//   // const viewport = useThree((t) => t.viewport);
//   // const camera = useThree((t) => t.camera) as THREE.PerspectiveCamera;

//   // const offsetViewport = viewport.getCurrentViewport(camera, position as THREE.Vector3);

//   // useFrame(({ pointer }, delta) => {
//   //   // const targetX = (viewport.width / 2) * pointer.x;
//   //   // const targetY = (viewport.height / 2) * pointer.y;

//   //   ref.current.position.x = THREE.MathUtils.damp(ref.current.position.x, targetX, 7, delta);
//   //   ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, targetY, 7, delta);
//   // });
//   return (
//     // <mesh ref={ref} position={position} {...props}>
//     //   <circleGeometry args={[0.5, 64]} />
//     //   <meshStandardMaterial color="hotpink" />
//     // </mesh>
//     <div>

//     </div>
//   );
// }

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
      // ref.current.style.opacity = "0";
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
