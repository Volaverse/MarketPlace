import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls, useGLTF} from "@react-three/drei";
// import fbxFile1 from '../assets/3dFiles/1.fbx'

function Model(props) {
  const { scene } = useGLTF("https://bafkreia5wmjarutn5thtox6lepj2vohse35r5wnv3u4lv7mhqussoc5ncq.ipfs.nftstorage.link/");
    // const { scene } = useFBX("https://store.volaverse.com/assets/3d/1.fbx");
  return <primitive object={scene} />;
}




function Test3() {

  return (
    <Canvas pixelRatio={[1, 2]} camera={{ position: [-10, 15, 15], fov: 50 }}>
      <ambientLight intensity={1} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );

}

export default Test3;
