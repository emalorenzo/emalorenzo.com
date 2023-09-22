import { Layout } from "~/components/layout";
import { MDX } from "~/components/mdx";
import { Props } from ".";

import { useParams } from "next/navigation";
import { useLayoutEffect } from "react";
import { useStore } from "~/lib/store";
import styles from "./post.module.scss";

export function Post({ posts, mdx, metadata }: Props) {
  const params = useParams();

  const selectedPostIndex = useStore((s) => s.selectedPostIndex);
  const { setSelectedPostIndex } = useStore.getState();

  useLayoutEffect(() => {
    const postIndex = posts.findIndex((p) => p.slug === params?.post);

    if (selectedPostIndex === null && postIndex !== -1) {
      setSelectedPostIndex(postIndex);
    }
  }, [params?.post, posts, selectedPostIndex, setSelectedPostIndex]);
  return (
    <Layout
      posts={posts}
      className={styles.postWrapper}
      initial={{ y: 0 }}
      animate={{ y: -200 }}
      exit={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <article>
        <MDX source={mdx} />
      </article>
    </Layout>
  );
}
