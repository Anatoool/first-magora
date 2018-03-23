const initialState = {
  field: 'name',
  dierection: 'down'
};


export default function userEventsSort(state = initialState, action){
  if (action.type === 'CHANGE_SORT') {
    return action.payload;
  } else if (action.type === '4to-to-eshe') {
    return action.payload;
  }
  return state;
}
