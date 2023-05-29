import "./ThreeScene.css";
import { Canvas } from "react-three-fiber";
import { Environment, OrbitControls, useFBX } from "@react-three/drei";
import { Suspense } from "react";

const Scene = () => {
  const fbx = useFBX("1.fbx");

  return <primitive object={fbx} scale={0.05} />;
};

export default function ThreeScene() {
  return (
    <div>
      <Canvas>
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls />
          <Environment preset="sunset" background />
        </Suspense>
      </Canvas>
    </div>
  );
}
