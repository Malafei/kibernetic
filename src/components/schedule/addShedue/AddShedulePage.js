import '../admin/css/styleAdmin.css'
import { Formik, Form } from 'formik';
import { useEffect, useRef, useState } from "react";
import { options } from '../../../constants/ActionConst'

import validatonFields from './Validation';
import MySelectInput from '../../common/MySelectInput';


const AddShedule = () => {
    const [inputFields, setInputFields] = useState([{ time: '', nameLesson: '', nameTeacher: '', classRoom: '', typeLesson: '' }])

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
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


    const handleMenuClick = (e) => {
        formikRef.current.setFieldValue("typeLesson", e.key);
        console.log(e.key);
    }



    const formikRef = useRef();

    const onSubmitHandler = (values) => {
        console.log(values);
    }



    return (
        <>
            <div className="album py-5">
                <div className='Body-shedual-admin'>
                    <Formik
                        innerRef={formikRef}
                        initialValues={inputFields}
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
                                                        handleMenuClick={handleMenuClick}
                                                        onChange={event => handleFormChange(index, event)}
                                                    />
                                                </td>
                                                <td>
                                                    <button onClick={() => removeFields(index)}>Remove</button>

                                                </td>

                                            </tr>
                                        )
                                    })}

                                    <button onClick={addFields}>Додати зайняття</button>
                                </tbody>

                            </table>
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