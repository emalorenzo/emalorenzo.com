import { getPostsMetadata } from "~/lib/cms";
import { Home } from "./home/home";

export default async function HomePage() {
  const posts = await getPostsMetadata();

  return <Home posts={posts} />;
}
