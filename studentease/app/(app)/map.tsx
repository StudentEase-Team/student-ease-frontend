import React from 'react';
import { Platform, StyleSheet} from 'react-native';
import { WebView } from 'react-native-webview';

const Map = () => {
  return Platform.OS === "web" ? (
    <iframe src="http://192.168.0.23:3000/nastavniblok/1" height={'100%'} width={'100%'} />
  ):(
      <WebView
        source={{ uri: 'http://192.168.0.23:3000/nastavniblok/1' }}
        style={styles.container}
      />
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
    width:'100%',
  },
});

export default Map;
