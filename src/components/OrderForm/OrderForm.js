import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import PlacesAutoComplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import FormikInput from "../UI/FormikInput";
import Modal from "../UI/Modal";
import classes from "./OrderForm.module.css";

function OrderForm(props) {
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [error, setError] = useState("");

  const cartCtx = useContext(CartContext);

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
      const data = await response.json();
      cartCtx.resetCart();
      setOrderCompleted(true);
    } catch (error) {
      setError(error.message);
    }
  };
  let output;

  if (!orderCompleted && !error) {
    output = (
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          address: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
        })}
        onSubmit={(values) => {
          placeOrderHandler(values);
          console.log(values);
        }}
      >
        <Form className={classes.form}>
          <FormikInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Jane"
          />

          <FormikInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Doe"
          />

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
    );
  }
  if (error) {
    output = <p>An Error Has occured</p>;
  }
  if (orderCompleted) {
    output = (
      <>
        <p>Order Completed</p>
        <div className={classes.actions}>
          <button
            className={classes["button--alt"]}
            onClick={props.returnToMenu}
          >
            Return to menu
          </button>
        </div>
      </>
    );
  }

  return <Modal onClose={props.onClose}>{output}</Modal>;
}

export default OrderForm;
