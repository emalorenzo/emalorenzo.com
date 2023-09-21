import { StatsGl } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { AppProps } from "next/app";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { PostSelector } from "~/components/canvas/post-selector";
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
    <div ref={dom} className="relative h-screen w-full">
      <Component {...pageProps} />
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
        <StatsGl />
      </Canvas>
    </div>
  );
}
