import { Outlet, useNavigation } from "react-router-dom";
import MainNavigation from "./MainNavigation";

function Layout() {
  const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      <main>
        {navigation.state === "loading" && <p>Loading...</p>}
        <Outlet />
      </main>
    </>
  );
}
export default Layout;
