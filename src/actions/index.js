export const CHANGE_TO_NEXT = 'CHANGE_TO_NEXT',
  changeToNext = () => ({type: CHANGE_TO_NEXT});

export const CHANGE_TO_SUBMIT = 'CHANGE_TO_SUBMIT',
  changeToSubmit = () => ({type: CHANGE_TO_SUBMIT});

export const GET_ANSWER = 'GET_ANSWER',
  getAnswer = answer => ({type: GET_ANSWER, answer});

export const RESET_ANSWER = 'RESET_ANSWER',
  resetAnswer = () => ({type: RESET_ANSWER});