const initialState = {
  username: '',
  deletedVisible: true
};


export default function adminEventsFilter(state = initialState, action){

  if (action.type === 'ADMIN_CHANGE_EVENTS_FILTER_USERNAME') {
    return Object.assign({}, state, {
        username: action.payload
      });
  } else if (action.type === 'ADMIN_CHANGE_EVENTS_FILTER_DELETED') {
    return Object.assign({}, state, {
        deletedVisible: !state.deletedVisible
      });
  } else if (action.type === 'ADMIN_CHANGE_EVENTS_FILTER_DELETED_MOUNT') {
    return Object.assign({}, state, {
        deletedVisible: action.payload
      });
  }

  return state;
}
