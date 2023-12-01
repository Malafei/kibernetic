import '../admin/css/styleAdmin.css'
import { Formik, Form } from 'formik';
import { useRef, useState } from "react";
import { options } from '../../../constants/ActionConst'
import { SheduleAdd } from './Action';
import validatonFields from './Validation';
import MySelectInput from '../../common/MySelectInput';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker, { registerLocale } from "react-datepicker";
import uk from "date-fns/locale/uk";
import "react-datepicker/dist/react-datepicker.css";
import AddLessonsToShedule from './AddLessonsToShedule';
import TimeWrapper from '../../common/TimeWraper';


const AddShedule = ({ visible, onClose }) => {

    registerLocale("uk", uk);
    const [addLessonsToSheduleVision, setAddLessonsToSheduleVision] = useState(false);
    const dispatch = useDispatch();
    const [invalid, setInvalid] = useState([]);
    const formikRef = useRef();
    const [Rdate, setDate] = useState(new Date());
    //const [nameGroup, setNameGroup] = useState();

    const { listGroup } = useSelector(state => state.group);



    const initState = {
        date: new Date(),
        nameGroup: 0
    };

    const onAddLessonsToShedule = () => {
        setAddLessonsToSheduleVision(true);
    }

    const handleMenuClick = (e) => {
        formikRef.current.setFieldValue("nameGroup", e.key);
    }



    const onSubmitHandler = (values) => {
        const formData = new FormData();
        formData.append('date', values.date.toISOString());
        formData.append('nameGroup', values.nameGroup);

        dispatch(SheduleAdd(formData))
            .then(result => {
                console.log("good");
                console.log(result);
                onAddLessonsToShedule();
                onClose();
            })
            .catch(ex => {
                console.log(ex)
                const { errors } = ex;
                Object.entries(errors).forEach(([key, values]) => {
                    let message = '';
                    values.forEach(text => message += text + " ");
                    formikRef.current.setFieldError(key, message);
                });
                setInvalid(ex.errors.invalid);
            })
    }


    const handleChange = (date) => {
        formikRef.current.setFieldValue("date", date);
        setDate(date)
    }


    if (!visible) return null

    return (
        <>
            <div className="album py-5">
                <div className='Body-shedual-admin'>
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
                        validationSchema={validatonFields()}>
                        <Form>
                            <div className="container">
                                <div className="row containerDivCenter">
                                    <div className="col-sm">
                                        <MySelectInput
                                            label="Виберіть групу"
                                            name="nameGroup"
                                            id="nameGroup"
                                            data={listGroup}
                                            handleMenuClick={handleMenuClick}
                                        />
                                    </div>
                                </div>
                                <DatePicker
                                    className="form-control"
                                    dateFormat="dd.MM.yyyy"
                                    selected={Rdate}
                                    onChange={handleChange}
                                    name="date"
                                    locale="uk"
                                />
                                
                            </div>
                            <div className='divTo_but'>
                                <button type="submit" className="btn btn-dark col-md-4 but showBtn">Додати</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>

            <AddLessonsToShedule visible={addLessonsToSheduleVision} onClose={onClose} />
        </>
    )
}

export default AddShedule