// import React, { Suspense } from "react";
// import { Canvas } from "react-three-fiber";
// import { OrbitControls, useGLTF} from "@react-three/drei";
// import * as THREE from "three";

// //ipfs://bafkreieisebmeaoxc64aevm2bmuygw2pav2rfffqeaojkvu367oyuuunce
// //ipfs://bafkreigdq3cvookgwykmm4zpfowx4j4u2geawvyiqfrk2xktccgwo3hqvi
// //https://bafkreieisebmeaoxc64aevm2bmuygw2pav2rfffqeaojkvu367oyuuunce.ipfs.nftstorage.link/
// function Model() {
//   const { scene } = useGLTF("https://bafkreigdq3cvookgwykmm4zpfowx4j4u2geawvyiqfrk2xktccgwo3hqvi.ipfs.nftstorage.link");
//   // const { scene } = useGLTF("https://bafkreieisebmeaoxc64aevm2bmuygw2pav2rfffqeaojkvu367oyuuunce.ipfs.nftstorage.link/");
//   // const { scene } = useGLTF("http://store.volaverse.com/assets/3d/gltf/1.glb");
//     // const { scene } = useFBX("https://store.volaverse.com/assets/3d/1.fbx");
//   return <primitive object={scene} />;
// }



// export default function ThreeScene() {
//   return (
//     <Canvas pixelRatio={[1, 4]} camera={{ position: [10, 10, 15], fov: 75 }}>
//       <ambientLight intensity={1} />
//       <Suspense fallback={null}>
//         <Model />
//       </Suspense>
//       <OrbitControls />
//     </Canvas>
//   );
// }





// import React, { Suspense, useRef } from "react";
// import { Canvas } from "react-three-fiber";
// import { OrbitControls, useGLTF } from "@react-three/drei";
// import * as THREE from "three";


// function Model() {
//   const { scene } = useGLTF("https://bafkreigdq3cvookgwykmm4zpfowx4j4u2geawvyiqfrk2xktccgwo3hqvi.ipfs.nftstorage.link");
//   const groupRef = useRef();
//   const bbox = new THREE.Box3().setFromObject(scene);
//   const center = bbox.getCenter(new THREE.Vector3());
  

//   console.log('three cemter is ',center)
//   console.log('groupRef is',groupRef.current)

//   if (groupRef.current) {
//     groupRef.current.position.x = -center.x;
//     groupRef.current.position.y = -center.y;
//     groupRef.current.position.z = -center.z;
//   }

//   return (
//     <group ref={groupRef}>
//       <primitive object={scene} />
//     </group>
//   );
// }

// export default function ThreeScene() {
//   return (
//     <Canvas pixelRatio={[1, 4]} camera={{ position: [10, 10, 15], fov: 75 }}>
//       <ambientLight intensity={1} />
//       <Suspense fallback={null}>
//         <Model />
//       </Suspense>
//       <OrbitControls />
//     </Canvas>
//   );
// }



import React, { Suspense, useEffect, useRef, useState,useLayoutEffect } from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function Model() {
  const { scene } = useGLTF(
    "https://bafkreigdq3cvookgwykmm4zpfowx4j4u2geawvyiqfrk2xktccgwo3hqvi.ipfs.nftstorage.link"
  );
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

export default function ThreeScene() {
  return (
    <Canvas pixelRatio={[1, 4]} camera={{ position: [10, 10, 15], fov: 75 }}>
      <ambientLight intensity={1} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}










