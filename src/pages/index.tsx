import { GetStaticProps } from "next";
import { getPostsMetadata } from "~/lib/cms";
import { PostMeta } from "~/types";

import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "~/components/button";
import { Layout } from "~/components/layout";
import { useStore } from "~/lib/store";
import styles from "./home.module.scss";

export type Props = {
  posts: PostMeta[];
};

export default function HomePage({ posts }: Props) {
  const router = useRouter();
  const { setSelectedPostIndex } = useStore.getState();

  const selectedPostIndex = useStore((s) => s.selectedPostIndex);
  const selectedPost = selectedPostIndex !== null ? posts[selectedPostIndex] : null;

  const handleClick = () => {
    if (selectedPost) {
      router.push(selectedPost.slug);
    }
  };
  return (
    <Layout posts={posts} className={styles.home}>
      <AnimatePresence mode="wait">
        {selectedPostIndex !== null && (
          <Button
            onClick={handleClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className={styles.readButton}
          >
            Leer
          </Button>
        )}
      </AnimatePresence>
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
