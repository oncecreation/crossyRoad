import { Audio, Font } from 'expo';
import React from 'react';
import { Image } from 'react-native';
import * as THREE from 'three';

import ModelLoader from './ModelLoader';
import AppNavigator from './navigation/AppNavigator';
import GameScreen from './screens/GameScreen';

// import GameScreen from './screens/DebugScene';
global.THREE = THREE;

// require('three/examples/js/controls/OrbitControls');

console.ignoredYellowBox = [
  'WebGL',
  'THREE.WebGLRenderer',
  'THREE.WebGLProgram',
];

const DEBUG_DONT_LOAD_ASSETS = false;

export default class App extends React.Component {
  persister;
  state = {
    appIsReady: false,
  };

  async componentWillMount() {
    if (DEBUG_DONT_LOAD_ASSETS) {
      return;
    }
    Audio.setIsEnabledAsync(true);

    try {
      await Promise.all([
        Font.loadAsync({ retro: require('./assets/fonts/retro.ttf') }),
        ModelLoader.loadModels(),
      ]);
    } catch (e) {
      console.warn(e);
    } finally {
      this.setState({ appIsReady: true });
    }
  }

  render() {
    if (DEBUG_DONT_LOAD_ASSETS) {
      return <GameScreen />;
    }

    if (this.state.appIsReady) {
      return <AppNavigator />;
    }
    return (
      <Image
        style={{ backgroundColor: '#69CEED', flex: 1, resizeMode: 'cover' }}
        source={require('./assets/icons/loading.png')}
      />
    );
  }
}
