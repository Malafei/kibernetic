import { useField } from 'formik';
import classNames from 'classnames';
import React, { Component } from 'react'
import Select from 'react-select'


const MySelectInput = ({ ...props }) => {


    const [field, meta] = useField(props);

    return (
        <>
            <div className="mb-3">
                {props.label != null ?
                    <>
                        <label htmlFor={props.id || props.name} className="form-label">{props.label}</label>
                        <Select options={props.data}
                            className={classNames("form-control",
                                { "is-invalid": meta.error && meta.touched },
                                { "is-valid": !meta.error && meta.touched })}
                            {...field} {...props} />

                        {meta.error && meta.touched && <span className="text-danger">{meta.error}</span>}
                    </>
                    :
                    <>
                        <Select options={props.data}
                            className={classNames("form-control",
                                { "is-invalid": meta.error && meta.touched },
                                { "is-valid": !meta.error && meta.touched })}
                            {...field} {...props} />

                        {meta.error && meta.touched && <span className="text-danger">{meta.error}</span>}
                    </>
                }
            </div>
        </>
    )

}

export default MySelectInput;