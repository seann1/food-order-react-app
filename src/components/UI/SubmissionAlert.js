import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import ReactDOM from "react-dom";

const SubmissionAlert = (props) => {
  return ReactDOM.createPortal(
    <Alert severity="success" sx={{ "z-index": 5 }}>
      <AlertTitle>Success</AlertTitle>
      <p>The following data was sent to the database:</p>
      <p>First Name: {props.info?.firstName}</p>
      <p>Last Name: {props.info?.lastName}</p>
      <p>Address: {props.info?.address}</p>
      <strong>Items</strong>
      {props.info?.items?.map((item) => {
        return (
          <>
            <p>Name: {item.name}</p>
            <p>Price: {item.price}</p>
            <p>Restaurant: {item.restaurantName}</p>
            <p>Amount: {item.amount}</p>
          </>
        );
      })}
    </Alert>,
    document.getElementById("alert")
  );
};

export default SubmissionAlert;
