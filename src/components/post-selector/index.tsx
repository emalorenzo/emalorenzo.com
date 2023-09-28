import { PostItem } from "~/components/post-item";

import { SmoothScrollbar, useScrollbar } from "@14islands/r3f-scroll-rig";
import { usePathname } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useStore } from "~/lib/store";
import { useDevToolsStore } from "../dev-tools/store";
import styles from "./post-selector.module.scss";

export const ASPECT_RATIO = 16 / 9;
export const ITEM_WIDTH = 350;
export const ITEM_HEIGHT = ITEM_WIDTH / ASPECT_RATIO;
export const ITEM_SPACING = 16;
export const SELECTOR_OFFSET = window.innerWidth * 0.5 - ITEM_WIDTH * 0.5;

export function PostSelector() {
  const pathname = usePathname();
  const { __lenis } = useScrollbar();

  const posts = useStore((s) => s.posts);
  const { setSelectedPostIndex } = useStore.getState();
  const selectedPostIndex = useStore((s) => s.selectedPostIndex);
  const enableWebGL = useDevToolsStore((s) => s.enableWebGL);

  const post = selectedPostIndex !== null ? posts[selectedPostIndex] : null;
  const dom = useStore((s) => s.dom);

  useEffect(() => {
    if (pathname === "/") {
      __lenis?.start();
    } else {
      __lenis?.stop();
    }
  }, [__lenis, pathname]);

  const handleScroll = useCallback(
    (e: WheelEvent) => {
      setSelectedPostIndex(null);
    },
    [setSelectedPostIndex]
  );

  useEffect(() => {
    dom?.addEventListener("wheel", handleScroll, { passive: true });

    return () => {
      dom?.removeEventListener("wheel", handleScroll);
    };
  }, [dom, handleScroll]);

  return (
    <SmoothScrollbar
      enabled={enableWebGL}
      horizontal
      config={{ orientation: "horizontal", gestureOrientation: "both" }}
    >
      {(bind) => (
        <div
          style={{
            "--item-width": ITEM_WIDTH,
            "--item-height": ITEM_HEIGHT,
            "--selector-offset": SELECTOR_OFFSET,
            "--item-spacing": ITEM_SPACING,
          }}
          className={styles.wrapper}
          {...bind}
        >
          {posts?.map((post, index) => (
            <PostItem key={post.slug} post={post} index={index} maxScale={2.2} />
          ))}
        </div>
      )}
    </SmoothScrollbar>
  );
}
