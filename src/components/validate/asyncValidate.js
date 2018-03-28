const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

/*const request = (login) => {

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', '/login');

    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(body);
  });
}*/

function loginVerify(login) {

  var busy = false;
  if ( login === "admin" ) {
    busy = true;
  }

  return busy;
}

const asyncValidate = (values/*, dispatch */) => {

  var loginBusy = false;
  loginBusy = loginVerify(values.login);
  /*let usersJSON = localStorage.getItem('Users');//Получаем массив
  let usersArray = JSON.parse(usersJSON);// Парсим




  let usersCount = usersArray.length;
  for (var i = 0; i < usersCount; i++) {
    if (usersArray[i].login == values.login) {
      loginBusy = true;
    }
  }*/


  return sleep(2000) // simulate server latency
    .then(() => {
      if (loginBusy) {
        throw { login: 'Логин занят!' }
      }
    });
}

export default asyncValidate;
