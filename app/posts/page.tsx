import { ParsedUrlQuery } from "querystring";
import { getPostsMetadata } from "~/lib/cms";
import { Posts } from "./posts";

interface Params extends ParsedUrlQuery {
  post: string;
}

export default async function PostsPage() {
  const posts = await getPostsMetadata();

  return <Posts posts={posts} />;
}
