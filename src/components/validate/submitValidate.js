import { SubmissionError } from 'redux-form';

//const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const request = (login, password) => {

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    var body = {
      password: password,
      login: login
    };

    body = JSON.stringify(body);

    xhr.open('POST', '/login');

    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(body);
  });

}

function submit(values) {

return request(values.login, values.password).then( (value) => {

  value = JSON.parse(value);

  if (value.success !== true) {
    throw new SubmissionError({ login: '', _error: 'Неверный логин или пароль!' });
  } else if (value.success !== true) {
    throw new SubmissionError({ password: '', _error: 'Неверный логин или пароль!' });
  } else {
    /*if (isAdmin === true) {
      window.alert(`Welcome Admin:\n\n${JSON.stringify(values, null, 2)}`);
    } else {
      window.alert(`Welcome User:\n\n${JSON.stringify(values, null, 2)}`);
    }*/
    var date = new Date(new Date().getTime() + 60 * 1000 * 600);//+10р
    //var date = new Date(new Date().getTime() - 60 * 1000 * 600);
    document.cookie = "token=" +  value.token + "; path=/; expires=" + date.toUTCString();
    console.log(value.role);
    this.setState({token: value.token});
  }
});



}

export default submit;
