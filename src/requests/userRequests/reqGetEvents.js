import httpUserRequest from '../httpUserRequest';

const reqGetEvents = (page, field, direction, dispatch) => {

  var URL = '';
  if (direction === 'up') {
    URL = '/api/user/events?pageSize=10&page=' + page + '&sort[]=' + field;
  } else {
    URL = '/api/user/events?pageSize=10&page=' + page + '&sort[]=!' + field;
  }

  var init = { method: 'GET'};

  return httpUserRequest(URL, init, dispatch);

}

export default reqGetEvents;
