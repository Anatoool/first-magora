export const validate = values => {
    const errors = {};
    if(!values.name){
        errors.name = 'Поле обязательно для заполнения!';
    } else if (values.name.length < 3) {
        errors.name = 'Название должно содержать не менее 3 символов!'
    } else if (values.name.length > 50) {
        errors.name = 'Название не должно содержать более 50 символов!'
    }

    if (!values.description) {
      errors.description = 'Поле обязательно для заполнения!';
    } else if (values.description.length < 5) {
        errors.description = 'Описание должно содержать не менее 5 символов!'
    }
    // для синхронной валидации нужно вернуть объект с ошибками
    return errors;
};
