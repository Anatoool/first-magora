const initialState = [];


export default function userEvents(state = initialState, action){
  if (action.type === 'FETCH_ADMIN_EVENTS_SUCCESS') {
    return action.payload;
  } else if (action.type === 'FETCH') {
    return action.payload;
  }
  return state;
}
