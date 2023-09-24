import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Background } from "~/components/canvas/background";
import { PostSelector } from "~/components/canvas/post-selector";
import { useStore } from "~/lib/store";

export function GlobalScene() {
  const eventsTarget = useStore((s) => s.eventsTarget);
  const dom = useStore((s) => s.dom);
  const events = useThree((t) => t.events);

  useEffect(() => {
    if (eventsTarget) {
      events.connect(eventsTarget);
    } else {
      events.connect(dom);
    }

    return () => {
      events.connect(dom);
    };
  }, [eventsTarget, events, dom]);

  return (
    <>
      <Background position={[0, 0, -10]} />
      <PostSelector />
      <ambientLight />
    </>
  );
}
