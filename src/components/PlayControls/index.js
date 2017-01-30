import { connect } from 'react-redux';
import PlayControls from './PlayControls';

import { setPlaying } from '../../actions/player';

const mapStateToProps = ({ player }) => ({ player });

const mapDispatchTopProps = dispatch => ({
  setPlaying: value => dispatch(setPlaying(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchTopProps,
)(PlayControls);
