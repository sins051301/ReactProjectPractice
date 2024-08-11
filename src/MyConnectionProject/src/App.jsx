import { fetchUserMeals } from "./http";
import { useEffect, useState } from "react";
import Errors from "./components/Errors";
import Selection from "./components/Selection";
import Header from "./components/Header";
import Cart from "./components/Cart";
import { EmailContextProvider } from "./components/store/Context";
import Checkout from "./components/Checkout";
import { UserProgressContextProvider } from "./components/store/UserProgressContext";
import {
  EmailContext,
  MyMealContextProvider,
} from "./components/store/Context";

function ProjectApp() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

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

  if (error) {
    <Errors
      title="An error occured!"
      message={error.message}
      onConfirm={handleError}
    ></Errors>;
  }

  return (
    <EmailContextProvider>
      <UserProgressContextProvider>
        <MyMealContextProvider>
          <Header></Header>
          <Selection meals={meals} isLoading={isLoading}></Selection>
          <Cart />
          <Checkout />
        </MyMealContextProvider>
      </UserProgressContextProvider>
    </EmailContextProvider>
  );
}

export default ProjectApp;
