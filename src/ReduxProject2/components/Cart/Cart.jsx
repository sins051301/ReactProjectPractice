import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
function Cart() {
  const cartItems = useSelector((state) => state.cartItem.items);
  const totalAmount = cartItems.reduce(
    (total, item) => (total += item.price * item.quantity),
    0
  );
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart </h2>
      <h1>total: {totalAmount}$ </h1>
      <ul>
        <li>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              title={item.name}
              quantity={item.quantity}
              price={item.price}
            />
          ))}
        </li>
      </ul>
    </Card>
  );
}

export default Cart;
