import {
  FETCH_PROTECTED_DATA_SUCCESS,
  FETCH_PROTECTED_DATA_ERROR,
  POST_ANSWER_SUCCESS,
  POST_ANSWER_ERROR
} from '../actions/protected-data';

const initialState = {
  data: '',
  error: null,
  postedAnswer: ''
};

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_PROTECTED_DATA_SUCCESS) {
    return Object.assign({}, state, {
      data: action.data,
      error: null
    });
  } else if (action.type === FETCH_PROTECTED_DATA_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    });
  } else if (action.type === POST_ANSWER_SUCCESS) {
    return Object.assign({}, state, {
      postedAnswer: action.answer
    });
  } else if (action.type === POST_ANSWER_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    });
  }
  return state;
}
