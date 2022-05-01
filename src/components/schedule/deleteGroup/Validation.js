import * as Yup from 'yup';

const validationFields= () => {

    return Yup.object({
        nameGroup: Yup.string()
        .required("Вкажіть групу"),
    });
}
export default validationFields;