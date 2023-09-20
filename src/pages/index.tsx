import { GetStaticProps } from "next";
import { getPostsMetadata } from "~/lib/cms";
import { PostMeta } from "~/types";

import { Layout } from "~/components/layout";
import styles from "./home.module.scss";

export type Props = {
  posts: PostMeta[];
};

export default function HomePage({ posts }: Props) {
  return (
    <Layout posts={posts} className={styles.home}>
      home
    </Layout>
  );
}

export const getStaticProps = (async () => {
  const postsMetadata = await getPostsMetadata();

  return {
    props: {
      posts: postsMetadata,
    } as Props,
  };
}) satisfies GetStaticProps;
