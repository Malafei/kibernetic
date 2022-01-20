import * as Yup from 'yup';

const validationFields= () => {

    return Yup.object({
        // валідація пошти
        name: Yup.string()
            .required("Вкажіть заголовок") // перевірка чи поле не пусте
            .max(100, 'Заголовок не повинен мати більше ста символів'),

        description: Yup.string()
            .required("Вкажіть опис") // перевірка чи поле не пусте

    });
}
export default validationFields;