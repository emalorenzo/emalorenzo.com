import { useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useStore } from "~/store/store";

type Props = JSX.IntrinsicElements["mesh"];

export function Background({ position, ...props }: Props) {
  const background = useRef<THREE.Mesh>(null!);
  const { setSelectedPostIndex, setCursor } = useStore.getState();

  const viewport = useThree((t) => t.viewport);
  const camera = useThree((t) => t.camera) as THREE.PerspectiveCamera;

  const offsetViewport = viewport.getCurrentViewport(camera, position as THREE.Vector3);

  const handleHover = () => {
    setCursor(null);
  };

  return (
    <mesh
      ref={background}
      position={position}
      onClick={() => {
        setSelectedPostIndex(null);
      }}
      onPointerOver={handleHover}
      {...props}
    >
      <planeGeometry args={[offsetViewport.width, offsetViewport.height, 1, 1]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  );
}
