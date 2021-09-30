import { useContext } from "react";

import Badge from "@mui/material/Badge";
import CartContext from "../../store/cart-context";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const HeaderCartButton = (props) => {
  //const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  // const btnClasses = `${classes.button} ${
  //   btnIsHighlighted ? classes.bump : ""
  // }`;

  // useEffect(() => {
  //   if (items.length === 0) {
  //     return;
  //   }
  //   setBtnIsHighlighted(true);

  //   const timer = setTimeout(() => {
  //     setBtnIsHighlighted(false);
  //   }, 300);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [items]);

  return (
    <IconButton
      size="large"
      aria-label="Shopping cart"
      color="inherit"
      onClick={props.onClick}
    >
      <Badge badgeContent={numberOfCartItems} color="error">
        <ShoppingCartIcon color="disabled" />
      </Badge>
    </IconButton>
  );
};

export default HeaderCartButton;
