import getCookie from '../cookie/getCookie';

const request =  new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest();
      const token = getCookie('token');

      var body = {
        token: token
      };

      body = JSON.stringify(body);

      xhr.open('POST', '/role/get');

      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(body);
});



  const checkRole = () => {

    var role = '';

    role =  request();
    console.log(role, 1);
    return role;
}

  export default checkRole;
