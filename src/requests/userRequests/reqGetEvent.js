import httpUserRequest from '../httpUserRequest';

const reqGetEvent = (id, dispatch) => {

  const URL = '/api/user/events/' + id;
  var init = { method: 'GET'};

  return httpUserRequest(URL, init, dispatch);

}

export default reqGetEvent;
