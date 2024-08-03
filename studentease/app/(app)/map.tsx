// src/components/Model.jsx
import React, { useRef, useState, useEffect } from 'react';
import { Text } from 'react-native-paper'
import {Tank} from '../../component/3d/Tank'
import { Canvas, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { GLView } from 'expo-gl';
import { Asset } from 'expo-asset';
import { Platform, View, StyleSheet, ActivityIndicator } from 'react-native';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
//import { OrbitControls as MobileOrbitControls } from 'r3f-native-orbitcontrols';

const Map = () => {
      return (
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Tank/>
          
        </Canvas>
      );
};



export default Map;
