import type { Action } from './types';

export const SET_SONGS = 'SET_SONGS';

export function setSongs(files):Action {
  return {
    type: SET_SONGS,
    files,
  };
}
