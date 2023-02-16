import { produce } from 'immer';
import { createReducer } from 'redux-act';
import { setAppLoading } from './actions';
import { IAppState } from './types';

const initialState: IAppState = {
  isLoading: false,
};

export const appReducer = createReducer<IAppState>({}, initialState);

// set global loading state
appReducer.on(setAppLoading, (state, payload) => {
  return produce(state, draftState => {
    draftState.isLoading = payload;
  });
});
