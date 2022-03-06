import {GET_DATA, SET_DATA} from "./PostActions";

const initialState = {
  posts: [],
  page: 0,
  totalPage: 0,
  totalRecords: 0,
  isSearching: false,
  query: '',
  dateRange: '',
};

const PostsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_DATA:
      return state;
    case SET_DATA:
      return {
        ...state,
        ...payload,
        posts: payload.isSearching ? payload.posts : state.posts.concat(payload.posts)
      };
    default:
      return state;
  }
};

export default PostsReducer;
