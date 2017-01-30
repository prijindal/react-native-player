import React, { Component, PropTypes } from 'react';
import { View, Text, Image } from 'react-native';

import theme from '../../themes/base-theme';
import Layout from '../../components/Layout';

const styles = {
  avatar: {
    height: 240,
    width: 360,
  },
  toolbar: {
    backgroundColor: theme.transparent,
  },
};

class User extends Component {
  static propTypes = {
    navigator: PropTypes.shape({}).isRequired,
    song: PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
      size: PropTypes.number,
    }).isRequired,
    playSong: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.playSong(this.props.song);
  }

  render() {
    const { name, path, size } = this.props.song;
    return (
      <View>
        {/* <Image source={{ uri: avatar }} style={styles.avatar}> */}
          <Layout
            enableBackButton
            title={name}
            titleColor={theme.darkText}
            toolbarStyle={styles.toolbar}
            actions={[]}
            onActionSelected={this.onActionSelected}
            navigator={this.props.navigator}
          />
        {/* </Image> */}
        <Text style={styles.body}>{path}</Text>
      </View>
    );
  }
}

export default User;
