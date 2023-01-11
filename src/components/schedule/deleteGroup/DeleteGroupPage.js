import { Formik, Form } from 'formik';
import { useEffect, useRef, useState } from "react";
import MySelectInput from '../../common/MySelectInput';
import validationFields from './Validation';
import { GroupDelete } from './Action';
import { ShowGroup } from '../main/Action';
import EclipseWidget from '../../common/EclipseWidget';
import { useDispatch, useSelector } from 'react-redux';


const DeleteGroupPage = ({visible, onClose}) => {

    const dispatch = useDispatch();

    const { listGroup } = useSelector(state => state.group);
    const label = "Виберіть групу";

    const initState = {
        nameGroup: '',
    };

    //  const onDeleteClick = (id) => {
    //     try {
    //         dispatch(NewsDelete(id))
    //             .then()
    //             .catch();
    //     }
    //     catch (error) {
    //         console.log("server error global");
    //     }
    // }
    const [loading, setLoading] = useState(false);
    

    const formikRef = useRef();

    const titleRef = useRef();

    const [invalid, setInvalid] = useState([]);

    const handleMenuClick = (e) => {
        formikRef.current.setFieldValue("nameGroup", e.key);
        console.log(e);
    }

    const onSubmitHandler = (id) => {
        try {
            dispatch(GroupDelete(id.nameGroup))
                .then(
                    dispatch(ShowGroup())
                    .then(res =>{
                        setLoading(false);
                    })
                    .catch()
                )
                .catch();
        }
        catch (error) {
            console.log("server error global");
        }
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
                                            label={label}
                                            name="nameGroup"
                                            id="nameGroup"
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
                    {loading && <EclipseWidget />}
                </div>
            </div>
        </>
    )
}


export default DeleteGroupPage