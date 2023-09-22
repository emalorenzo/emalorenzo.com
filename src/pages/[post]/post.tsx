import { Layout } from "~/components/layout";
import { MDX } from "~/components/mdx";
import { Props } from ".";

import styles from "./post.module.scss";

export function Post({ posts, mdx, metadata }: Props) {
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
