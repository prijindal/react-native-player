import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { Action } from '../actions/types';
import { SET_PLAYING, PLAY_SONG } from '../actions/player';

export type State = {
    name: string,
    path: string,
    isPlaying: boolean,
};

const INITIAL_STATE = Immutable({});

const setPlaying = (state: State = INITIAL_STATE, action: Action) => ({
  ...state,
  isPlaying: action.value,
});

const playSong = (state: State = INITIAL_STATE, action: Action) => action.song;

const HANDLERS = {
  [SET_PLAYING]: setPlaying,
  [PLAY_SONG]: playSong,
};

export default createReducer(INITIAL_STATE, HANDLERS);
