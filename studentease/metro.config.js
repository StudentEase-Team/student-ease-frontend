// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.sourceExts = [...config.resolver.sourceExts, 'js', 'json', 'ts', 'tsx', 'cjs'];
config.resolver.assetExts = [...config.resolver.assetExts, 'glb', 'png', 'jpg', 'gltf'];

module.exports = config;
