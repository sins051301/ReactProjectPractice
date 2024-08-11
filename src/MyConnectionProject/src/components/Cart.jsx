import { useContext } from "react";
import { currenyFormatter } from "./util/formatting";
import { MyMealContext } from "./store/Context";
import Button from "./UI/Button";
import { userProgressContext } from "./store/UserProgressContext";
import Modal from "./Modal";
import CartItem from "./CartItem";
function Cart() {
  const { myMeal, deleteItem, addItem } = useContext(MyMealContext);
  const cartTotal = myMeal.array.reduce(
    (total, item) => total + item.mine * item.price,
    0
  );
  const userProgressCtx = useContext(userProgressContext);

  function handleHideCart() {
    userProgressCtx.hideCart();
  }

  function handleCheckout() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleHideCart : null}
    >
      <h2>your cart</h2>
      <ul>
        {myMeal.array.map((meal) => (
          <CartItem
            name={meal.name}
            price={meal.price}
            mine={meal.mine}
            key={meal.id}
            decreaseItem={() => deleteItem(meal)}
            increaseItem={() => addItem(meal)}
          ></CartItem>
        ))}
      </ul>
      <p className="cart-total">{currenyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        {" "}
        <Button textOnly onClick={handleHideCart}>
          Close
        </Button>
        {myMeal.array.length > 0 ? (
          <Button onClick={handleCheckout}>go to Checkout</Button>
        ) : null}
      </p>
    </Modal>
  );
}

export default Cart;
