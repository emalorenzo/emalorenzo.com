import { SmoothScrollbar } from "@14islands/r3f-scroll-rig";
import { HTMLMotionProps, motion } from "framer-motion";
import { PropsWithChildren, useEffect } from "react";
import { useDevToolsStore } from "~/components/dev-tools/store";
import { useStore } from "~/lib/store";
import { PostMeta } from "~/types";

type Props = HTMLMotionProps<"main"> & {
  posts?: PostMeta[];
};

export function Layout({ children, posts, ...props }: PropsWithChildren<Props>) {
  const { setPosts } = useStore.getState();

  const enableWebGL = useDevToolsStore((s) => s.enableWebGL);
  const enableSmoothTouchScroll = useDevToolsStore((s) => s.enableSmoothTouchScroll);

  useEffect(() => {
    if (posts) {
      setPosts(posts);
    }
  }, [posts, setPosts]);

  return (
    <SmoothScrollbar enabled={enableWebGL} config={{ smoothTouch: enableSmoothTouchScroll }}>
      {(bind) => <motion.main {...props}>{children}</motion.main>}
    </SmoothScrollbar>
  );
}
