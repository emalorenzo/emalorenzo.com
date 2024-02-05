"use client";

import { PostItem } from "~/components/post-item";
import { PostMeta } from "~/types";

import { AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useRouteVisible } from "~/hooks/useRouteVisible";
import { useStore } from "~/store/store";
import styles from "./posts.module.scss";

export type Props = {
  posts: PostMeta[];
};

export function Posts({ posts }: Props) {
  const { post: slug } = useParams();
  const { setPosts, setActivePost } = useStore.getState();

  const getStatus = (post: PostMeta) => {
    if (slug) {
      return post.slug === slug ? "active" : "mini";
    } else {
      return "idle";
    }
  };

  useEffect(() => {
    if (posts.length) {
      setPosts(posts);
      setActivePost(null);
    }
  }, [posts, setPosts, setActivePost]);

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
