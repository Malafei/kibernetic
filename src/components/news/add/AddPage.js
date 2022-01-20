import React, {useRef, useState} from 'react'
import validatonFields from './Validation';
import {Formik, Form} from 'formik';
import { useNavigate } from 'react-router';
import MyTextInput from '../../common/MyTextInput';
import MyTextArea from '../../common/MyTextArea';
import MyPhotoInput from '../../common/MyPhotoInput';
import { useDispatch, useSelector } from 'react-redux';
import { NewsAdd } from './Actions';


const AddNewsPage = () => {

    const { isAuth } = useSelector(redux => redux.auth);
    const history = useNavigate();

    const initState = {
        name: '',
        description: '',
        image: null
    };

    //силка на наш формік
    
    const [invalid, setInvalid] = useState([]);
    const formikRef = useRef();
    const titleRef = useRef();
    const dispatch = useDispatch();

    //функція яка викликається під час події он сабміт (умовно відправляє дані на сервер)


    const onSubmitHandler = (values) => {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => formData.append(key, value));
        dispatch(NewsAdd(formData))
        .then(result => {
            history("/news");
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
            {isAuth ?
                <div className="row">
                    <h1 ref={titleRef} className="offset-md-3 col-md-8" >Додати новину</h1>
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
                    <div className="offset-md-3 col-md-8">
                        <Formik
                            innerRef={formikRef}
                            initialValues={initState}
                            onSubmit={onSubmitHandler}
                            validationSchema={validatonFields()}>
                            <Form>

                                <MyTextInput
                                    label="Заголовок новини"
                                    name="name"
                                    type="text"
                                    id="name"
                                    placeH="Введіть заголовок"
                                />

                                <MyTextArea
                                    label="Опис новини"
                                    name="description"
                                    type="text"
                                    id="description"
                                    placeH="Введіть детальний опис новини"
                                />

                                <MyPhotoInput
                                    Myfield = "image"
                                    name = "image"
                                    id= "image"
                                    formikRef={formikRef}
                                />



                                {/* кнопка відправки форми */}
                                <button type="submit" className="btn btn-dark">Зберегти</button>
                            </Form>
                        </Formik>
                    </div>

                </div>
                :
                history("/")
            }
        </>
    )
}
export default AddNewsPage;