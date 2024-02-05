import { getPostsMetadata } from "~/lib/cms";
import { PostMeta } from "~/types";
import { Posts } from "./posts/posts";

type Props = {
  children: React.ReactNode;
  posts: PostMeta[];
};

export default async function HomePage() {
  const posts = await getPostsMetadata();

  return <Posts posts={posts} />;
}
