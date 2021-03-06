const initialState = {
  field: 'name',
  dierection: 'up'
};


export default function userEventsSort(state = initialState, action){
  if (action.type === 'CHANGE_SORT') {

    if (state.field === action.payload) {
        if (state.dierection === 'up') {
          return Object.assign({}, state, {
              dierection: 'down'
            });
        } else {
          return Object.assign({}, state, {
              dierection: 'up'
            });
        }
    } else {
        if (state.field === 'name') {
          return Object.assign({}, state, {
              field: 'date_start'
            });
        } else {
          return Object.assign({}, state, {
              field: 'name'
            });
        }
    }

  } else if (action.type === '4to-to-eshe') {
    return action.payload;
  }
  return state;
}
