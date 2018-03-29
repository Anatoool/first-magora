const request = (page, field, direction, deleted) => {
  return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();

        if (direction === 'up') {
          xhr.open('GET', '/api/admin/events?pageSize=10&page=' + page + '&sort[]=' + field + '&deleted=' + deleted);
        } else {
          xhr.open('GET', '/api/admin/events?pageSize=10&page=' + page + '&sort[]=!' + field + '&deleted=' + deleted);
        }

        xhr.onload = () => resolve(xhr.responseText, xhr.status);
        xhr.onerror = () => reject(xhr.statusText);

        xhr.send();
  });
}

const GetAllEvents = (page, field, direction, deleted) => dispatch=> {
      request(page, field, direction, deleted).then( (resolve) => {
          const data = JSON.parse(resolve);
          dispatch({type: 'FETCH_ADMIN_EVENTS_SUCCESS', payload: data.events});
          dispatch({type: 'CHANGE_COUNT_PAGE_ADMIN_EVENTS', payload: data.count});
      });
}

export default GetAllEvents;
