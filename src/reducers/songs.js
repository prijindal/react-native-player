import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { Action } from '../actions/types';
import { SET_SONGS } from '../actions/songs';

export type State = [{
    name: string,
    path: string,
}]

const INITIAL_STATE = Immutable([]);

const setSongs = (state: State = INITIAL_STATE, action: Action) => [
  ...action.files,
];

const HANDLERS = {
  [SET_SONGS]: setSongs,
};

export default createReducer(INITIAL_STATE, HANDLERS);
