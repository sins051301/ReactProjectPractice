import LogoImg from "../assets/logo.jpg";
import { useContext } from "react";
import { MyMealContext } from "./store/Context";
import { userProgressContext } from "./store/UserProgressContext";
import Button from "./UI/Button";
function Header() {
  const { myMeal } = useContext(MyMealContext);
  const userProgressCtx = useContext(userProgressContext);

  function handleShowCart() {
    userProgressCtx.showCart();
  }
  const total = myMeal.array.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.mine;
  }, 0);

  return (
    <div id="main-header">
      <div id="title">
        {" "}
        <img src={LogoImg} alt="title-img" />
        <h1>REATFOOD</h1>
      </div>

      <Button textOnly onClick={handleShowCart}>
        Cart({total || 0})
      </Button>
    </div>
  );
}
export default Header;
