import { Formik, Form } from 'formik';
import { useEffect, useRef, useState } from "react";
import MyTextInput from '../../common/MyTextInput';
import validationFields from './Validation';
import { GroupAdd } from './Action';
import { ShowGroup } from '../main/Action';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EclipseWidget from '../../common/EclipseWidget';




const AddGroup = ({visible = false, onClose}) => {


    const initState = {
        nameGroup: '',
    };
    const formikRef = useRef();
    const titleRef = useRef();
    const dispatch = useDispatch();
    const history = useNavigate();

    const [loading, setLoading] = useState(false);
    const [invalid, setInvalid] = useState([]);


    const onSubmitHandler = (values) => {
        console.log("message");
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => formData.append(key, value));
        dispatch(GroupAdd(formData))
            .then(result => {
                try {
                    dispatch(ShowGroup())
                    .then(res =>{
                        setLoading(false);
                    })
                    .catch()
                    
                }
                catch (error) {
                    console.log("server error global", error);
                }
                console.log(result);
                onClose()
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

    
    if (!visible) return null

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
                                <div className="container">
                                    <div className="row containerDivCenter">
                                        <div className="col-sm ">
                                            <MyTextInput
                                                name="nameGroup"
                                                type="nameGroup"
                                                id="nameGroup"
                                                placeH="Назва групи"
                                            />
                                        </div>
                                        <div className="col-sm Button-align">
                                            <button type="submit" className="btn btn-dark col-md-4 but">Зберегти</button>
                                        </div>
                                    </div>
                                </div>

                            </Form>
                        </Formik>
                    {loading && <EclipseWidget />}
                    </div>
                </div>
        </>
    )
}


export default AddGroup