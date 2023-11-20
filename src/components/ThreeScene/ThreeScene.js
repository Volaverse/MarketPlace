import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function Model(params) {
  let link;
  console.log('model params',params)
  if (params.link) {
    link = params.link;
  } else {
    link =
      "https://bafybeifu3hwr35xszvjkdcaam4bldhyx4mqxzemvbjjexj45bubaewighy.ipfs.nftstorage.link/16m.glb";
  }
  const { scene } = useGLTF(link);
  const groupRef = useRef();
  const bbox = new THREE.Box3().setFromObject(scene);
  const center = bbox.getCenter(new THREE.Vector3());

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.x = -center.x;
      groupRef.current.position.y = -center.y;
      groupRef.current.position.z = -center.z;
    }
  }, [center]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

export default function ThreeScene({params}) {
  console.log('threeScene params',params)
  return (
    <Canvas pixelRatio={[1, 4]} camera={{ position: [10, 10, 10], fov: 5 }}>
      <ambientLight intensity={1} />
      <Suspense fallback={null}>
        <Model link={params.threeDUrl} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
