import { Suspense } from "react";
import { Background } from "~/components/canvas/background";
import { PostSelector } from "~/components/canvas/post-selector";
import { R3F } from "~/lib/r3f";

export function GlobalScene() {
  return (
    <Suspense fallback={null}>
      <Background position={[0, 0, -10]} />
      <PostSelector />
      <R3F.Out />
    </Suspense>
  );
}
