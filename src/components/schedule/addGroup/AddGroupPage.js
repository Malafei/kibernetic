import { Formik, Form } from 'formik';
import { useEffect, useRef, useState } from "react";
import MyTextInput from '../../common/MyTextInput';
import validationFields from './Validation';
import { GroupAdd } from './Action';
import { useDispatch, useSelector } from 'react-redux';


const AddGroup = () => {


    const initState = {
        nameGroup: '',
    };
    const formikRef = useRef();

    const titleRef = useRef();
    const dispatch = useDispatch();

    const [invalid, setInvalid] = useState([]);


    const onSubmitHandler = (values) => {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => formData.append(key, value));
        dispatch(GroupAdd(formData))
            .then(result => {
                console.log(result);

                //history("/news");
            })
            .catch(ex => {
                console.log(ex.errors.invalid)
                const { errors } = ex;
                Object.entries(errors).forEach(([key, values]) => {
                    let message = '';
                    values.forEach(text => message += text + " ");
                    formikRef.current.setFieldError(key, message);
                });
                setInvalid(ex.errors.invalid);
            })
    }

    return (
        <>
            <div className="album py-5">
                <div className='Body-shedual-admin'>
                    <h1 ref={titleRef} className="offset-md-3 col-md-8" >Додати нову групу</h1>
                    {
                        invalid && invalid.length > 0 &&
                        <div className="alert alert-danger">
                            <ul>
                                {
                                    invalid.map((text, index) => {
                                        return (
                                            <li key={index}>{text}</li>

                                        );
                                    })
                                }
                            </ul>
                        </div>

                    }
                    <Formik
                        innerRef={formikRef}
                        initialValues={initState}
                        onSubmit={onSubmitHandler}
                        validationSchema={validationFields()}>
                        <Form>

                            <div className="row row-cols-1 row-cols-sm-2 g-2">
                                <MyTextInput
                                    label="Назва групи"
                                    name="nameGroup"
                                    type="nameGroup"
                                    id="nameGroup"
                                />

                                <div className='divTo_but'>
                                    <button type="submit" className="btn btn-dark col-md-4 but showBtn">Зберегти</button>
                                </div>

                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}


export default AddGroup