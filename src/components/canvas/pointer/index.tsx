
type Props = JSX.IntrinsicElements["mesh"];

export function Pointer({ position, ...props }: Props) {
  // const ref = useRef<THREE.Mesh>(null!);

  // const viewport = useThree((t) => t.viewport);
  // const camera = useThree((t) => t.camera) as THREE.PerspectiveCamera;

  // const offsetViewport = viewport.getCurrentViewport(camera, position as THREE.Vector3);

  // useFrame(({ pointer }, delta) => {
  //   // const targetX = (viewport.width / 2) * pointer.x;
  //   // const targetY = (viewport.height / 2) * pointer.y;

  //   ref.current.position.x = THREE.MathUtils.damp(ref.current.position.x, targetX, 7, delta);
  //   ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, targetY, 7, delta);
  // });
  return (
    // <mesh ref={ref} position={position} {...props}>
    //   <circleGeometry args={[0.5, 64]} />
    //   <meshStandardMaterial color="hotpink" />
    // </mesh>
  );
}
