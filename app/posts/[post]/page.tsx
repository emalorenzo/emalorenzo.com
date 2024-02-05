import { ParsedUrlQuery } from "querystring";
import { getMDX, getPostsMetadata } from "~/lib/cms";
import { Post } from "./post";

interface Params extends ParsedUrlQuery {
  post: string;
}

export default async function PostPage({ params }: { params: { post: string } }) {
  const posts = await getPostsMetadata();
  const { post } = params as Params;

  const { mdxSource, frontMatter } = await getMDX(`posts/${post}.mdx`);

  return <Post posts={posts} metadata={frontMatter} mdx={mdxSource} />;
}
