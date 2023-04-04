import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import MyTextInput from '../../common/MyTextInput';
import { useNavigate, useParams } from "react-router-dom";
import EclipseWidget from '../../common/EclipseWidget';
import validationFields from './Validation';
import { UserAdd } from './Action';
import { message, Modal } from 'antd';


const AddUserPage = () => {

    const initState = {
        email: '',
        login: '',
        password: '',
        confirmPassword: ""
    };

    const { isAuth } = useSelector(redux => redux.auth);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const history = useNavigate();
    const formikRef = useRef();
    const [invalid, setInvalid] = useState([]);
    const titleRef = useRef();
    const { confirm } = Modal;


    const onSubmitHandler = (values) => {

        confirm({
            title: 'Додавання користувача?',
            content: 'Ви впевнені що хочете додати нового користувача?',
            onOk() {
                const formData = new FormData();
                Object.entries(values).forEach(([key, value]) => formData.append(key, value));
                dispatch(UserAdd(formData))
                .then(result => {
                    message.success("Користувач добавлений успішно");
                    setLoading(false);
                    history("/users");
                })
                .catch(res => {
                    setLoading(false);
                    message.error("403. Така пошта вже існує");
                })

            },
            onCancel() { },
        });

    }


    return (
        <>
            {isAuth ?
                <div className="row">
                    <h1 ref={titleRef} className="offset-md-3 col-md-8" >Додавання Користувача</h1>
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
                            validationSchema={validationFields()}>
                            <Form>
                                <MyTextInput
                                    label="Логін"
                                    name="login"
                                    type="text"
                                    id="login"
                                    placeH="Введіть логін користувача"
                                />

                                <MyTextInput
                                    label="Email"
                                    name="email"
                                    type="text"
                                    id="email"
                                    placeH="Введіть Email користувача"
                                />

                                <MyTextInput
                                    label="Пароль"
                                    name="password"
                                    type="password"
                                    id="password"
                                    placeH="Введіть пароль користувача"
                                />
                                
                                <MyTextInput
                                label="Пароль"
                                name="confirmPassword"
                                type="password"
                                id="confirmPassword"
                                placeH="Повторіть пароль користувача"
                                />

                                <button type="submit" className="btn btn-dark">Зберегти</button>
                            </Form>
                        </Formik>
                    </div>

                    {loading && <EclipseWidget />}
                </div>
                :
                history("/")
            }
        </>
    )
}

export default AddUserPage;