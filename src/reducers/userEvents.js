const initialState = [
  {
    _id: '0',
    name: 'Default name',
    description: 'Def description',
    importance: 'Обычное',
    place: 'Россия',
    date_start: "2018-03-22T17:00:00.000Z",
    date_end: "2018-03-22T17:00:00.000Z"
  }
];


export default function userEvents(state = initialState, action){
  if (action.type === 'FETCH_EVENTS_SUCCESS') {
    return action.payload;
  } else if (action.type === 'FETCH') {
    return action.payload;
  }
  return state;
}
