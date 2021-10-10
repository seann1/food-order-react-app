import classes from "./Marker.module.css";

const Marker = (props) => {
  return (
    <>
      <div className={classes.pin}></div>
      <div className={classes.pulse}></div>
    </>
  );
};

export default Marker;
