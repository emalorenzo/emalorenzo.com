import { GetStaticProps } from "next";
import { getPostsMetadata } from "~/lib/cms";
import { PostMeta } from "~/types";

import { useEffect } from "react";
import { Layout } from "~/components/layout";
import { useStore } from "~/lib/store";
import styles from "./home.module.scss";

export type Props = {
  posts: PostMeta[];
};

export default function HomePage({ posts }: Props) {
  const { setEventsTarget } = useStore.getState();
  const dom = useStore((s) => s.dom);

  useEffect(() => {
    if (dom) {
      setEventsTarget(dom);
    }
  }, [dom, setEventsTarget]);

  return <Layout posts={posts} className={styles.home}></Layout>;
}

export const getStaticProps = (async () => {
  const postsMetadata = await getPostsMetadata();

  return {
    props: {
      posts: postsMetadata,
    } as Props,
  };
}) satisfies GetStaticProps;
