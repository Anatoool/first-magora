const initialState = false;


export default function userBanned(state = initialState, action){
  if (action.type === 'USER_BAN') {
    return action.payload;
  }
  return state;
}
