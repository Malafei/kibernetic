import '../../news/css/addnews.css'
import './css/style.css' 
import Calendar from '../../common/Calendar';
import { Formik, Form } from 'formik';
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import validatonFields from './Validation';
import EclipseWidget from '../../common/EclipseWidget';
import { ShowGroup } from './Action';
import { useDispatch } from "react-redux";
import MySelectInput from '../../common/MySelectInput';


const ShedulePage = () => {

    const dispatch = useDispatch();

    const { listGroup } = useSelector(state => state.shedule);
    const { isAuth } = useSelector(redux => redux.auth);
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);

    useEffect(() => {
        try {
            dispatch(ShowGroup())
                .then(res => {
                    setLoading(false);
                    console.log("redux",listGroup);
                    console.log("response", res)
                    setItems(res);
                })
                .catch();
        }
        catch (error) {
            console.log("server error global", error);
        }

    }, [])

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
                                    //label="Виберіть групу"
                                    name="nameGroup"
                                    value={initState.nameGroup}
                                    data ={items}
                                />

                                <div className='divTo_but'>
                                    <button type="submit" className="btn btn-dark col-md-4 but showBtn">Показати</button>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                    <Calendar></Calendar>
                    {loading && <EclipseWidget />}
                </div>
            </div>
        </>
    );
}
export default ShedulePage