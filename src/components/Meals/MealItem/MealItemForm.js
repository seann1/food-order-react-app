import { useRef, useState } from "react";

import Input from "../../UI/Input";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
  },

  bottomRightBox: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
}));

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const classes = useStyles();
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <>
      <form onSubmit={submitHandler} id={props.id}></form>
      <Box
        component="span"
        className={`${classes.bottomRightBox} ${classes.box}`}
      >
        <Input
          ref={amountInputRef}
          form={props.id}
          label="Amount"
          input={{
            id: "amount_" + props.id,
            type: "number",
            min: "1",
            max: "5",
            step: "1",
            defaultValue: "1",
          }}
        />
      </Box>
      <Box
        component="span"
        className={`${classes.bottomRightBox} ${classes.box}`}
      >
        <Button variant="contained" type="submit" form={props.id}>
          + Add
        </Button>
      </Box>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </>
  );
};
export default MealItemForm;
