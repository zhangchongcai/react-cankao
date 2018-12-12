import { combineReducers } from 'redux';

import tabReducer from './tabReducers';
import scroll from './scroll';
import userStatus from './userStatus';

let rootReducer = combineReducers({
    tabReducer,
    scroll,
    userStatus,
});

export default rootReducer;