// import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li>
      <div>
        <h2>{props.name}</h2>
        <h3>{props.restaurantName}</h3>
        <div>
          <span>{price}</span>
          <span>x {props.amount}</span>
        </div>
      </div>
      <div>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
