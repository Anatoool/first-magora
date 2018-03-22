const initialState = {
  login: '',
  name: 'Имя не задано',
  email: 'example@gmial.com'
};


export default function userProfile(state = initialState, action){
  if (action.type === 'LOAD_DATA') {
    return action.payload;
  } else if (action.type === 'EDIT_PROFILE') {
    return action.payload;
  }
  return state;
}
