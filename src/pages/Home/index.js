import { connect } from 'react-redux';
import Home from './Home';
import { setSongs } from '../../actions/songs';

const mapStateToProps = ({ user, songs }) => ({ user, songs });

const mapdispatchToProps = dispatch => ({
  setSongs: files => dispatch(setSongs(files)),
});

export default connect(
  mapStateToProps,
  mapdispatchToProps,
)(Home);
