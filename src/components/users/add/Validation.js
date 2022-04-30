import * as Yup from 'yup';

const validationFields= () => {

    return Yup.object({
        email: Yup.string()
            .required("Email обов'язковий")
            .max(100, 'Email не повинен мати більше ста символів'),

        login: Yup.string()
        .required("Login обов'язковий")
        .max(30, 'Login не повинен мати більше 30 символів'),

        password: Yup.string()
        .required("Password обов'язковий")
        .max(20, 'Password не повинен мати більше 30 символів'),

    });
}
export default validationFields;