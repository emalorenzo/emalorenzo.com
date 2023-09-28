import { Background } from "~/components/canvas/background";
import { PostSelector } from "~/components/canvas/post-selector";

export function GlobalScene() {
  return (
    <>
      <Background position={[0, 0, -10]} />
      <PostSelector />
      <ambientLight />
    </>
  );
}
