const request = (page, deleted, login) => {
  return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();

        xhr.open('GET', '/api/admin/users?pageSize=10&page=' + page + '&deleted=' + deleted + '&login=' + login);

        xhr.onload = () => resolve(xhr.responseText, xhr.status);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
  });
}

const GetUsers = (page, deleted, login) => dispatch => {
      request(page, deleted, login).then( (resolve) => {
          const data = JSON.parse(resolve);
          dispatch({type: 'FETCH_USERS_SUCCESS', payload: data});
      });
}

export default GetUsers;
