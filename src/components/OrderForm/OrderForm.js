import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import SubmissionAlert from "../UI/SubmissionAlert";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// import PlacesAutoComplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";
import FormikInput from "../UI/FormikInput";
import { Modal } from "../UI/Modal";
import classes from "./OrderForm.module.css";

function OrderForm(props) {
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null);

  const cartCtx = useContext(CartContext);

  const closeAlert = () => {
    setShowAlert(false);
    setAlertInfo(null);
    props.returnToMenu();
  };

  function placeOrderHandler(values) {
    //event.preventDefault();

    const order = {
      firstName: values.firstName,
      lastName: values.lastName,
      address: values.address,
      items: cartCtx.items,
    };

    placeOrderFunction(order);
  }

  const placeOrderFunction = async (order) => {
    try {
      const response = await fetch(
        "https://food-order-app-d078d-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify(order),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await response.json();
      cartCtx.resetCart();
      setOrderCompleted(true);
      setShowAlert(true);
      setAlertInfo(order);

      // setTimeout(() => {
      //   setShowAlert(false);
      //   setAlertInfo(null);
      // }, 15000);
    } catch (error) {
      setError(error.message);
    }
  };
  let output;

  if (!orderCompleted && !error) {
    output = (
      <Modal onClose={props.onClose}>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            address: "",
          }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            lastName: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
            address: Yup.string()
              .max(100, "Must be 100 characters or less")
              .required("Required"),
          })}
          onSubmit={(values) => {
            placeOrderHandler(values);
            console.log(values);
          }}
        >
          <Form className={classes.form}>
            <FormikInput label="First Name" name="firstName" type="text" />

            <FormikInput label="Last Name" name="lastName" type="text" />

            <FormikInput label="Address" name="address" type="text" />
            <div className={classes.actions}>
              <button type="button" onClick={props.onCancel}>
                Cancel
              </button>
              <button type="submit" className={classes.submit}>
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </Modal>
    );
  }
  if (error) {
    output = <p>An Error Has occured</p>;
  }
  if (orderCompleted) {
    output = (
      <>
        {/* <p>Order Completed</p> */}
        {showAlert && (
          <SubmissionAlert info={alertInfo} closeAlert={closeAlert}>
            <div className={classes.actions}>
              <button className={classes.submit} onClick={closeAlert}>
                Return to menu
              </button>
            </div>
          </SubmissionAlert>
        )}
      </>
    );
  }

  return output;
}

export default OrderForm;
