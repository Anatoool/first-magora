//import deleteCookie from '../components/cookie/deleteCookie';
import httpUserRequest from '../components/requests/httpUserRequest';

const GetEvents = (page, field, direction) => dispatch => {

      var URL = '';
      if (direction === 'up') {
        URL = '/api/user/events?pageSize=10&page=' + page + '&sort[]=' + field;
      } else {
        URL = '/api/user/events?pageSize=10&page=' + page + '&sort[]=!' + field;
      }

      var myInit = { method: 'GET'};

      httpUserRequest(URL, myInit, dispatch).then((data) => {
        dispatch({type: 'FETCH_EVENTS_SUCCESS', payload: data.events});
        dispatch({type: 'CHANGE_COUNT_PAGE', payload: data.count});
      });

}

export default GetEvents;

/*const request = (page, field, direction) => {
  return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();

        if (direction === 'up') {
          xhr.open('GET', '/api/user/events?pageSize=10&page=' + page + '&sort[]=' + field);
        } else {
          xhr.open('GET', '/api/user/events?pageSize=10&page=' + page + '&sort[]=!' + field);
        }

        xhr.onload = () => resolve(xhr.responseText, xhr.status);
        xhr.onerror = () => reject(xhr.statusText);

        xhr.send();
  });
}*/

/*request(page, field, direction).then( (resolve) => {
    const data = JSON.parse(resolve);

    if (data.message === 'banned') {
      console.log(data);
      deleteCookie('token');
      dispatch({type: 'USER_BAN', payload: true});
    } else {
      dispatch({type: 'FETCH_EVENTS_SUCCESS', payload: data.events});
      dispatch({type: 'CHANGE_COUNT_PAGE', payload: data.count});
    }

});*/
