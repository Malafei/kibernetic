import '../../common/css/modal.css';
import '../css/addnews.css';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createRoutesFromChildren, Link } from 'react-router-dom'
import { NewsAll, NewsDelete } from "./Action";
import { NewsEdit } from '../edit/Acrions';
import { useDispatch } from "react-redux";
import { HOST } from "../../../constants/ActionConst";
import EclipseWidget from '../../common/EclipseWidget';
import Modal from '../../common/MyModal';


const NewsPage = () => {


    const dispatch = useDispatch();
    const { list } = useSelector(state => state.news);
    const { isAuth } = useSelector(redux => redux.auth);
    const [loading, setLoading] = useState(true);


    const [contextDay, setContextDay] = useState(() => <></>);
    const [isModal, setModal] = useState(false)
    const onClose = () => setModal(false)


    useEffect(() => {
        try {
            dispatch(NewsAll())
                .then(res => {
                    setLoading(false);

                })
                .catch();
        }
        catch (error) {
            console.log("server error global", error);
        }

    }, [])

    const onDeleteClick = (id) => {
        try {
            dispatch(NewsDelete(id))
                .then()
                .catch();
        }
        catch (error) {
            console.log("server error global");
        }
    }

    const onDetailClick = (name, description, image) => {
        setContextDay(
            <>
                <div className='modal-header'>
                    <img className='displayed' src={HOST + "images/" + image} alt={image} height='225' />
                    {/* <span className='modal-close' onClick={onClose}>&times; </span> */}
                </div>
                <div className='modal-body'>
                    <h3 className='modal-title'>{name}</h3>
                    <div className='modal-content'>{description}</div>
                </div>
            </>
        );
        setModal(true);
    }

    const onEditClick = (id) => {
        try {
            dispatch(NewsEdit(id))
                .then()
                .catch();
        }
        catch (error) {
            console.log("server error global");
        }
    }

    const smallDescription = (description) => {
        return description.substring(0, 15) + "...";
    }


    return (
        <>
            <div key={0} className="album py-5">

                <Modal
                    visible={isModal}
                    content={contextDay}
                    footer={<button onClick={onClose}>Закрыть</button>}
                    onClose={onClose}
                />
                <div className="container">
                    {isAuth ?
                        <div className="row row-cols-1 row-cols-sm-2 g-2">
                            <h1>Список новин</h1>
                            <div className="divTo_but">
                                <Link className="btn btn-success col-md-2 but" to="/news/add">Додати новину</Link>
                            </div>
                        </div>
                        :
                        <div className="row row-cols-1 row-cols-sm-2 g-2">
                            <h1>Список новин</h1>
                        </div>
                    }
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {
                            list.map((news, index) => {
                                return (
                                    <>
                                        <div key={index} className="col">
                                            <div className="card shadow-sm">
                                                <img className='displayed' src={HOST + "images/" + news.image} alt={news.image} height='225' />
                                                <div className="card-body">
                                                    <h4>{news.name}</h4>
                                                    <p className="card-text">{smallDescription(news.description)}</p>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        {!isAuth ?
                                                            <div className='btn-group'>
                                                                <button className="btn btn-sm btn-outline-secondary" onClick={() => onDetailClick(news.name, news.description, news.image)}>Деталі</button>
                                                            </div>
                                                            :
                                                            <div className='btn-group'>
                                                                <button className="btn btn-sm btn-outline-secondary" onClick={() => onDeleteClick(news.id)}>Видалити</button>
                                                                <button className="btn btn-sm btn-outline-secondary" onClick={() => onDetailClick(news.name, news.description, news.image)}>Деталі</button>
                                                                <Link className="btn btn-sm btn-outline-secondary" onClick={() => onEditClick(news.id)} to={`/news/edit/${news.id}`}>Редагувати</Link>
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

                {loading && <EclipseWidget />}
            </div>
        </>
    );
}


export default NewsPage