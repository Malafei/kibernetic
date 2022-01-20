import { useField } from 'formik';
import classNames from 'classnames';

const MyTextArea = ({ label, placeH, ...props }) => {

  // отримуємо дані
    const [field, meta] = useField(props);
  // повертаєм інпут
    return (

      <div className="mb-3">
        <label htmlFor={props.id || props.name} className="form-label">{label}</label>
        <textarea className={classNames("form-control",
                        {"is-invalid": meta.error && meta.touched},
                        {"is-valid": !meta.error && meta.touched})} 
                        {...field} {...props} placeholder ={placeH} rows="10" cols="35" />
        {meta.error && meta.touched && <span className="text-danger">{meta.error}</span>}
      </div>

    );
  };

  export default MyTextArea;

<textarea class="form-control" rows="10" cols="35" id="description" name="description"></textarea>