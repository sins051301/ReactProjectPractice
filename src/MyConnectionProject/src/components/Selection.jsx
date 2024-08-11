import MealItem from "./MealItem";
import useHttp from "./hooks/useHttp";
import Errors from "./Errors";
const requestConfig = {};
///따라서 바깥에 만들어 주어 컴포넌트의 함수의 랜더링으로 인한 객체 재생성을 막아준다.
function Selection() {
  //초기 객체는 컴포넌트 함수에서 생성됨으로 의존성 배열의 변화가 생기게 됨
  const {
    data: meals,
    isLoading,
    error,
  } = useHttp("http://localhost:4000/meals", requestConfig, []);
  if (isLoading) {
    return <p className="center">loading...</p>;
  }
  if (error) {
    return <Errors title={"Failed to fetch meals"} message={error}></Errors>;
  }
  return (
    <ul id="meals">
      {meals.map((meal) => (
        <MealItem meal={meal} key={meal.id}></MealItem>
      ))}
    </ul>
  );
}

export default Selection;
