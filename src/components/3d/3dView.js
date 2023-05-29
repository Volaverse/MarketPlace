import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
const ModelViewer = ({ modelFile }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Create a Three.js renderer, camera, and scene
        const renderer = new THREE.WebGLRenderer();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const scene = new THREE.Scene();

        // Set up the renderer
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        // Load the model file
        let loader;
        if(modelFile.endsWith('.fbx')) {
            console.log('in fbx condition')
            loader = new FBXLoader();
        }
        // } else if(modelFile.endsWith('.obj')) {
        //     loader = new THREE.OBJLoader();
        // } else if(modelFile.endsWith('.gltf')) {
        //     loader = new THREE.GLTFLoader();
        // }

        loader.load(modelFile, object => {
            scene.add(object);
            console.log("logginf of scene"+scene)
        });
        console.log("Loader is "+loader)

        // Add lights to the scene
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(25, 50, 25);
        scene.add(pointLight);
        console.log(scene)
        // Render the scene
        const animate = () => {
            console.log("In animation")
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();
    }, [modelFile]);

    return <div ref={containerRef} />;
};

export default ModelViewer;
