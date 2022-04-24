import React, { useRef, useState } from 'react'
import validatonFields from './Validation';
import { Formik, Form } from 'formik';
import MyTextInput from "../../common/MyTextInput";
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser } from './Action';

const LoginPage = () => {

    const initState = {
        email: '',
        password: '',
    };

    const [invalid, setInvalid] = useState([]);
    const dispatch = useDispatch();
    const history = useNavigate();
    const formikRef = useRef();
    const titleRef = useRef();
    const { isAuth } = useSelector(redux => redux.auth);

    const onSubmitHandler = (values) => {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => formData.append(key, value));
        dispatch(LoginUser(formData))
            .then(result => {
                history("/");
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
        //console.log(values);
    }



    return (
        <>
            {!isAuth ?

                <div className="row">
                    <h1 ref={titleRef} className="offset-md-3 col-md-6">Вхід</h1>
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
                    <div className="offset-md-3 col-md-6">
                        <Formik
                            innerRef={formikRef}
                            initialValues={initState}
                            onSubmit={onSubmitHandler}
                            validationSchema={validatonFields()}>
                            <Form>

                                <MyTextInput
                                    label="Електрона пошта"
                                    name="email"
                                    type="email"
                                    id="email"
                                />

                                <MyTextInput
                                    label="Пароль"
                                    name="password"
                                    type="password"
                                    id="password"
                                />


                                <button type="submit" className="btn btn-dark">Увійти</button>
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

export default LoginPage