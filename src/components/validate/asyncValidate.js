const request = (login) => {

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', '/api/users/count?login=' + login);

    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
  });
}


const asyncValidate = (values) => {

  return request(values.login)
    .then((resolve) => {
      const data = JSON.parse(resolve);
      if (data.busy === true) {
        throw { login: 'Логин занят!' }
      }
    }, ()=> {
      alert('Нет связи с сервером!');
    });
}

export default asyncValidate;
