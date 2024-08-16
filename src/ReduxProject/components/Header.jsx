import classes from "./Header.module.css";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { useSelector } from "react-redux";

function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  function UserLogout(event) {
    event.preventDefault();
    dispatch(authActions.logout());
  }
  return (
    <header className={classes.header}>
      {isAuthenticated && (
        <nav>
          <ul>
            <li>
              <a href="/">My Products</a>
            </li>
            <li>
              <a href="/">My Sales</a>
            </li>
            <li>
              <button onClick={(event) => UserLogout(event)}>Logout</button>
            </li>
          </ul>
        </nav>
      )}
      <h1>Redux Auth</h1>
    </header>
  );
}

export default Header;
