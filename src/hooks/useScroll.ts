import { useEffect } from "react";
import { useStore } from "~/store/store";

export function useScroll(callback: (event: any) => void, deps = []) {
  const lenis = useStore(({ lenis }) => lenis);

  useEffect(() => {
    if (!lenis) return;

    lenis.on("scroll", callback);
    lenis.emit();

    return () => {
      lenis.off("scroll", callback);
    };
  }, [lenis, callback, ...deps]);
}
