import { useStore } from "~/lib/store";

export function Selector() {
  const posts = useStore((s) => s.posts);
  console.log("posts", posts);

  return (
    <div>
      <h1>Selector</h1>
      <ul>
        {posts?.map((post) => (
          <li key={post.slug}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
