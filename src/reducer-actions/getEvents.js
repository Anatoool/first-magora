import deleteCookie from '../components/cookie/deleteCookie'

const request = (page, field, direction) => {
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
}

const GetEvents = (page, field, direction) => dispatch=> {
      request(page, field, direction).then( (resolve) => {
          const data = JSON.parse(resolve);

          if (data.message === 'banned') {
            console.log(data);
            deleteCookie('token');
            dispatch({type: 'USER_BAN', payload: true});
          } else {
            dispatch({type: 'FETCH_EVENTS_SUCCESS', payload: data.events});
            dispatch({type: 'CHANGE_COUNT_PAGE', payload: data.count});
          }

      });
}

export default GetEvents;
