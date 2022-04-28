import { useField } from 'formik';
import classNames from 'classnames';
import React, { Component } from 'react'
import { Menu, Dropdown, Button, message, Space, } from 'antd';
import{DownOutlined} from '@ant-design/icons';



const MySelectInput = ({ handleMenuClick, ...props }) => {
    const [field, meta] = useField(props);



    const menu = (
        <Menu
            onClick={(e) => handleMenuClick(e)}
            items={props.data}/>
    )


    return (
        <>
            <Dropdown overlay={menu}
            className={classNames("form-control",
            {"is-invalid": meta.error && meta.touched},
            {"is-valid": !meta.error && meta.touched})}
            {...field} {...props} >
                
                <Button>
                    <Space>
                        {meta.error && meta.touched ?
                            <span className="text-danger">{meta.error}</span>
                            :
                            props.label
                        }
                        <DownOutlined/>
                    </Space>
                </Button>
            </Dropdown>
        </>
    )

}

export default MySelectInput;