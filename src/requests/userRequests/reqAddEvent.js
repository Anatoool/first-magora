import httpUserRequest from '../httpUserRequest';

const reqAddEvent = (values, token, dispatch) => {

  const valuesJSON = JSON.stringify(values);

  var body = { event: valuesJSON, token: token };
  var reqHeaders = new Headers();
  reqHeaders.append("Content-Type", 'application/json');

  const URL = '/user/event/add';
  const init = {
    method: 'POST',
    headers: reqHeaders,
    body: JSON.stringify(body)
  };


  return httpUserRequest(URL, init, dispatch);

}

export default reqAddEvent;
