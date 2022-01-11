import '../../common/css/modal.css';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { NewsAll } from "./Action";
import { useDispatch } from "react-redux";
import Modal from "../../common/MyModal";
import { HOST } from "../../../constants/ActionConst";


const NewsPage = () => {


    const dispatch = useDispatch();
    const { list } = useSelector(state => state.news);
    const { isAuth, news } = useSelector(redux => redux.auth);

    useEffect(() => {
        try {
            console.log("news page 15")
            dispatch(NewsAll())
                .then(res => {
                    //setLoading(false);
                })
                .catch();
        }
        catch (error) {
            console.log("server error global", error);
        }

    }, [])



    const [isModal, setModal] = useState(false)
    const onClose = () => setModal(false)

    const smallDescription = (description) => {
        return description.substring(0, 15) + "...";
    }


    return (
        <>
            {/* <Modal
                visible={isModal}
                title={news.name}
                content={news.description}
                image={news.image}
                footer={<button onClick={onClose}>Закрыть</button>}
                onClose={onClose}
            /> */}
            <div className="album py-5">
                <div className="container">
                    <h1>Список новин</h1>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {
                            list.map((news, index) => {

                                return (
                                    <>
                                        <Modal
                                            visible={isModal}
                                            title={news.name}
                                            content={news.description}
                                            image={news.image}
                                            footer={<button onClick={onClose}>Закрыть</button>}
                                            onClose={onClose}
                                        />
                                        <div key={index} className="col">
                                            <div className="card shadow-sm">
                                                <img className='displayed' src={HOST + "/images/" + news.image} alt={news.image} height='225' />
                                                <div className="card-body">
                                                    <h4>{news.name}</h4>
                                                    <p className="card-text">{smallDescription(news.description)}</p>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        {!isAuth ?
                                                            <div className='btn-group'>
                                                                {/* <button className="btn btn-sm btn-outline-secondary" onClick={() => modalDialog(news.name, news.description, news.image)}>Деталі</button> */}
                                                                <button className="btn btn-sm btn-outline-secondary" onClick={() => setModal(true)}>Деталі</button>
                                                            </div>
                                                            :
                                                            <div className='btn-group'>
                                                                <Link className="btn btn-sm btn-outline-secondary" to="/register" >Видалити</Link>
                                                                <button className="btn btn-sm btn-outline-secondary" onClick={() => setModal(true)}>Деталі</button>
                                                                <Link className="btn btn-sm btn-outline-secondary" to="/login" >Редагувати</Link>
                                                            </div>
                                                        }
                                                        <small className="text-muted">{news.date}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}


export default NewsPage