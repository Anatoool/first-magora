const initialState = {};


export default function editableEvent(state = initialState, action){
  if (action.type === 'SET_EDITABLE_EVENT') {
    return action.payload;
  }

  return state;
}
