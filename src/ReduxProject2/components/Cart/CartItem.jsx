import classes from "./CartItem.module.css";
import { ItemActions } from "../store/CartItem";
import { useDispatch } from "react-redux";

function CartItem({ title, quantity, price }) {
  const dispatch = useDispatch();
  const total = quantity * price;
  function handleIncrease({ title, price }) {
    dispatch(ItemActions.increment({ name: title, price: price }));
  }
  function handleDecrease({ title, price }) {
    dispatch(ItemActions.decrement({ name: title, price: price }));
  }
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={() => handleDecrease({ title, price })}>-</button>
          <button onClick={() => handleIncrease({ title, price })}>+</button>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
