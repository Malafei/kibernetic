import './css/styleAdmin.css'
import { Formik, Form } from 'formik';
import { useEffect, useRef, useState } from "react";

import validatonFields from './Validation';
import MySelectInput from '../../common/MySelectInput';

const SheduleAdminPage = () => {

    const [inputFields, setInputFields] = useState([
        { time: '', nameLesson: '', nameTeacher: '', classRoom: '', typeLesson: '' }
    ])

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






    const formikRef = useRef();

    const onSubmitHandler = (values) => {

    }

    return (
        <>
            <div className='Grid-wraper-admin'>
                <div key={0} className="album py-5">
                    <div className="container Title-menu-admin ">
                        <h2 className='Main-font-admin'>Панель керування</h2>
                    </div>
                    <div className="container Left-menu-admin">
                        <div className='Button-div-admin'>
                            Додати розклад
                        </div>
                        <div className='Button-div-admin'>
                            Редагувати розклад
                        </div>
                        <div className='Button-div-admin'>
                            Експортувати розклад
                        </div>
                        <div className='Button-div-admin'>
                            Завантажити шаблон
                        </div>
                        <div onClick={() => console.log("насипав")} className='Button-div-admin'>
                            насипати хуїв у кружку
                        </div>
                        <div></div>
                    </div>


                </div>
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
                                                    <td className='oneColumn'>
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
                                                    <td className='fourColumn'>
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






            </div>

        </>
    )



}


export default SheduleAdminPage
