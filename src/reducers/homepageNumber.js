const initialState = {
  numberPage: 1,
  currentNumber: 1
};


export default function homepageNumber(state = initialState, action){
  if (action.type === 'CHANGE_COUNT_PAGE') {
    /*const newState = Object.assign(user, visitor, admin);;
    newState.numberPage = Math.floor(action.payload / 10) + 1;*/
    return Object.assign({}, state, {
        numberPage: Math.floor(action.payload / 10) + 1
      });
  } else if (action.type === 'CHANGE_PAGE') {
    //const newState = state;
    //newState.currentNumber = action.payload;
    return Object.assign({}, state, {
        currentNumber: action.payload
      });
  }
  return state;
}
