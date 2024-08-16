import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useDispatch, useSelector } from "react-redux";
import { displayAction } from "./components/store/Ui";
import { useEffect } from "react";
import Notification from "./components/UI/Notification";
import { sendCartData } from "./components/store/CartAction";
import { getCartData } from "./components/store/CartAction";
let isInitial = true;

function Redux2() {
  const dispatch = useDispatch();
  function setOff() {
    dispatch(displayAction.offDisplay());
  }
  const show = useSelector((state) => state.visible.show);
  const cartItems = useSelector((state) => state.cartItem.items);
  const changed = useSelector((state) => state.cartItem.changed);
  const notification = useSelector((state) => state.visible.notification);
  useEffect(() => {
    dispatch(getCartData());
  }, []);
  
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if(changed)
      dispatch(sendCartData(cartItems));
  }, [cartItems, dispatch]);

  if (cartItems.length === 0) setOff();
  return (
    <>
      {notification && (
        <Notification
          status={notification.state}
          title={notification.title}
          message={notification.message}
        ></Notification>
      )}
      <Layout>
        {show && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default Redux2;
