import Counter from "./components/Counter";
import { Fragment } from "react";
import Header from "./components/Header";
import Auth from "./components/Auth";
import { useSelector } from "react-redux";
import UserProfile from "./components/UserProfile";

function Redux1() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Fragment>
      <Header></Header>
      {isAuthenticated && (
        <>
          <UserProfile></UserProfile>
        </>
      )}
      {!isAuthenticated && (
        <>
          {" "}
          <Auth />
          <Counter />
        </>
      )}
    </Fragment>
  );
}

export default Redux1;
