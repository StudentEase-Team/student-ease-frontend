import React, { useRef } from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { Canvas, useThree } from '@react-three/fiber';
import { Tank } from '../../component/3d/Tank';
import { GestureHandlerRootView, PanGestureHandler, PinchGestureHandler } from 'react-native-gesture-handler';
import * as THREE from 'three';

const Map = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera | THREE.OrthographicCamera | null>(null);

  const onPanGestureEvent = (event) => {
    if (cameraRef.current) {
      const { translationX, translationY } = event.nativeEvent;
      // Move camera position
      cameraRef.current.position.x -= translationX / 1000;
      cameraRef.current.position.y += translationY / 1000;
    }
  };

  const onPinchGestureEvent = (event) => {
    if (cameraRef.current) {
      const { scale } = event.nativeEvent;
      if (cameraRef.current instanceof THREE.PerspectiveCamera) {
        // Adjust fov (Field of View) for PerspectiveCamera
        cameraRef.current.fov /= scale;
        cameraRef.current.updateProjectionMatrix();
      } else if (cameraRef.current instanceof THREE.OrthographicCamera) {
        // Adjust zoom for OrthographicCamera
        cameraRef.current.zoom /= scale;
        cameraRef.current.updateProjectionMatrix();
      }
    }
  };

  const CameraSetup = () => {
    const { camera } = useThree();
    cameraRef.current = camera as THREE.PerspectiveCamera | THREE.OrthographicCamera;
    return null;
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onGestureEvent={onPanGestureEvent}>
        <PinchGestureHandler onGestureEvent={onPinchGestureEvent}>
          <View style={styles.container}>
            <Canvas>
              <CameraSetup />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <Tank />
            </Canvas>
          </View>
        </PinchGestureHandler>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Map;
