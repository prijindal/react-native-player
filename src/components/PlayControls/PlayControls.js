import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = {
  container: {
    flexDirection: 'row',
  },
  play: {
    width: 48,
    height: 48,
  },
};

class PlayControls extends Component {
  static propTypes = {
    player: PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
      isPlaying: PropTypes.bool,
    }).isRequired,
    setPlaying: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    this.playSong(nextProps);
  }

  playSong(props) {
    if (this.path === props.player.path) return;
    this.sound = new Sound(props.player.path, Sound.MAIN_BUNDLE, () => {
      this.path = props.player.path;
      this.sound.play();
      this.props.setPlaying(true);
    });
  }

  render() {
    let name = 'play-arrow';
    return (
      <View style={styles.container}>
        <Icon name={name} style={styles.play} size={48} />
        <Text>Controls</Text>
      </View>
    );
  }
}

export default PlayControls;
