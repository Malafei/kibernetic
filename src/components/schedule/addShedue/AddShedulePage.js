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


const AddShedule = ({ visible, onClose }) => {

    registerLocale("uk", uk);
    const dispatch = useDispatch();
    const [invalid, setInvalid] = useState([]);

    const { listGroup } = useSelector(state => state.group);



    const initState = {
        //key: '1',
        lessons: [],
        date: new Date(),
        nameGroup: ''
    };

    const [inputFields, setInputFields] = useState(
        [{ time: '', nameLesson: '', nameTeacher: '', classRoom: '', typeLesson: '' }]
    )

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
        formikRef.current.setFieldValue('lessons', inputFields)

    }

    const addFields = () => {
        let newfield = { time: '', nameLesson: '', nameTeacher: '', classRoom: '', typeLesson: '' }
        setInputFields([...inputFields, newfield])
    }

    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }


    const handleMenuClickLesson = (index, e) => {
        let data = [...inputFields];
        data[index]["typeLesson"] = e.key;
        setInputFields(data)
    }

    const handleMenuClick = (e) => {

        formikRef.current.setFieldValue("nameGroup", e.key);
        console.log(e);
    }


    const formikRef = useRef();

    const onSubmitHandler = (values) => {
        const formData = new FormData();
        formData.append("lessons", values.lessons);
        formData.append("date", new Date(values.date));
        formData.append("nameGroup", values.nameGroup);
        //Object.entries(values.lessons).forEach(([key, value]) => formData.append(key, value));
        console.log(values.lessons);
        console.log(values);
        console.log(formData);
        dispatch(SheduleAdd(formData))
            .then(result => {
                console.log(result);
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
        console.log(date);
        formikRef.current.setFieldValue("date", date);
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
                                    selected={initState.date}
                                    onChange={handleChange}
                                    name="date"
                                    locale="uk"
                                />
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className='oneColumn' scope="col">час</th>
                                            <th scope="col">Назва предмета</th>
                                            <th scope="col">Викладач</th>
                                            <th scope="col">ауд.</th>
                                            <th scope="col">Вид зайняття</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {inputFields.map((input, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <input
                                                            className='NotVisInput'
                                                            name='time'
                                                            value={input.time}
                                                            onChange={event => handleFormChange(index, event)}
                                                        />
                                                    </td>
                                                    <td>

                                                        <input
                                                            className='NotVisInput'
                                                            name='nameLesson'
                                                            value={input.nameLesson}
                                                            onChange={event => handleFormChange(index, event)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            className='NotVisInput'
                                                            name='nameTeacher'
                                                            value={input.nameTeacher}
                                                            onChange={event => handleFormChange(index, event)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            className='NotVisInput'
                                                            name='classRoom'
                                                            value={input.classRoom}
                                                            onChange={event => handleFormChange(index, event)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <MySelectInput
                                                            name="typeLesson"
                                                            value={input.typeLesson}
                                                            data={options}
                                                            handleMenuClick={event => handleMenuClickLesson(index, event)}
                                                        //onChange={event => handleFormChange(index, event)}
                                                        />
                                                    </td>
                                                    <td> <div className='btn btn-dark' onClick={() => removeFields(index)}>Видалити</div></td>

                                                </tr>

                                            )
                                        })}
                                    </tbody>

                                </table>
                                <div className='btn btn-dark' onClick={addFields}>Додати зайняття</div>
                            </div>
                            <div className='divTo_but'>
                                <button type="submit" className="btn btn-dark col-md-4 but showBtn">Зберегти</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default AddShedule