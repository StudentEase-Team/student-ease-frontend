import React from 'react';
import { Platform, View, StyleSheet, requireNativeComponent } from 'react-native';
import { WebView } from 'react-native-webview';
import { Canvas } from '@react-three/fiber';
import { NastavniBlokJedan } from '../../component/3d/NastavniBlokJedan';
import useControls from 'r3f-native-orbitcontrols';

const Map = () => {
  return Platform.OS === "web" ? (
    <iframe src="http://192.168.0.23:3000/" height={'100%'} width={'100%'} />
  ):(
      <WebView
        source={{ uri: 'http://192.168.0.23:3000/' }} // Replace with your actual URL
        style={styles.container}
      />
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
    width:'100%',
    backgroundColor:'red'
  },
});

export default Map;
