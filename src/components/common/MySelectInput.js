import { useField } from 'formik';
import React, { Component } from 'react'
import Select from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const MySelectInput  = ({ label, ...props }) => {


    const [field, meta] = useField(props);

    return(
        <div className="mb-3">
            <label htmlFor={props.id || props.name} className="form-label">{label}</label>
            <Select options={props.data} />
        
        </div>
    )

}

export default MySelectInput;