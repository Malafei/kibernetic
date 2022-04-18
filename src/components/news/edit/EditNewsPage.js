import React, {useRef, useState, useEffect} from 'react'
import validatonFields from './Validation';
import { useParams } from "react-router-dom";
import {Formik, Form} from 'formik';
import { useNavigate } from 'react-router';
import MyTextInput from '../../common/MyTextInput';
import MyTextArea from '../../common/MyTextArea';
import MyPhotoInput from '../../common/MyPhotoInput';
import { useDispatch, useSelector } from 'react-redux';
import EclipseWidget from '../../common/EclipseWidget';
import { NewsSaveEdit } from './Acrions';
import { HOST } from '../../../constants/ActionConst';
import http from '../../../http_common';

const EditNewsPage = () => {

    const { isAuth } = useSelector(redux => redux.auth);
    const history = useNavigate();

    const initState = {
        name: '',
        description: '',
        image: null
    };

    //силка на наш формік
    const formikRef = useRef();
    const [invalid, setInvalid] = useState([]);
    const [imagePath, setImagePath] = useState("");
    const [loading, setLoading] = useState(true);
    const titleRef = useRef();
    const { id } = useParams();
    const dispatch = useDispatch();

    //функція яка викликається під час події он сабміт (умовно відправляє дані на сервер)


    const onSubmitHandler = (values) => {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => formData.append(key, value));
        dispatch(NewsSaveEdit(formData))
        .then(result => {
            history("/news");
        })
        
    }


    useEffect(() => {
        try {
            console.log(id);
            http.get(`api/News/edit/${id}`)
                .then(res => {
                    const { data } = res;
                    formikRef.current.setFieldValue("id", id)
                    formikRef.current.setFieldValue("name", data.name)
                    formikRef.current.setFieldValue("description", data.description)
                    setImagePath(HOST + "images/" + data.image)
                    setLoading(false);
                })
        }
        catch (error) {
            console.log("Server error")
        }
    }, [])


    return (
        <>
            {isAuth ?
                <div className="row">
                    <h1 ref={titleRef} className="offset-md-3 col-md-8" >Редагування новини</h1>
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

                                {/* присвоюєм значення в наш текстовий інпут /common/MyTextInput */}
                                <MyTextInput
                                    name="id"
                                    type="hidden"
                                    id="id"
                                    value={id}
                                />

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

                                {/* /common/MyPhotoInput */}
                                {imagePath &&
                                    <MyPhotoInput
                                        Myfield="image"
                                        name="image"
                                        data={imagePath}
                                        id="image"
                                        formikRef={formikRef}
                                    />
                                }



                                {/* кнопка відправки форми */}
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
export default EditNewsPage;