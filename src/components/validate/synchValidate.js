export const validate = values => {
    const errors = {};
    if(!values.login){
        errors.login = 'Поле обязательно для заполнения!';
    } else if (values.login.length < 4) {
        errors.login = 'Логин должен быть не менее 4 символов!'
    }

    if (!values.email) {
      errors.email = 'Поле обязательно для заполнения!';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Неверный формат Email';
    }

    if (!values.password) {
      errors.password = 'Поле обязательно для заполнения!';
    } else if (values.password.length < 5) {
        errors.password = 'Пароль должен быть не менее 5 символов!'
    } else if (!/^(?=.*\d)((?=.*[a-z])|(?=.*[а-я]))((?=.*[A-Z])|(?=.*[А-Я]))(?!.*\s).*$/.test(values.password)) {
      errors.password = 'Пароль должен содержать хотя бы одну цифру, одну заглавную и одну строчную букву';
    }
    // для синхронной валидации нужно вернуть объект с ошибками
    return errors
};
