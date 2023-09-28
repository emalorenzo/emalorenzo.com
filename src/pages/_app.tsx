import { Canvas } from "@react-three/fiber";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Header } from "~/components/header";
import { useStore } from "~/lib/store";
import { GlobalScene } from "~/scenes/globalscene";

const Pointer = dynamic(() => import("~/components/pointer").then((m) => m.Pointer), {
  ssr: false,
});

import "~/styles/global.scss";

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();
  const dom = useRef<HTMLDivElement>(null!);

  const { setDom, setSelectedPostIndex } = useStore.getState();
  useEffect(() => {
    if (dom.current) setDom(dom.current);
  }, [dom, setDom]);

  return (
    <div ref={dom} className="relative w-full h-screen">
      <Pointer />
      <Header />
      <AnimatePresence mode="wait">
        <Component {...pageProps} />
      </AnimatePresence>
      <Canvas
        className="!fixed h-full w-full top-0"
        style={{ pointerEvents: "none" }}
        eventSource={dom}
        eventPrefix="client"
      >
        <GlobalScene />
      </Canvas>
    </div>
  );
}
