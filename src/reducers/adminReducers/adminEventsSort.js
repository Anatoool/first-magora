const initialState = {
  field: 'name',
  dierection: 'up'
};


export default function adminEventsSort(state = initialState, action){
  if (action.type === 'ADMIN_CHANGE_SORT_EVENTS') {

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

  } else if (action.type === 'ADMIN_CHANGE_SORT_EVENTS_MOUNT') {
    return {
      field: action.payload.sortfield,
      dierection: action.payload.direction
    };
  }
  return state;
}
