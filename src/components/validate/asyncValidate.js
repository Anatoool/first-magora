const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncValidate = (values/*, dispatch */) => {

  let usersJSON = localStorage.getItem('Users');//Получаем массив
  let usersArray = JSON.parse(usersJSON);// Парсим

  var loginBusy = false;

  let usersCount = usersArray.length;
  for (var i = 0; i < usersCount; i++) {
    if (usersArray[i].login == values.login) {
      loginBusy = true;
    }
  }


  return sleep(2000) // simulate server latency
    .then(() => {
      if (loginBusy) {
        throw { login: 'Логин занят!' }
      }
    });
}

export default asyncValidate;
