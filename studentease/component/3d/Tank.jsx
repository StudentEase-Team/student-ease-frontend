import React, { useState, useEffect } from 'react';
import { Asset } from 'expo-asset';
import { useGLTF } from '@react-three/drei';
import { Text } from 'react-native';

export function Tank(props) {
  const [uri, setUri] = useState(null);
  const asset = Asset.fromModule(require('../../assets/3d/tank.glb'));

  useEffect(() => {
    const loadAsset = async () => {
      try {
        if (!asset.localUri) {
          await asset.downloadAsync();
        }
        setUri(asset.localUri);
      } catch (error) {
        console.error('Failed to download asset', error);
      }
    };

    loadAsset();
  }, [asset]);

  if (!uri) {
    console.info("Not loaded");
    return null
  } else {
    console.info("Loaded");
  }

  const { nodes, materials } = useGLTF(uri);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials.tank}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload(Asset.fromModule(require('../../assets/3d/tank.glb')).localUri);
