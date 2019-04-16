import React, { Component } from 'react';
import {
  Text,
  View,
  Easing,
  InteractionManager,
  Dimensions,
  Animated,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Constants } from 'expo';
// import { connect } from 'react-redux';
import Footer from '../components/Home/Footer';
import Hand from '../components/HandCTA';
import State from '../state';

// import { setGameState } from '../actions/game';
class Screen extends Component {
  animation = new Animated.Value(0);
  componentDidMount() {
    InteractionManager.runAfterInteractions(_ => {
      Animated.timing(this.animation, {
        toValue: 1,
        duration: 1000,
        delay: 500,
        easing: Easing.in(Easing.qubic),
      }).start();
    });
  }
  render() {
    const animatedTitleStyle = {
      transform: [
        {
          translateX: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [-Dimensions.get('window').width, 0],
          }),
        },
      ],
    };
    // console.log(this.props);
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            StyleSheet.absoluteFill,
            { justifyContent: 'center', alignItems: 'center' },
          ]}
          onPress={_ => {
            // this.props.setGameState(State.Game.playing);
          }}
        >
          <Text style={styles.coins}>{this.props.coins}</Text>
          {/* <AniamtedRetroText style={[styles.title, animatedTitleStyle]}>CROSSY ROAD</AniamtedRetroText> */}

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: 8,
              left: 8,
              right: 8,
            }}
          >
            <Hand style={{ width: 36 }} />
            <Footer
              style={{ height: 48 }}
              onCharacterSelect={_ => {
                this.props.navigation.navigate('CharacterSelect', {});
              }}
              onShop={_ => {}}
              onMultiplayer={_ => {}}
              onCamera={_ => {}}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
// export default connect(
//   state => ({
//     coins: state.game.coins,
//   }),
//   { setGameState }
// )(Screen);

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'transparent',
  },
  title: {
    color: 'white',
    fontSize: 48,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  coins: {
    fontFamily: 'retro',
    position: 'absolute',
    top: Constants.statusBarHeight,
    right: 8,
    color: '#f8e84d',
    fontSize: 36,
    letterSpacing: 0.9,
    backgroundColor: 'transparent',
    textAlign: 'right',
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
