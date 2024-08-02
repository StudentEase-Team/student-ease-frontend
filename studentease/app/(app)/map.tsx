// src/components/Model.jsx
import React, { useRef, useState, useEffect } from 'react';
import { Text } from 'react-native-paper'
import { Canvas, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { GLView } from 'expo-gl';
import { Asset } from 'expo-asset';
import { Platform, View, StyleSheet, ActivityIndicator } from 'react-native';
import { OrbitControls as WebOrbitControls } from '@react-three/drei';
//import { OrbitControls as MobileOrbitControls } from 'r3f-native-orbitcontrols';

const Model = ({ uri }: { uri: string }) => {
  const gltf =  useLoader(GLTFLoader, uri);
  const modelRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  useEffect(() => {
    if (gltf.scene) {
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh && !child.material) {
          child.material = new THREE.MeshStandardMaterial({ color: 'orange' });
        }
      });
    }
  }, [gltf]);

  return (
    <group ref={modelRef}>
      <primitive object={gltf.scene} />
    </group>
  );
};

const Map = () => {
  const [modelUri, setModelUri] = useState<string | null>(null);

    if(Platform.OS === 'web')
      return (
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <directionalLight position={[0, 10, 5]} intensity={1} />
          <Model uri="../../assets/3d/realistic-burger/source/burgar_04.glb" />
            <WebOrbitControls/>
        </Canvas>
      );
      else
        return(
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <directionalLight position={[0, 10, 5]} intensity={1} />
          <Model uri="../../assets/3d/tank.glb" />
            <WebOrbitControls/>
        </Canvas>
        )
};



export default Map;
