import { useField } from "formik";
// import classes from "./FormikInput.module.css";

const FormikInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={classes.control}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </div>
  );
};

export default FormikInput;
