import deleteCookie from '../cookie/deleteCookie';

export default function httpUserRequest (url, init, dispatch) {

  init.credentials = 'include';
  
  return fetch(url, init).then(function(response) {
    return response.json();
  }).then(function(response) {
    if (response.message === 'banned') {
      deleteCookie('token');
      dispatch({type: 'USER_BAN', payload: true});
      throw new Error("banned");
    } else {
      return response;
    }
  }).catch(err => {
    alert(err);
  });
}
