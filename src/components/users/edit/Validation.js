import * as Yup from 'yup';

const validationFields= () => {

    return Yup.object({
        email: Yup.string()
            .required("Email обов'язковий")
            .max(100, 'Email не повинен мати більше ста символів'),

        login: Yup.string()
        .required("Login обов'язковий")
        .max(100, 'Login не повинен мати більше ста символів'),

    });
}
export default validationFields;