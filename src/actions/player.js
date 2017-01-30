import type { Action } from './types';

export const SET_PLAYING = 'SET_PLAYING';
export const PLAY_SONG = 'PLAY_SONG';

export function setPlaying(value):Action {
  return {
    type: SET_PLAYING,
    value,
  };
}

export function playSong(song): Action {
  return {
    type: PLAY_SONG,
    song,
  };
}
