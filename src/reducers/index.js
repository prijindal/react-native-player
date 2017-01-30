
import { combineReducers } from 'redux';

import drawer from './drawer';
import user from './user';
import songs from './songs';
import player from './player';

export default combineReducers({
  drawer,
  user,
  songs,
  player,
});
