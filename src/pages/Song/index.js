import { connect } from 'react-redux';
import Song from './Song';

import { playSong } from '../../actions/player';

const mapStateToProps = ({ player }) => ({ player });

const mapDispatchTopProps = dispatch => ({
  playSong: value => dispatch(playSong(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchTopProps,
)(Song);
