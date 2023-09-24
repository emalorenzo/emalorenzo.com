import { Layout } from "~/components/layout";
import { MDX } from "~/components/mdx";
import { Props } from ".";

import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useStore } from "~/lib/store";
import styles from "./post.module.scss";

export function Post({ posts, mdx, metadata }: Props) {
  const router = useRouter();
  const params = useParams();
  const background = useRef<HTMLDivElement>(null!);

  const selectedPostIndex = useStore((s) => s.selectedPostIndex);
  const { setSelectedPostIndex, setCursor, setEventsTarget } = useStore.getState();

  useLayoutEffect(() => {
    const postIndex = posts.findIndex((p) => p.slug === params?.post);

    if (selectedPostIndex === null && postIndex !== -1) {
      setSelectedPostIndex(postIndex);
    }
  }, [params?.post, posts, selectedPostIndex, setSelectedPostIndex]);

  useEffect(() => {
    if (background) {
      setEventsTarget(background.current);
    }
  }, [setEventsTarget]);

  return (
    <Layout
      posts={posts}
      className={styles.postWrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div
        ref={background}
        className={styles.background}
        onClick={() => router.push("/")}
        onPointerOver={() => setCursor("Close")}
      ></div>
      <motion.article
        initial={{ y: 0 }}
        animate={{ y: -200 }}
        exit={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.articleContent}>
          <MDX source={mdx} />
        </div>
      </motion.article>
    </Layout>
  );
}
