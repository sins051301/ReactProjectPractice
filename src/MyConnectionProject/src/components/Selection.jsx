function Selection({ meals, isLoading, addMeal }) {
  return (
    <>
      {isLoading && <p>loading...</p>}
      {!isLoading &&
        meals.map((meal) => (
          <div key={meal.name} id="meals">
            <div className="meal-item">
              <img src={`http://localhost:4000/${meal.image}`} alt="meal-img" />
              <h3> {meal.name}</h3>
              <div className="meal-item-price"> {meal.price}</div>
              <div className="meal-item-description">{meal.description}</div>

              <article>
                {" "}
                <button onClick={() => addMeal(meal)}>Add to cart</button>
              </article>
            </div>
          </div>
        ))}
    </>
  );
}

export default Selection;
