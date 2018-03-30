const request = (page, field, direction, deleted, username) => {
  return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();

        if (direction === 'up') {
          xhr.open('GET', '/api/admin/events?pageSize=10&page=' + page +
          '&sort[]=' + field + '&deleted=' + deleted + '&username=' + username);
        } else {
          xhr.open('GET', '/api/admin/events?pageSize=10&page=' + page +
          '&sort[]=!' + field + '&deleted=' + deleted + '&username=' + username);
        }

        xhr.onload = () => resolve(xhr.responseText, xhr.status);
        xhr.onerror = () => reject(xhr.statusText);

        xhr.send();
  });
}

const GetAllEvents = (page, field, direction, deleted, username) => dispatch=> {
      request(page, field, direction, deleted, username).then( (resolve) => {
          const data = JSON.parse(resolve);
          dispatch({type: 'FETCH_ADMIN_EVENTS_SUCCESS', payload: data.events});
          dispatch({ type: 'CHANGE_PAGE_ADMIN_EVENTS', payload: page });
          dispatch({type: 'CHANGE_COUNT_PAGE_ADMIN_EVENTS', payload: data.count});
          //console.log(data.count);

      });
}

export default GetAllEvents;
