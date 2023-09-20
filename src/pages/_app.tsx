import { Canvas } from "@react-three/fiber";
import type { AppProps } from "next/app";
import { useEffect, useRef } from "react";
import { Selector } from "~/components/canvas/selector";
import { useStore } from "~/lib/store";

import "~/styles/global.scss";

export default function App({ Component, pageProps }: AppProps) {
  const dom = useRef<HTMLDivElement>(null!);

  const { setDom } = useStore.getState();
  useEffect(() => {
    console.log("domElement", dom.current);
    if (dom.current) setDom(dom.current);
  }, [dom, setDom]);

  return (
    <div ref={dom} className="relative h-screen w-full">
      <Component {...pageProps} />
      <Canvas
        className="!fixed h-full w-full top-0"
        style={{ pointerEvents: "none" }}
        eventSource={dom}
        eventPrefix="client"
      >
        <Selector />
      </Canvas>
    </div>
  );
}
