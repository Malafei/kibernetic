import * as Yup from 'yup';

const validationFields= () => {

    return Yup.object({
        name: Yup.string()
            .required("Вкажіть заголовок") // перевірка чи поле не пусте
            .max(80, 'Заголовок не повинен мати більше 80 символів'),

        description: Yup.string()
            .required("Вкажіть опис") // перевірка чи поле не пусте

    });
}
export default validationFields;