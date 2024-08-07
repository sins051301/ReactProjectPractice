import { addMeal } from "./util/mealHandle";
import { useContext } from "react";
import { MyMealContext } from "./store/Context";
function Selection({ meals, isLoading }) {
  const { myMeal, setMyMeal } = useContext(MyMealContext);
  return (
    <div id="meals">
      {isLoading && <p>loading...</p>}
      {!isLoading &&
        meals.map((meal) => (
          <div key={meal.name}>
            <div className="meal-item">
              <img src={`http://localhost:4000/${meal.image}`} alt="meal-img" />
              <h3> {meal.name}</h3>
              <div className="meal-item-price"> {meal.price}</div>
              <article>
                <div className="meal-item-description">{meal.description}</div>

                <button onClick={() => addMeal(meal, myMeal, setMyMeal)}>
                  Add to cart
                </button>
              </article>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Selection;
