import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { ItemActions } from "../store/CartItem";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function ProductItem({ title, price, description }) {
  const dispatch = useDispatch();
  function handleAddcart({ title, price }) {
    dispatch(ItemActions.increment({ name: title, price: price }));
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={() => handleAddcart({ title, price })}>
            Add to Cart
          </button>
        </div>
      </Card>
    </li>
  );
}

export default ProductItem;
