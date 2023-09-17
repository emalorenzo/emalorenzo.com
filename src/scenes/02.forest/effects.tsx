import { Bloom, EffectComposer, N8AO } from "@react-three/postprocessing";
import { useControls } from "leva";

export function Effects() {
  const { effects } = useControls({
    effects: {
      value: true,
    },
  });

  return (
    effects && (
      <EffectComposer disableNormalPass multisampling={4}>
        <Bloom mipmapBlur intensity={0.5} luminanceThreshold={0.5} />
        <N8AO aoRadius={20} intensity={3} distanceFalloff={1} screenSpaceRadius />
      </EffectComposer>
    )
  );
}
