import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

function Cube() {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) {
      return;
    }

    meshRef.current.rotation.x += 0.003;
    meshRef.current.rotation.y += 0.003;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#0078F9" />
    </mesh>
  );
}

export default function ThreeD() {
  return (
    <div style={{ width: "50vw", height: "50vh" }}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Cube />
      </Canvas>
    </div>
  );
}
