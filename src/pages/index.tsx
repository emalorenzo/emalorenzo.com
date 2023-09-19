import { GetStaticProps } from "next";
import Link from "next/link";
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
      <h1>posts</h1>
      {posts.map((post) => (
        <Link href={`/${post.slug}`} key={post.slug}>
          <article className="w-20">{post.title}</article>
        </Link>
      ))}
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
