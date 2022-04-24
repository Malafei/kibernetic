import { useField } from 'formik';
import React, { Component } from 'react'
import Select from 'react-select'

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

const MySelectInput = ({ ...props }) => {


    const [field, meta] = useField(props);

    return (
        <>
            <div className="mb-3">
                {props.label != null ?
                    <>
                        <label htmlFor={props.id || props.name} className="form-label">{props.label}</label>
                        <Select options={props.data} />
                    </>
                    :
                    <>
                        <Select options={props.data} />
                    </>
                }
            </div>
        </>
    )

}

export default MySelectInput;