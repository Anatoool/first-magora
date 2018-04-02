const initialState = {
  users: [],
  count: 0
};


export default function users(state = initialState, action){
  if (action.type === 'FETCH_USERS_SUCCESS') {
    return Object.assign({}, state, {
        users: action.payload.users,
        count: action.payload.count
    });
  }
  return state;
}
