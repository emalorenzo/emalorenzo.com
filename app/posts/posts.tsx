"use client";

import { PostItem } from "~/components/post-item";
import { PostMeta } from "~/types";

import { AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useRouteVisible } from "~/hooks/useRouteVisible";
import { useStore } from "~/store/store";
import styles from "./posts.module.scss";

export function Posts() {
  const { post: slug } = useParams();
  const { setPosts, setActivePost } = useStore.getState();
  const posts = useStore((state) => state.posts);

  const getStatus = (post: PostMeta) => {
    if (slug) {
      return post.slug === slug ? "active" : "mini";
    } else {
      return "idle";
    }
  };

  useEffect(() => {
    if (posts.length) {
      setActivePost(null);
    }
  }, [posts.length, setActivePost]);

  const isVisible = useRouteVisible();

  return (
    <AnimatePresence mode="wait">
      {isVisible && posts.length && (
        <section className={styles.posts}>
          {posts.map((post, i) => {
            const status = getStatus(post);

            return <PostItem key={i} post={post} status={status} />;
          })}
        </section>
      )}
    </AnimatePresence>
  );
}
