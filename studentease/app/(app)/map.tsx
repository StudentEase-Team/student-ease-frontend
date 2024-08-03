import React, { useRef } from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { Canvas, useThree } from '@react-three/fiber';
import { Tank } from '../../component/3d/Tank';
import { GestureHandlerRootView, PanGestureHandler, PinchGestureHandler } from 'react-native-gesture-handler';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import * as THREE from 'three';
import useControls from "r3f-native-orbitcontrols"

const Map = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera | THREE.OrthographicCamera | null>(null);

  const onPanGestureEvent = (event) => {
    console.info("pan " + cameraRef.current);
    if (cameraRef.current) {
      const { translationX, translationY } = event.nativeEvent;

      // Move camera position
      cameraRef.current.position.x -= translationX / 10000;
      cameraRef.current.position.y += translationY / 10000;
    }
  };

  const onPinchGestureEvent = (event) => {
    console.info("pinch");
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

  if(Platform.OS !== 'web')
  return (
    <GestureHandlerRootView style={styles.container}>
    <PinchGestureHandler onGestureEvent={onPinchGestureEvent}>
      <PanGestureHandler onGestureEvent={onPanGestureEvent}>

            <Canvas>
              <CameraSetup />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <Tank />
            </Canvas>
          </PanGestureHandler>
        </PinchGestureHandler>

    </GestureHandlerRootView>
  );
  else{
  const [OrbitControls, events] = useControls()
  return (
      <View {...events} style={styles.container}>
        <Canvas>
          <OrbitControls/>
          <CameraSetup />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Tank />
        </Canvas>
      </View>
  )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Map;
