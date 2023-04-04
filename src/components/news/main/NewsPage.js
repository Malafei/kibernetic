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
    const [dateSelectNews, setDate] = useState(null);


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

    const onDetailClick = (name, description, image, date) => {
        setContextDay(
            <>
                <div className='modal-header'>
                    <img className='displayed' src={HOST + "images/" + image} alt={image} height='225' />
                </div>
                <div className='modal-body'>
                    <div>

                        <h3 className='modal-title'>{name}</h3>
                    </div>
                    <div className='modal-content'>{description}</div>
                </div>
            </>
        );
        setDate(date);
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
                    footer={<> <div className="card-body"><small className="text-muted">{dateSelectNews}</small></div><button className="btn btn-sm btn-outline-secondary" onClick={onClose}>Закрыть</button></>}
                    onClose={onClose}
                />
                <div className="container-sm">
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
                    <div className="row row-cols-1 row-cols-sm-1 row-cols-lg-2  row-cols-xl-3 g-4">
                        {
                            list.map((news, index) => {
                                return (
                                    <>
                                        <div key={index} className="col" onClick={() => onDetailClick(news.name, news.description, news.image, news.date)} >
                                            <div className="card h-100 shadow-sm">
                                                <img className="displayed" src={HOST + "images/" + news.image} alt={news.image} height='225' />
                                                <div className="card-body">
                                                    <h4>{news.name}</h4>
                                                    <p className="card-text">{smallDescription(news.description)}</p>
                                                </div>
                                                <div className="card-footer">
                                                    <div className="container PadingNull">
                                                        <div className="row row-cols-1 row-cols-sm-2" >
                                                            {!isAuth ?
                                                                <div className='btn-group'>
                                                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => onDetailClick(news.name, news.description, news.image)}>Деталі</button>
                                                                </div>
                                                                :
                                                                <div className="btn-group col-sm-8">
                                                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => onDeleteClick(news.id)}>Видалити</button>
                                                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => onDetailClick(news.name, news.description, news.image, news.date)}>Деталі</button>
                                                                    <Link className="btn btn-sm btn-outline-secondary" onClick={() => onEditClick(news.id)} to={`/news/edit/${news.id}`}>Редагувати</Link>
                                                                </div>
                                                            }
                                                            <div className="divTo_but col-sm-4">
                                                                <small className="text-muted text">{news.date}</small>
                                                            </div>
                                                        </div>
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