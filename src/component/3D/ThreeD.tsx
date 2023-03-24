import { Bounds } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, Group, BoxGeometry, MeshPhongMaterial, Vector3 } from "three";
import { PerspectiveCamera } from "@react-three/drei";

function LShape() {
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.x += 0.003;
    groupRef.current.rotation.y += 0.003;
  });

  return (
    <group ref={groupRef} position={new Vector3(0, 0, 0)}>
      <mesh position={new Vector3(0, -0.5, -0.5)}>
        <boxGeometry args={[0.4, 1, 1]} />
        <meshPhongMaterial color={0x969696} />
      </mesh>
      <mesh position={new Vector3(0, 0.5, -0.5)}>
        <boxGeometry args={[0.4, 1, 1]} />
        <meshPhongMaterial color={0x969696} />
      </mesh>
      <mesh position={new Vector3(0, 0.5, 0.5)}>
        <boxGeometry args={[0.4, 1, 1]} />
        <meshPhongMaterial color={0x969696} />
      </mesh>
      <mesh position={new Vector3(0, -0.5, 0.5)}>
        <boxGeometry args={[0.45, 0.85, 0.85]} />
        <meshPhongMaterial color={0x0078f9} />
      </mesh>
      {/* <mesh position={new Vector3(0, 0, 0)} scale={new Vector3(0.1, 0.1, 0.1)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhongMaterial color={0xff0000} />
      </mesh> */}
    </group>
  );
}

export default function ThreeD() {
  return (
    <div style={{ width: "100%", height: "28vh" }}>
      <Canvas>
        <PerspectiveCamera makeDefault fov={20} position={[0, 0, 8]} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <LShape />
      </Canvas>
    </div>
  );
}
