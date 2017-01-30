
import { combineReducers } from 'redux';

import drawer from './drawer';
import user from './user';
import songs from './songs';

export default combineReducers({
  drawer,
  user,
  songs,
});
