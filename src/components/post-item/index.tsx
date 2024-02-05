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
} & JSX.IntrinsicElements["group"];

export function PostItem({ post, status, ...props }: Props) {
  const ref = useRef<HTMLDivElement>(null!);
  const textWrapperRef = useRef<HTMLDivElement>(null!);
  const [hovered, setHovered] = useState(false);
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
          ref={textWrapperRef}
          className={styles.textWrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <HackerText active={hovered} className={styles.title}>
            {post.title}
          </HackerText>
          <h3 className={styles.summary}>{post.summary}</h3>
        </motion.div>
      </article>
    </Link>
  );
}
