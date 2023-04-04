import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import MyTextInput from '../../common/MyTextInput';
import { useNavigate, useParams } from "react-router-dom";
import EclipseWidget from '../../common/EclipseWidget';
import validationFields from './Validation';
import { UserEdit, UserEditSave } from './Action';
import { message, Modal } from 'antd';

const EditUserPage = () => {

    const { isAuth } = useSelector(redux => redux.auth);
    const { editedUser } = useSelector(redux => redux.users);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();
    const formikRef = useRef();
    const [invalid, setInvalid] = useState([]);
    const titleRef = useRef();
    const { confirm } = Modal;


    const initState = {
        email: '',
        login: ''
    };

    const onSubmitHandler = (values) => {

        confirm({
            title: 'Редагування користувача?',
            content: 'Ви впевнені що хочете внести зміди до цього користувача?',
            onOk() {
                const formData = new FormData();
                Object.entries(values).forEach(([key, value]) => formData.append(key, value));
                console.log(editedUser);
                dispatch(UserEditSave(formData))
                    .then(result => {
                        message.success("Користувач оновлений успішно");
                        setLoading(false);
                        history("/users")
                    })
                    .catch(res => {
                        setLoading(false);
                        message.error("404");
                    })
            },
            onCancel() { },
        });

    }

    useEffect(() => {
        try {
            dispatch(UserEdit(id))
                .then(res => {
                    setLoading(false);
                })
                .catch(res => {
                    setLoading(false);
                });
        }
        catch (error) {
            console.log("server error global", error);
        }
    }, [])

    useEffect(() => {
        formikRef.current.setFieldValue("id", id);
        formikRef.current.setFieldValue("login", editedUser.login);
        formikRef.current.setFieldValue("email", editedUser.email);
        console.log(editedUser);
    }, [editedUser])



    return (
        <>
            {isAuth ?
                <div className="row">
                    <h1 ref={titleRef} className="offset-md-3 col-md-8" >Редагування Користувача</h1>
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
                                    name="id"
                                    type="hidden"
                                    id="id"
                                    value={id}
                                />

                                <MyTextInput
                                    label="Login"
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

export default EditUserPage;