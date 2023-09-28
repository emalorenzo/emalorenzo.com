import { GlobalCanvas } from "@14islands/r3f-scroll-rig";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { DevTools } from "~/components/dev-tools";
import { Header } from "~/components/header";
import { useStore } from "~/lib/store";
import { GlobalScene } from "~/scenes/globalscene";

import "@14islands/r3f-scroll-rig/css";

const Pointer = dynamic(() => import("~/components/canvas/pointer").then((m) => m.Pointer), {
  ssr: false,
});
const PostSelector = dynamic(
  () => import("~/components/post-selector").then((m) => m.PostSelector),
  {
    ssr: false,
  }
);

import "~/styles/global.scss";

export default function App({ Component, pageProps }: AppProps) {
  const dom = useRef<HTMLDivElement>(null!);

  const { setDom } = useStore.getState();
  useEffect(() => {
    if (dom.current) setDom(dom.current);
  }, [dom, setDom]);

  return (
    <div ref={dom} id="dom" className="relative h-screen w-full">
      <Pointer />
      <DevTools />
      <Header />
      <PostSelector />
      <AnimatePresence mode="wait">
        <Component {...pageProps} />
      </AnimatePresence>
      <GlobalCanvas
        className="!fixed h-full w-full top-0"
        style={{ pointerEvents: "none" }}
        scaleMultiplier={0.01}
        eventSource={dom}
        eventPrefix="client"
      >
        <GlobalScene />
      </GlobalCanvas>
    </div>
  );
}
