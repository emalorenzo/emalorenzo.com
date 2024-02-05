import { useFrame } from "@studio-freight/hamo";
import Lenis from "@studio-freight/lenis";
import { useEffect, useRef } from "react";

import clsx from "clsx";
import { useStore } from "~/store/store";
import styles from "./smooth-scroll.module.scss";

type Props = {
  children: React.ReactNode;
} & JSX.IntrinsicElements["main"];

export function SmoothScroll({ children, className }: Props) {
  const wrapperRef = useRef(null!);
  const contentRef = useRef(null!);

  const [lenis, setLenis] = useStore((state) => [state.lenis, state.setLenis]);

  useEffect(() => {
    if (wrapperRef.current && contentRef.current) {
      console.log("creating lenis");
      const lenis = new Lenis({
        lerp: 0.1,
        duration: 1.2,
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smoothWheel: true,
      });

      setLenis(lenis);

      return () => {
        lenis.destroy();
        setLenis(null);
      };
    }
  }, []);

  useFrame((time: number) => {
    lenis?.raf(time);
  }, 0);

  return (
    <main className={clsx(styles.page, className)} ref={wrapperRef}>
      <div ref={contentRef}>{children}</div>
    </main>
  );
}
