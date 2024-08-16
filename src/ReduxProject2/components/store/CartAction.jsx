import { displayAction } from "./Ui";
import { ItemActions } from "./CartItem";
//액션 생성자 thunk의 사용 -> dispatch인자를 제공해 준다.

export function getCartData() {
  return async (dispatch) => {
    async function fetchData() {
      const response = await fetch(
        "https://practice-40a9d-c925a.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        dispatch(
          displayAction.setNotification({
            status: "success",
            title: "Success!",
            message: "Getting cart data!",
          })
        );
      }
      return await response.json();
      //console.log(responseData);
    }
    try {
      const responseData = await fetchData();
      dispatch(ItemActions.setting(responseData));
      dispatch(
        displayAction.setNotification({
          status: "success",
          title: "Success!",
          message: "Getting cart data!",
        })
      );
    } catch (error) {
      dispatch(
        displayAction.setNotification({
          status: "error",
          title: "Error!",
          message: "Fetch cart data failed..",
        })
      );
    }
  };
}

export function sendCartData(cart) {
  return async (dispatch) => {
    dispatch(
      displayAction.setNotification({
        status: "pending",
        title: "Sending..",
        message: "Sending cart data",
      })
    );
    async function sendRequest() {
      const response = await fetch(
        "https://practice-40a9d-c925a.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        dispatch(
          displayAction.setNotification({
            status: "error",
            title: "Error!",
            message: "Sending cart data failed..",
          })
        );
        throw new Error("sending cart data error");
      }
      dispatch(
        displayAction.setNotification({
          status: "success",
          title: "Success!",
          message: "Sending cart data!",
        })
      );

      const responseData = await response.json();
    }
    try {
      await sendRequest();
      dispatch(
        displayAction.setNotification({
          status: "success",
          title: "Success!",
          message: "Sending cart data!",
        })
      );
    } catch (error) {
      dispatch(
        displayAction.setNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed..",
        })
      );
    }
  };
}
