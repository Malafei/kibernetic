import '../admin/css/styleAdmin.css'
import { Formik, Form } from 'formik';
import { useRef, useState } from "react";
import validatonFields from './Validation';
import MySelectInput from '../../common/MySelectInput';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker, { registerLocale } from "react-datepicker";
import uk from "date-fns/locale/uk";
import { options } from '../../../constants/ActionConst'


const AddLessonsToShedule = ({ visible, onClose }) => {

    const [invalid, setInvalid] = useState([]);
    const formikRef = useRef();

    
    const initState = {
        lessons: [],
    };



    const onSubmitHandler = (values) => {
        console.log("message")
        console.log(values);



    }



    const [inputFields, setInputFields] = useState(
        [{ time: '', nameLesson: '', nameTeacher: '', classRoom: '', typeLesson: '' }]
    )


    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
        console.log(event.target.name)
        console.log(event.target.value)

        formikRef.current.setFieldValue('lessons', inputFields)
        console.log(data);
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

                                    <div className='btn btn-dark' onClick={addFields}>Додати зайняття</div>
                                </table>

                            </div>
                            <div className='divTo_but'>
                                <button type="submit" className="btn btn-dark col-md-4 but showBtn" >Додати</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default AddLessonsToShedule
