import { useState } from "react";
import React from "react";
import DatePicker, {registerLocale} from "react-datepicker";
import { useField } from 'formik';
import uk from "date-fns/locale/uk";

import "react-datepicker/dist/react-datepicker.css";

const Datepicker = () => {

    registerLocale("uk", uk);
    const [date, setDate] = useState(new Date());
   

    return (
            <DatePicker
            className="form-control" 
            dateFormat="dd.MM.yyyy" 
            selected={date} 
            onChange={date => setDate(date)} 
            locale="uk"
            />
    );
}

export default Datepicker