import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Backdrop from "./Modal";

import ReactDOM from "react-dom";

const SubmissionAlert = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("overlays")
      )}
      {ReactDOM.createPortal(
        <Alert severity="success" sx={{ "z-index": 30 }} className="alert">
          <AlertTitle>Success</AlertTitle>
          <p>
            The following data was sent to the database:
            <br />
            First Name: {props.info?.firstName}
            <br />
            Last Name: {props.info?.lastName}
            <br />
            Address: {props.info?.address}
          </p>
          <strong>Items</strong>
          <table>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Restaurant</th>
              <th>Amount</th>
            </tr>
            {props.info?.items?.map((item) => {
              return (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.restaurantName}</td>
                  <td>{item.amount}</td>
                </tr>
              );
            })}
          </table>
          {props.children}
        </Alert>,
        document.getElementById("overlays")
      )}
    </>
  );
};

export default SubmissionAlert;
