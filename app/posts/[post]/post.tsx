"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { useEffect } from "react";
import { MDX } from "~/components/mdx";
import { useRouteVisible } from "~/hooks/useRouteVisible";
import { SmoothScroll } from "~/layout/smooth-scroll";
import { useStore } from "~/store/store";
import { PostMeta } from "~/types";
import styles from "./detail.module.scss";

type Props = {
  posts: PostMeta[];
  metadata: PostMeta;
  mdx: MDXRemoteSerializeResult;
};

export function Post({ posts, mdx, metadata }: Props) {
  const useWebGL = useStore((state) => state.useWebGL);
  const { setPosts, setActivePost } = useStore.getState();

  useEffect(() => {
    if (posts.length) {
      setPosts(posts);
      setActivePost(metadata);
    }
  }, [posts, setPosts, setActivePost, metadata]);

  const isVisible = useRouteVisible();

  return (
    <SmoothScroll className={styles.page}>
      <AnimatePresence mode="wait">
        {isVisible && (
          <>
            <section key="hero" className={clsx(styles.hero, !useWebGL && "bg-zinc-800")}>
              <motion.h1
                className={styles.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.7 }}
              >
                {metadata.title}
              </motion.h1>
            </section>
            <motion.section
              key="article"
              initial={{ y: "100px" }}
              animate={{ y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className={styles.contentWrapper}
            >
              <article className={styles.content}>
                <MDX source={mdx} />
              </article>
            </motion.section>
          </>
        )}
      </AnimatePresence>
    </SmoothScroll>
  );
}
