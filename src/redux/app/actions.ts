import { createAction } from 'redux-act';

const setAppLoading = createAction<boolean>('app/set loading');

export { setAppLoading };
