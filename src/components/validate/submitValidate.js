import { SubmissionError } from 'redux-form';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function submit(values) {

  var loginTrues = false;
  var passwordTrues = false;
  var isAdmin = false;

  let usersJSON = localStorage.getItem('Users');//Получаем массив
  let usersArray = JSON.parse(usersJSON);// Парсим

  let usersCount = usersArray.length;
  for (var i = 0; i < usersCount; i++) {

    if (values.login == usersArray[i].login) {
      loginTrues = true;

      if (usersArray[i].password == values.password) {
        passwordTrues = true;
        if (usersArray[i].role == 'admin') {
          isAdmin = true;
        }
      }

      break;
    }
  }


  return sleep(500) // simulate server latency
    .then(() => {
      if (!loginTrues) {
        throw new SubmissionError({ login: '', _error: 'Неверный логин или пароль!' });
      } else if (!passwordTrues) {
        throw new SubmissionError({ password: '', _error: 'Неверный логин или пароль!' });
      } else {

        if (isAdmin === true) {
          window.alert(`Welcome Admin:\n\n${JSON.stringify(values, null, 2)}`);
        } else {
          window.alert(`Welcome User:\n\n${JSON.stringify(values, null, 2)}`);
        }

      }
    });
}

export default submit
