const initialState = {
  name: '',
  description: '',
  importance: 'Обычное',
  dateEnd: new Date(),
  dateStart: new Date(),
  address: 'Россия',
  id: '1'
};


export default function editableEvent(state = initialState, action){
  if (action.type === 'SET_EDITABLE_EVENT') {
    return action.payload;
  }

  return state;
}
