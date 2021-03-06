import { Formik, Form } from 'formik';
import { useEffect, useRef, useState } from "react";
import MySelectInput from '../../common/MySelectInput';
import validationFields from './Validation';
import { useDispatch, useSelector } from 'react-redux';


const DeleteGroupPage = ({visible, onClose}) => {

    const dispatch = useDispatch();

    const { listGroup } = useSelector(state => state.group);

    const initState = {
        nameGroup: '',
    };


    const formikRef = useRef();

    const titleRef = useRef();

    const [invalid, setInvalid] = useState([]);

    const handleMenuClick = (e) => {
        formikRef.current.setFieldValue("nameGroup", e.key);
    }

    const onSubmitHandler = (values) => {
        onClose();
    }

    if (!visible) return null

    return (
        <>
            <div className="album py-5">
                <div className='Body-shedual-admin'>
                    <h1 ref={titleRef} className="offset-md-3 col-md-8" >Видалити групу</h1>
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
                                    <div className="col-sm">
                                        <MySelectInput
                                            label="Виберіть групу"
                                            name="nameGroup"
                                            data={listGroup}
                                            handleMenuClick={handleMenuClick}
                                        />
                                    </div>
                                    <div className="col-sm Button-align">
                                        <button type="submit" className="btn btn-dark col-md-4">Видалити</button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}


export default DeleteGroupPage