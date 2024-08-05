import { useRef, useImperativeHandle, forwardRef } from "react";
import { createPortal } from "react-dom";
import Form from "./Form";
const Modal = forwardRef(function Modal({ meals, caculMeal }, ref) {
  const modal = useRef();
  const form = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        modal.current.showModal();
      },
      close() {
        modal.current.close();
      },
    };
  });
  return createPortal(
    <>
      {" "}
      <Form ref={form}></Form>
      <dialog ref={modal} className="cart">
        <h2>your cart</h2>
        <ul>
          {meals.array.map((meal) => (
            <li className="cart-item">
              {meal.name}-{meal.mine}x ${meal.price}
              <div className="cart-item-actions">
                <button onClick={() => caculMeal(meal, "-")}>-</button>
                {meal.mine}
                <button onClick={() => caculMeal(meal, "+")}>+</button>
              </div>
            </li>
          ))}
        </ul>
        <div className="cart-total">{meals.sum}$</div>

        <button
          onClick={() => {
            modal.current.close();
          }}
        >
          Close
        </button>
        <button
          onClick={() => {
            modal.current.close();
            form.current.open();
          }}
        >
          go to Checkout
        </button>
      </dialog>
    </>,
    document.getElementById("modal")
  );
});

export default Modal;
