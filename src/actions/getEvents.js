import reqGetEvents from '../requests/userRequests/reqGetEvents';

const GetEvents = (page, field, direction) => dispatch => {

      reqGetEvents(page, field, direction, dispatch).then((data) => {
        dispatch({type: 'FETCH_EVENTS_SUCCESS', payload: data.events});
        dispatch({type: 'CHANGE_COUNT_PAGE', payload: data.count});
      });

}

export default GetEvents;
