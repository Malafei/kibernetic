import React, {useState} from 'react'
import validatonFields from './Validation';
import {Formik, Form} from 'formik';
import MyTextInput from "../../common/MyTextInput";
import {useNavigate} from 'react-router';
import { useDispatch } from 'react-redux';
import { LoginUser } from './Action';

const LoginPage=()=>{

    const initState = {
        email: '',
        password: '',
    };

    const [invalid, setInvalid] = useState([]);
    const dispatch = useDispatch();
    const history = useNavigate();

    const onSubmitHandler=(values) =>
    {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => formData.append(key, value));
        dispatch(LoginUser(formData))
            .then(result => {
                history("/");
            })
            .catch(ex => {
                setInvalid(ex.errors.invalid);
            })
        //console.log(values);
    }
    


    return (
        <div className="row">
            <h1 className="offset-md-3 col-md-6">Вхід</h1>
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
                initialValues = {initState} 
                onSubmit={onSubmitHandler}
                validationSchema= {validatonFields()}>
                <Form>

                    <MyTextInput
                        label = "Електрона пошта"
                        name = "email"
                        type = "email"
                        id= "email"
                    />

                    <MyTextInput
                        label = "Пароль"
                        name = "password"
                        type = "password"
                        id= "password"
                    />


                    <button type="submit" className="btn btn-dark">Увійти</button>
                </Form>
            </Formik>
            </div>
        </div>

    )
}

export default LoginPage