import { useRef, useContext, useEffect } from "react";

import Form from "./Form";
import { MyMealContext } from "./store/Context";
import { caculMeal } from "./util/mealHandle";
import FormBasic from "./FormBasic";
function Modal() {
  const { myMeal, setMyMeal } = useContext(MyMealContext);
  const modal = useRef();
  const form = useRef();
  useEffect(() => {
    modal.current.open();
  }, []);
  return (
    <>
      <Form ref={form}></Form>
      <FormBasic ref={modal} css={'cart'}>
        <h2>your cart</h2>
        <ul>
          {myMeal.array.map((meal) => (
            <li className="cart-item">
              {meal.name}-{meal.mine}x ${meal.price}
              <div className="cart-item-actions">
                <button onClick={() => caculMeal(meal, "-", myMeal, setMyMeal)}>
                  -
                </button>
                {meal.mine}
                <button onClick={() => caculMeal(meal, "+", myMeal, setMyMeal)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="cart-total">{myMeal.sum}$</div>

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
      </FormBasic>
    </>
  );
}

export default Modal;
