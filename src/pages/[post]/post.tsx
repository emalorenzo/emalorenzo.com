import { Layout } from "~/components/layout";
import { MDX } from "~/components/mdx";
import { Props } from ".";

export function Post({ posts, mdx, metadata }: Props) {
  return (
    <Layout posts={posts}>
      <h1>{metadata.title}</h1>
      <MDX source={mdx} />
    </Layout>
  );
}
