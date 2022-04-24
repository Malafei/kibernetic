import '../../common/css/modal.css';
import '../css/addnews.css';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { NewsAll, NewsDelete } from "./Action";
import { NewsEdit } from '../edit/Acrions';
import { useDispatch } from "react-redux";
import { HOST } from "../../../constants/ActionConst";
import EclipseWidget from '../../common/EclipseWidget';


const NewsPage = () => {


    const dispatch = useDispatch();
    const { list } = useSelector(state => state.news);
    const { isAuth } = useSelector(redux => redux.auth);
    const [loading, setLoading] = useState(true);

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

    const onDetailClick = (id) => {
        console.log("server error global");
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
                                                                <button className="btn btn-sm btn-outline-secondary" onClick={() => onDetailClick(news.id)}>Деталі</button>
                                                            </div>
                                                            :
                                                            <div className='btn-group'>
                                                                <button className="btn btn-sm btn-outline-secondary" onClick={() => onDeleteClick(news.id)}>Видалити</button>
                                                                <button className="btn btn-sm btn-outline-secondary" onClick={() => onDetailClick(news.id)}>Деталі</button>
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