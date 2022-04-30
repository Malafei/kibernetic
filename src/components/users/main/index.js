import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { GetUsers, SearchUser, UserDelete } from "../actions/UserActions";
import { Pagination, Table, Input, Modal, message } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

const UsersPage = () => {

    const dispatch = useDispatch();
    const { listUser } = useSelector(state => state.users);
    const [loading, setLoading] = useState(true);
    const { confirm } = Modal;
    const { Search } = Input;


    const columns = [
        { title: 'Id', dataIndex: 'id', key: 'id', sorter: true },
        { title: 'Login', dataIndex: 'login', key: 'login', render: text => <a>{text}</a>, sorter: true },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Delete', dataIndex: '', key: 'delete', render: id => <button type="button" onClick={() => onDeleteClick(id.id)} className="btn btn-danger">Delete</button>, },
        { title: 'Edit', dataIndex: '', key: 'edit', render: id => <Link className="btn btn-warning" to={`/users/edit/${id.id}`}>Edit</Link>, },
    ]

    useEffect(() => {
        try {
            dispatch(GetUsers())
                .then(res => {
                    setLoading(false);
                })
                .catch(res => {setLoading(false)});
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
            title: 'Delete student?',
            content: 'Do you want to delete this student?',
            onOk() {
                try {
                    dispatch(UserDelete(id))
                        .then(res => {
                            message.success('User deleted successfully :)');

                        })
                        .catch(res => {
                            message.error('Something went wrong :(');
                            console.log(res);
                        })
                } catch (error) {

                }
            },
            onCancel() { },
        });
    }

    return (
        <div className="row">
            <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={(text) => GetData(text)}
            />
            <Table
                pagination={true}
                columns={columns}
                dataSource={listUser}
            />
            <Link className="btn btn-success offset-md-10 col-md-2" to={`/users/add`}>Add User</Link>

        </div>
    )




}


export default UsersPage;