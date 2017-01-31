import React, { Component, PropTypes } from 'react';
import { View, ListView } from 'react-native';
import Permissions from 'react-native-permissions';
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
    Permissions.getPermissionStatus('photo')
    .then((response) => {
      if (response !== 'authorized') {
        Permissions.requestPermission('photo')
        .then(this.getFiles);
      } else {
        this.getFiles();
      }
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

  onActionSelected = (position) => {
    if (position === 0) {
      this.getFiles();
    }
  }

  getFiles = () => {
    getFiles()
    .then((files) => {
      if (!this._mounted) return;
      this.props.setSongs(files);
    });
  }

  openSong = (file) => {
    this.props.navigator.push('song', { song: file });
  }

  render() {
    return (
      <View style={styles.view}>
        <Layout
          title="Home"
          actions={[{
            title: 'refresh',
            iconName: 'refresh',
          }]}
          onActionSelected={this.onActionSelected}
          navigator={this.props.navigator}
        />
        {/* <ScrollView>
          {this.props.songs.map(file =>
            <ListItem
              key={file.path}
              item={{ title: file.name }}
              length={this.props.songs.length}
            />,
          )}
        </ScrollView> */}
        {this.props.songs.length > 0 &&
          <ListView
            dataSource={this.state.dataSource}
            initialListSize={30}
            pageSize={1}
            renderRow={file =>
              <ListItem
                key={file.path}
                item={{ title: file.title }}
                length={this.props.songs.length}
                onPress={() => this.openSong(file)}
              />
            }
          />
        }
      </View>
    );
  }
}

export default Home;
