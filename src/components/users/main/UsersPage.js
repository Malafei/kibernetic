import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { GetUsers, SearchUser, UserDelete } from "./Action";
import { Pagination, Table, Input, Modal, message } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

const UsersPage = () => {

    const dispatch = useDispatch();
    const { listUser } = useSelector(state => state.users);
    const [loading, setLoading] = useState(true);
    const { confirm } = Modal;
    const { Search } = Input;


    const columns = [
        { title: 'Логін', dataIndex: 'login', key: 'login', render: text => <a>{text}</a>, sorter: true },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Видалення', dataIndex: '', key: 'delete', render: id => <button type="button" onClick={() => onDeleteClick(id.id)} className="btn btn-danger">Видалити</button>, },
        { title: 'Редагування', dataIndex: '', key: 'edit', render: id => <Link className="btn btn-warning" to={`/users/edit/${id.id}`}>Редагувати</Link>, },
    ]

    useEffect(() => {
        try {
            dispatch(GetUsers())
                .then(res => {
                    setLoading(false);
                })
                .catch(res => { setLoading(false) });
        }
        catch (error) {
            console.log("server error global", error);
        }
    }, [])

    const GetData = (text) => {

        const formData = new FormData();
        formData.append('word', text);
        dispatch(SearchUser(formData))
            .then(res => {
                setLoading(false);

            })
            .catch(res => {
                setLoading(false);
            })
    }

    const onDeleteClick = (id) => {
        confirm({
            title: 'Видалити користувача',
            content: 'Ви дійсно хочете видалити користувача?',
            onOk() {
                try {
                    dispatch(UserDelete(id))
                        .then(res => {
                            message.success('Користувача успішно видалено');

                        })
                        .catch(res => {
                            message.error('Схоже у нас помилка', res);
                            console.log(res);
                        })
                } catch (error) {

                }
            },
            onCancel() { },
        });
    }

    return (
        <div className='Body-shedual-admin'>
            <div className="container">
                <div className="col-sm">
                    <Search
                        placeholder="Введіть текст для пошуку"
                        allowClear
                        enterButton="Пошук"
                        size="large"
                        onSearch={(text) => GetData(text)}
                    />
                    <Table
                        pagination={true}
                        columns={columns}
                        dataSource={listUser}
                    />
                    <Link className="btn btn-success offset-md-10 col-md-2" to={`/users/add`}>Додати користувача</Link>

                </div>
            </div>
        </div>
    )




}


export default UsersPage;