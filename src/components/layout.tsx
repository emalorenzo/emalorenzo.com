import { HTMLMotionProps, motion } from "framer-motion";
import { PropsWithChildren, useEffect } from "react";
import { useStore } from "~/lib/store";
import { PostMeta } from "~/types";

type Props = HTMLMotionProps<"main"> & {
  posts: PostMeta[];
};

export function Layout({ children, posts, ...props }: PropsWithChildren<Props>) {
  const { setPosts } = useStore.getState();

  useEffect(() => {
    setPosts(posts);
  }, [posts, setPosts]);

  return <motion.main {...props}>{children}</motion.main>;
}
