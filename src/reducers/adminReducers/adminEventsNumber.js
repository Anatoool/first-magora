const initialState = {
  numberPage: 1,
  currentNumber: 1
};


export default function adminEventsNumber(state = initialState, action){
  if (action.type === 'CHANGE_COUNT_PAGE_ADMIN_EVENTS') {
    var count = 0;
    if (action.payload === 0) {
      count = 1;
    } else if (action.payload % 10 === 0) {
      count = Math.floor(action.payload / 10);
    } else {
      count = Math.floor(action.payload / 10) + 1;
    }
    /*if (state.currentNumber > count) {
      return Object.assign({}, state, {
          numberPage: count,
          currentNumber: 1
        });
    }*/
    return Object.assign({}, state, {
        numberPage: count
      });
  } else if (action.type === 'CHANGE_PAGE_ADMIN_EVENTS') {
    //const newState = state;
    //newState.currentNumber = action.payload;
    return Object.assign({}, state, {
        currentNumber: action.payload
      });
  }
  return state;
}
