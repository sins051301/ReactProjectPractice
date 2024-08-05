import { fetchUserMeals } from "./http";
import { useEffect, useState } from "react";
import Errors from "./components/Error";
import Selection from "./components/Selection";
import Header from "./components/Header";
import Modal from "./components/Modal";

function ProjectApp() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [myMeal, setMyMeal] = useState({ array: [], sum: 0, num: 0 });

  function addMeal(meal) {
    const target = myMeal.array.find((element) => meal.name === element.name);

    if (target) {
      setMyMeal((prevMeal) => {
        return {
          array: [
            ...prevMeal.array.map((item) =>
              item === target
                ? {
                    ...item,
                    mine: item.mine + 1,
                  }
                : item
            ),
          ],
          sum: (Number(prevMeal.sum) + Number(meal.price)).toFixed(2),
          num: prevMeal.num + 1,
        };
      });
    } else {
      setMyMeal((prevMeal) => {
        return {
          array: [
            ...prevMeal.array,
            { name: meal.name, price: meal.price, mine: 1 },
          ],

          sum: (Number(prevMeal.sum) + Number(meal.price)).toFixed(2),
          num: prevMeal.num + 1,
        };
      });
    }

    console.log(myMeal);
  }

  function caculMeal(meal, identifier) {
    const target = myMeal.array.find((element) => meal.name === element.name);
    if (identifier === "+") {
      setMyMeal((prevMeal) => {
        return {
          array: [
            ...prevMeal.array.map((item) =>
              item === target
                ? {
                    ...item,
                    mine: item.mine + 1,
                  }
                : item
            ),
          ],
          sum: (Number(prevMeal.sum) + Number(meal.price)).toFixed(2),
          num: prevMeal.num + 1,
        };
      });
    } else {
      setMyMeal((prevMeal) => {
        return {
          array: [
            ...prevMeal.array.map((item) =>
              item === target
                ? {
                    ...item,
                    mine: item.mine - 1,
                  }
                : item
            ),
          ],
          sum: (Number(prevMeal.sum) - Number(meal.price)).toFixed(2),
          num: prevMeal.num - 1,
        };
      });
      setMyMeal((prevMeal) => {
        return {
          ...prevMeal,
          array: prevMeal.array.filter((item) => item.mine !== 0),
        };
      });
    }
  }

  useEffect(() => {
    async function fetchMeals() {
      setIsLoading(true);
      try {
        const Meals = await fetchUserMeals();
        setMeals(Meals);
        console.log(Meals);
      } catch (error) {
        console.log({ error: error || "meal fetch error" });
        setError({ message: error });
      }
      setIsLoading(false);
    }
    fetchMeals();
  }, []);

  function handleError() {
    setError(null);
  }

  if (error) {
    <Errors
      title="An error occured!"
      message={error.message}
      onConfirm={handleError}
    ></Errors>;
  }

  return (
    <>
      <Header
        total={myMeal.num || 0}
        meals={myMeal}
        caculMeal={caculMeal}
      ></Header>
      <Selection
        meals={meals}
        isLoading={isLoading}
        addMeal={addMeal}
      ></Selection>
    </>
  );
}

export default ProjectApp;
