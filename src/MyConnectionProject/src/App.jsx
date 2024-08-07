import { fetchUserMeals } from "./http";
import { useEffect, useState } from "react";
import Errors from "./components/Error";
import Selection from "./components/Selection";
import Header from "./components/Header";
import { EmailContext, MyMealContext } from "./components/store/Context";

function ProjectApp() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [myMeal, setMyMeal] = useState({ array: [], sum: 0, num: 0 });

  const [form, setForm] = useState({
    name: "",
    email: "",
    street: "",
    postalCode: "",
    city: "",
  });

  useEffect(() => {
    async function fetchMeals() {
      setIsLoading(true);
      try {
        const Meals = await fetchUserMeals();
        setMeals(Meals);
        console.log(Meals);
      } catch (error) {
        setError({ message: error || "meal fetch error" });
      }
      setIsLoading(false);
    }
    fetchMeals();
  }, []);

  function handleError() {
    setError(null);
  }

  const ctxValue = {
    name: form.name,
    email: form.email,
    street: form.street,
    postalCode: form.postalCode,
    city: form.city,
    setForm,
  };

  const mealCtxValue = {
    myMeal: myMeal,
    setMyMeal,
  };

  if (error) {
    <Errors
      title="An error occured!"
      message={error.message}
      onConfirm={handleError}
    ></Errors>;
  }

  return (
    <EmailContext.Provider value={ctxValue}>
      <MyMealContext.Provider value={mealCtxValue}>
        <Header total={myMeal.num || 0}></Header>
        <body>
          <Selection meals={meals} isLoading={isLoading}></Selection>
        </body>
      </MyMealContext.Provider>
    </EmailContext.Provider>
  );
}

export default ProjectApp;
