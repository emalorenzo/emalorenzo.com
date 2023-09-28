import { Button } from "~/components/button";
import { useDevToolsStore } from "./store";

export function DevTools() {
  const enableWebGL = useDevToolsStore((s) => s.enableWebGL);
  const enableSmoothTouchScroll = useDevToolsStore((s) => s.enableSmoothTouchScroll);

  const { setEnableWebGL, setEnableSmoothTouchScroll } = useDevToolsStore.getState();

  const handleEnableWebGL = () => {
    setEnableWebGL(!enableWebGL);
  };

  const handleEnableSmoothTouchScroll = () => {
    setEnableSmoothTouchScroll(!enableSmoothTouchScroll);
  };

  return (
    <aside className="fixed bottom-0 right-0 z-40">
      <Button onClick={handleEnableWebGL}>{`${enableWebGL ? "disable" : "enable"} WebGL`}</Button>
      <Button onClick={handleEnableSmoothTouchScroll}>{`${
        enableSmoothTouchScroll ? "disable" : "enable"
      } SmoothTouchScroll`}</Button>
    </aside>
  );
}
