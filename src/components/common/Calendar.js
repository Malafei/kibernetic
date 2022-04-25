import { useState } from 'react';

import classNames from 'classnames';
import moment from 'moment';
import "moment/locale/uk"

const Calendar = () => {


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





    return (
        <>
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
                    {[...Array(7)].map((_, i) => (
                        <div key={i} className='Cell-header Cell-everyday RowInCell'>
                            {moment().day(i + 1).format('ddd')}
                        </div>
                    ))}
                </div>

                <div className='Grid-wraper'>
                    {
                        daysArray.map((dayItem) => (

                            <div className={classNames("form-control",
                                { "Cell-wraper CurrentDay": moment().isSame(dayItem, 'day') },
                                { "Cell-wraper-month": !today.isSame(dayItem, 'month') },
                                { "Cell-wraper Cell-wekend": dayItem.day() === 6 || dayItem.day() === 0 },
                                { "Cell-wraper Cell-everyday": dayItem.day() !== 6 || dayItem.day() !== 0 })}
                                key={dayItem.unix()}
                                
                                onClick={() => console.log(dayItem.format('DD.MM.YYYY'))}>

                                <div className='RowInCell'>

                                    <div className='Day-wraper'>
                                        {dayItem.format('D')}
                                    </div>
                                </div>

                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}


export default Calendar