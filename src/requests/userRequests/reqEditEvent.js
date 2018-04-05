import httpUserRequest from '../httpUserRequest';

const reqEditEvent = (values, dispatch) => {

  const valuesJSON = JSON.stringify(values);

  var body = { event: valuesJSON };
  var reqHeaders = new Headers();
  reqHeaders.append("Content-Type", 'application/json');

  const URL = '/api/user/events/' + values.id;
  const init = {
    method: 'PUT',
    headers: reqHeaders,
    body: JSON.stringify(body)
  };


  return httpUserRequest(URL, init, dispatch);

}

export default reqEditEvent;
