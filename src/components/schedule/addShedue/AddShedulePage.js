import '../admin/css/styleAdmin.css'
import { Formik, Form } from 'formik';
import { useRef, useState } from "react";
import { options } from '../../../constants/ActionConst'
import { SheduleAdd } from './Action';
import validatonFields from './Validation';
import MySelectInput from '../../common/MySelectInput';
import { useDispatch } from 'react-redux';


const AddShedule = ({visible, onClose}) => {

    const dispatch = useDispatch();
    const [invalid, setInvalid] = useState([]);

    const initState={
        lessons: [],
        key: '1',
        date:'10.08.2022'
    };

    const [inputFields, setInputFields] = useState(
        [ { time: '', nameLesson: '', nameTeacher: '', classRoom: '', typeLesson: '' } ]
    )

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
        formikRef.current.setFieldValue('lessons', inputFields)

    }

    const addFields = () => {
        let newfield = { time: '', nameLesson: '', nameTeacher: '', classRoom: '', typeLesson: ''}
        setInputFields([...inputFields, newfield])
    }

    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }


    const handleMenuClick = (index, e) => {
        let data = [...inputFields];
        data[index]["typeLesson"] = e.key;
        setInputFields(data)
    }



    const formikRef = useRef();

    const onSubmitHandler = (values) => {
        const formData = new FormData();
        console.log(values);
        Object.entries(values).forEach(([key, value]) => formData.append(key, value));
        console.log(formData);
        dispatch(SheduleAdd(formData))
            .then(result => {
                console.log(result);
                onClose();
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
                                                        handleMenuClick={event => handleMenuClick(index, event)}
                                                        //onChange={event => handleFormChange(index, event)}
                                                    />
                                                </td>
                                                <td onClick={() => removeFields(index)}>Remove</td>

                                            </tr>
                                            
                                        )
                                    })}
                                </tbody>

                            </table>
                                    <div onClick={addFields}>Додати зайняття</div>
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