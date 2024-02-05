import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { ParsedUrlQuery } from "querystring";
import { Post } from "./post";

import { getMDX, getPostsMetadata, listFiles } from "~/lib/cms";
import { PostMeta } from "~/types";

interface Params extends ParsedUrlQuery {
  post: string;
}

export type Props = {
  metadata: PostMeta;
  mdx: MDXRemoteSerializeResult;
  posts: PostMeta[];
};

export const getStaticPaths = (async () => {
  const files = await listFiles("posts");
  const paths = files.map((file) => `/${file.replace(/\.mdx$/, "")}`);

  return {
    paths,
    fallback: false,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params }) => {
  const { post } = params as Params;

  const { mdxSource, frontMatter } = await getMDX(`posts/${post}.mdx`);
  const postsMetadata = await getPostsMetadata();

  return {
    props: {
      mdx: mdxSource,
      metadata: frontMatter,
      posts: postsMetadata,
    } as Props,
  };
}) satisfies GetStaticProps;

export default Post;
