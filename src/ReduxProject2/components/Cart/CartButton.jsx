import classes from "./CartButton.module.css";
import { useDispatch } from "react-redux";
import { displayAction } from "../store/Ui";
import { useSelector } from "react-redux";
function CartButton() {
  const items = useSelector((state) => state.cartItem.items);
  const totalAmount = items.reduce(
    (total, item) => (total += item.quantity),
    0
  );
  const dispatch = useDispatch();
  function toggleAction() {
    dispatch(displayAction.toggleDisplay());
  }
  return (
    <button className={classes.button} onClick={toggleAction}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalAmount}</span>
    </button>
  );
}

export default CartButton;
