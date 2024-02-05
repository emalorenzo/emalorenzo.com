"use client";

import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import dynamic from "next/dynamic";
import { useMedia } from "react-use";
import { PageLoader } from "~/components/page-loader";
import { useStore } from "~/store/store";

import { useEffect } from "react";
import { RootLayout } from "~/layout/root-layout";

gsap.registerPlugin(Flip);

const GlobalCanvas = dynamic(
  () => import("~/components/global-canvas").then((m) => m.GlobalCanvas),
  { ssr: false }
);

type Props = {
  children: React.ReactNode;
};

export function App({ children }: Props) {
  const isMobile = useMedia("(max-width: 800px)", false);
  const setUseWebGL = useStore((state) => state.setUseWebGL);

  const useWebGL = !isMobile;

  useEffect(() => {
    setUseWebGL(useWebGL);
  }, [useWebGL, setUseWebGL]);

  return (
    <RootLayout>
      {children}
      {useWebGL && <GlobalCanvas />}
      <PageLoader />
    </RootLayout>
  );
}
