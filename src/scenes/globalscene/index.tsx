import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Background } from "~/components/canvas/background";
import { useStore } from "~/lib/store";

export function GlobalScene() {
  const eventsTarget = useStore((s) => s.eventsTarget) as HTMLDivElement;
  const dom = useStore((s) => s.dom) as HTMLDivElement;

  const { setEventsTarget } = useStore.getState();
  const events = useThree((t) => t.events);

  useEffect(() => {
    const connectedId = events.connected?.id;

    const target = eventsTarget || dom;
    const isConnectedToTarget = connectedId === target.id;

    if (!isConnectedToTarget) {
      events.connect(target);

      console.log("connected events to", eventsTarget);
    }

    return () => {
      // events.connect(dom);
    };
  }, [eventsTarget, events, dom, setEventsTarget]);

  return (
    <>
      <Background position={[0, 0, -10]} />
      {/* <PostSelector /> */}
      <ambientLight />
      {/* <StatsGl /> */}
    </>
  );
}
