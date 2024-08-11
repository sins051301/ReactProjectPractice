import { useContext } from "react";
import { MyMealContext } from "./store/Context";
import { currenyFormatter } from "./util/formatting";
import Button from "./UI/Button";
export default function MealItem({ meal }) {
  const { addItem } = useContext(MyMealContext);
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:4000/${meal.image}`} alt="meal-img" />
        <div>
          <h3> {meal.name}</h3>
          <p className="meal-item-price">
            {" "}
            {currenyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          {" "}
          <Button textOnly={false} onClick={() => addItem(meal)}>
            Add to cart
          </Button>
        </p>
      </article>
    </li>
  );
}
