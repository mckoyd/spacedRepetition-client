import { CHANGE_TO_NEXT, CHANGE_TO_SUBMIT, GET_ANSWER, RESET_ANSWER } from '../actions';

const initState = {
  buttonText: 'SUBMIT',
  answer: ''
};

export default (state=initState, action) => {
  switch(action.type){
  case CHANGE_TO_NEXT:
    return {...state, 
      buttonText: 'NEXT'};
  case CHANGE_TO_SUBMIT:
    return {...state, 
      buttonText: 'SUBMIT'};
  case GET_ANSWER:
    return {...state, answer: action.answer};
  case RESET_ANSWER:
    return {...state, answer: ''};
  default:
    return state;
  }
};