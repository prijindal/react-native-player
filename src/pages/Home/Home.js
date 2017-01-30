import React, { Component, PropTypes } from 'react';
import { View, ListView } from 'react-native';
import getFiles from '../../helpers/getFiles';

import Layout from '../../components/Layout';
import ListItem from '../../components/ListItem';
import theme from '../../themes/base-theme';


const styles = {
  view: {
    backgroundColor: theme.backgroundText,
  },
  subheader: {
    paddingLeft: 16,
    height: 48,
    justifyContent: 'center',
  },
  subheaderText: {
    fontSize: 14,
    color: theme.secondaryDarkText,
    fontWeight: '900',
    fontFamily: 'sans-serif-light',
  },
};

class Home extends Component {
  static propTypes = {
    navigator: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    setSongs: PropTypes.func.isRequired,
    songs: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
    })).isRequired,
  }

  state = {
    loading: false,
    dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
                            .cloneWithRows(this.props.songs),
  }

  componentWillMount() {
    this._mounted = true;
  }

  componentDidMount() {
    getFiles()
    .then((files) => {
      if (!this._mounted) return;
      this.props.setSongs(files);
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState(prevState => ({
      dataSource: prevState.dataSource.cloneWithRows(nextProps.songs),
    }));
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return (
      <View style={styles.view}>
        <Layout
          title="Home"
          onActionSelected={this.onActionSelected}
          navigator={this.props.navigator}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={file =>
            <ListItem
              key={file.path}
              item={{ title: file.name }}
              length={this.props.songs.length}
            />
          }
        />
      </View>
    );
  }
}

export default Home;
