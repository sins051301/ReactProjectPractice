import { Fragment } from "react";
import MainHeader from "./MainHeader";

function Layout({ children }) {
  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
    </Fragment>
  );
}

export default Layout;
