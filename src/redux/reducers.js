import {combineReducers} from 'redux';

import PostsReducer from './posts/PostsReducer';

const rootReducer = combineReducers({
  posts: PostsReducer
});

export default rootReducer;
