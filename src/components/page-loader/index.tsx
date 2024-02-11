"use client";

import { useProgress } from "@react-three/drei";
import { Route } from "next";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
// import { useMedia } from 'react-use'

import { sleep } from "~/lib/utils";
import { useLoaderStore } from "~/store/loader";

// import { Background } from '../background'

// import { Logo } from './logo'

export function PageLoader() {
  // const logoRef = useRef<HTMLDivElement>(null)
  // const [visible, setVisible] = useState(false)
  // const isMobile = useMedia('(max-width: 800px)', false)

  const router = useRouter();
  const pathname = usePathname();
  const { active: isLoadingAssets } = useProgress();

  const targetRoute = useLoaderStore((state) => state.targetRoute);
  const navigationOptions = useLoaderStore((state) => state.navigationOptions);
  const appReady = useLoaderStore((state) => state.appReady);
  const setTargetRoute = useLoaderStore.getState().setTargetRoute;

  const handleRouteChange = useCallback(async () => {
    if (!targetRoute) return;

    const navigate = navigationOptions.replace ? router.replace : router.push;
    if (navigationOptions.delay) {
      await sleep(navigationOptions.delay);
    }

    navigate(targetRoute as Route);
  }, [navigationOptions, router.push, router.replace, targetRoute]);

  useEffect(() => {
    if (!targetRoute || !appReady) return;

    const target = targetRoute?.split("?")[0];

    // we are loading a new page
    if (pathname !== target) {
      if (navigationOptions.showLoader) {
        // setVisible(true)
      } else {
        handleRouteChange();
      }
    }

    // we finished loading a new page
    if (pathname === target && !isLoadingAssets) {
      setTimeout(() => {
        // setVisible(false)
        setTargetRoute(null, {});
      }, 100);
    }
  }, [
    appReady,
    handleRouteChange,
    isLoadingAssets,
    navigationOptions.showLoader,
    pathname,
    setTargetRoute,
    targetRoute,
  ]);

  return null;
  // <div className="flex fixed top-0 left-0 z-50 justify-center items-center w-full h-full pointer-events-none">
  //   {isMobile ? (
  //     <motion.div
  //       className="absolute w-full h-full bg-[var(--purple-background)] pointer-events-none"
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: visible ? 1 : 0 }}
  //       onAnimationComplete={handleRouteChange}
  //       transition={{ duration: 0.5, ease: 'easeOut' }}
  //     />
  //   ) : (
  //     <Canvas
  //       className="w-full h-full"
  //       style={{ position: 'absolute', pointerEvents: 'none' }}
  //       gl={{ powerPreference: 'high-performance', alpha: true }}
  //     >
  //       <Background
  //         visible={visible}
  //         onTransitionComplete={handleRouteChange}
  //         uniforms={{
  //           uSpeed1: 1,
  //           uSpeed2: 1,
  //           uSpeed3: 1,
  //         }}
  //       />
  //     </Canvas>
  //   )}
  //   <AnimatePresence>
  //     {visible && (
  //       <Logo
  //         ref={logoRef}
  //         initial={{ y: 'calc(50vh + 50%)', opacity: 0 }}
  //         animate={{ y: '0%', opacity: 1 }}
  //         exit={{ y: 'calc(-50vh - 50%)', opacity: 0 }}
  //         transition={{ duration: 0.5, ease: 'easeOut' }}
  //       />
  //     )}
  //   </AnimatePresence>
  // </div>
}
