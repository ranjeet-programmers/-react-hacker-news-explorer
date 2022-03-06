import {GET} from "../../services/rest.service";

export const GET_DATA = 'GET_DATA';
export const SET_DATA = 'SET_DATA';

export const getPostsData = (page, query, dateRange, isSearching = false) => {
  return dispatch => {
    const filters = {};

    if (page) filters.page = page;
    if (query) filters.query = query;
    if (dateRange && dateRange !== '') filters.numericFilters = `created_at_i>${dateRange}`;

    GET(`/search_by_date`, filters)
        .then(res => {

          dispatch({
            type: SET_DATA,
            payload: {
              query,
              page,
              posts: res.hits,
              totalPage: res.nbPages,
              totalRecords: res.nbHits,
              isSearching,
            }
          })
        })
        .catch(err => {
          console.error(err);
        })
  }
};
