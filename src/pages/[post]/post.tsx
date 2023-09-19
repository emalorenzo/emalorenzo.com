import { Layout } from "~/components/layout";
import { Props } from ".";

export function Post({ posts, metadata }: Props) {
  return (
    <Layout posts={posts}>
      <h1>{metadata.title}</h1>
    </Layout>
  );
}
