import * as Yup from 'yup';

const validationFields= () => {

    return Yup.object({
        email: Yup.string()
            .required("Email обов'язковий")
            .max(100, 'Email не повинен мати більше ста символів'),

        login: Yup.string()
        .required("Логін обов'язковий")
        .max(30, 'Логін не повинен мати більше 30 символів'),

        password: Yup.string()
        .required("Пароль обов'язковий")
        .max(20, 'Пароль не повинен мати більше 30 символів')
        .matches(/[a-zA-Z]/, 'Пароль має містить латинські символи.'),

        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Паролі повинні співпадати')
            .required('Підтвердження паролю обовязкове')
            .matches(/[a-zA-Z]/, 'Підтвердження паролю має містить латинські символи.'),

    });
}
export default validationFields;