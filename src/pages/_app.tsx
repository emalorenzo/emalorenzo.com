import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import type { AppProps } from "next/app";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { PostSelector } from "~/components/canvas/post-selector";
import { Header } from "~/components/header";
import { useStore } from "~/lib/store";

import "~/styles/global.scss";

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();
  const dom = useRef<HTMLDivElement>(null!);

  const { setDom, setSelectedPostIndex } = useStore.getState();
  useEffect(() => {
    if (dom.current) setDom(dom.current);
  }, [dom, setDom]);

  return (
    <motion.div
      ref={dom}
      className="relative h-screen w-full"
      animate={{ backgroundColor: pathname === "/" ? "#fff" : "#000" }}
    >
      <Header />
      <AnimatePresence mode="wait">
        <Component {...pageProps} />
      </AnimatePresence>
      <Canvas
        className="!fixed h-full w-full top-0"
        style={{ pointerEvents: "none" }}
        eventSource={dom}
        eventPrefix="client"
        onPointerMissed={() => {
          // if (pathname === "/") {
          //   setSelectedPostIndex(null);
          // }
        }}
      >
        <PostSelector />
      </Canvas>
    </motion.div>
  );
}
