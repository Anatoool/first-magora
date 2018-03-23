function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : null;
}

const request = (page) => {
  return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();
        const token = getCookie('token');

        var body = {
          token: token,
          page: page
        };

        body = JSON.stringify(body);

        xhr.open('POST', '/user/events/get');

        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(body);
  });
}

const GetEvents = (page) => dispatch=> {
      request(page).then(resolve => {
          const data = JSON.parse(resolve);
          dispatch({type: 'FETCH_EVENTS_SUCCESS', payload: data.events});
          dispatch({type: 'CHANGE_COUNT_PAGE', payload: data.count});
      });
}

export default GetEvents;
