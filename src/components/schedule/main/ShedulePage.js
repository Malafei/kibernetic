import '../../news/css/addnews.css'
import '../css/style.css'
import { Formik, Form } from 'formik';
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import validatonFields from './Validation';
import EclipseWidget from '../../common/EclipseWidget';
import MySelectInput from '../../common/MySelectInput';
import moment from 'moment';
import "moment/locale/uk"
import classNames from 'classnames';


const ShedulePage = () => {


    const { isAuth } = useSelector(redux => redux.auth);
    const [loading, setLoading] = useState(false);


    moment.updateLocale('uk', { week: { dow: 1 } })
    const [today, setToday] = useState(moment());
    const startDay = today.clone().startOf("month").startOf("week");

    const day = startDay.clone().subtract(1, 'day');

    const daysArray = [...Array(42)].map(() => day.add(1, 'day').clone());
    const month = today.format('MMMM');
    const year = today.format('YYYY');


    const prevHandler = () =>{ setToday(prev => prev.clone().subtract(1,'month')) }
    const todayHandler = () =>{ setToday(moment()) }
    const nextHandler = () =>{ setToday(prev => prev.clone().add(1,'month')) }



    const initState = {
        nameGroup: '',
        dateDay: '',
    };

    const formikRef = useRef();


    const onSubmitHandler = (values) => {

    }

    return (
        <>
            <div key={0} className="album py-5">
                <div className="container">
                    {isAuth ?
                        <div className="row row-cols-1 row-cols-sm-2 g-2">
                            <h1>Розклад занять</h1>
                            <div className="divTo_but">
                                <Link className="btn btn-success col-md-4 but" to="/shedule/admin">Керувати розкладом</Link>
                            </div>
                        </div>
                        :
                        <div className="row row-cols-1 row-cols-sm-2 g-2">
                            <h1>Розклад занять</h1>
                        </div>
                    }
                    <Formik
                        innerRef={formikRef}
                        initialValues={initState}
                        onSubmit={onSubmitHandler}
                        validationSchema={validatonFields()}>
                        <Form>
                            <div className="row row-cols-1 row-cols-sm-2 g-2">
                                <MySelectInput
                                    label="Виберіть групу"
                                    name="nameGroup"
                                />

                                <div className='divTo_but'>
                                    <button type="submit" className="btn btn-dark col-md-4 but showBtn">Показати</button>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
                <div className='Shadow-wraper'>

                    
                    <div className='Div-wraper'>
                        <div>
                            <span className='Text-wraper Title-wrapper'>{month}</span>
                            <span className='Text-wraper'>{year}</span>    
                        </div>
                        <div className='Buttons-wraper'>
                            <button onClick={prevHandler} className='Button-wraper'>&lt;</button>
                            <button onClick={todayHandler} className='Button-wraper TodayButton'>Сьогодні</button>
                            <button onClick={nextHandler} className='Button-wraper'>&gt;</button>
                        </div>
                    </div>
                    <div className='Grid-wraper'>
                        {[...Array(7)].map((_,i) => (
                            <div className='Cell-header Cell-everyday RowInCell'>
                                {moment().day(i+1).format('ddd')}
                            </div>
                        ))}
                    </div>

                    <div className='Grid-wraper'>
                        {
                            daysArray.map((dayItem) => (

                                <div className={classNames("form-control",
                                    { "Cell-wraper CurrentDay": moment().isSame(dayItem, 'day')},
                                    { "Cell-wraper-month": !today.isSame(dayItem, 'month')},
                                    { "Cell-wraper Cell-wekend": dayItem.day() === 6 || dayItem.day() === 0 },
                                    { "Cell-wraper Cell-everyday": dayItem.day() !== 6 || dayItem.day() !== 0 })}
                                    key={dayItem.unix()}>

                                    <div className='RowInCell'>

                                        <div className='Day-wraper'>
                                            {dayItem.format('D')}
                                        </div>
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                    {loading && <EclipseWidget />}
                </div>
            </div>
        </>
    );
}
export default ShedulePage