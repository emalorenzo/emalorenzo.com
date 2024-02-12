import clsx from "clsx";
import { useRef, useState } from "react";
import { HackerText } from "~/components/hacker-text";
import { PostMeta } from "~/types";

import { motion } from "framer-motion";
import { useStore } from "~/store/store";
import { Link } from "../link";
import styles from "./post-item.module.scss";

type Props = {
  post: PostMeta;
  status: "mini" | "idle" | "active";
  visible?: boolean;
};

export function PostItem({ post, status, visible = true, ...props }: Props) {
  const ref = useRef<HTMLDivElement>(null!);
  const [hovered, setHovered] = useState<boolean>(null!);
  const useWebGL = useStore((state) => state.useWebGL);
  const activePost = useStore((state) => state.activePost);
  const { setHoveredPost, setActivePost } = useStore.getState();

  const targetURL = `/posts/${post.slug}`;

  const handleHover = () => {
    setHovered(true);

    if (!activePost) {
      setHoveredPost(post);
    }
  };

  const handleUnhover = () => {
    setHovered(false);

    if (!activePost) {
      setHoveredPost(null);
    }
  };

  const handleClick = () => {
    setHoveredPost(null);
    setActivePost(post);
  };

  // first condition is for the first render, but when app is ready
  const titleActive = (hovered === null && visible) || hovered;

  return (
    <Link href={targetURL} navigationOptions={{ delay: useWebGL ? 1000 : 0 }}>
      <article
        ref={ref}
        className={styles.wrapper}
        onPointerOver={handleHover}
        onPointerOut={handleUnhover}
        onClick={handleClick}
      >
        <div className={clsx(styles.view, useWebGL && "opacity-0")} />
        <motion.div
          className={styles.textWrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <HackerText active={titleActive} className={styles.title}>
            {post.title}
          </HackerText>
          <motion.h3
            className={styles.summary}
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {post.summary}
          </motion.h3>
        </motion.div>
      </article>
    </Link>
  );
}
