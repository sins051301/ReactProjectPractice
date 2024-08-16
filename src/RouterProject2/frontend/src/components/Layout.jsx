import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";
//자녀 라우트 컴포넌트가 어디에 있는지 정의해 주어야 함
function Layout() {
  return (
    <>
      <MainNavigation />
      {/* 여기 위치가 자녀 라우트를 랜더링하는 곳 */}
      <main>
        {" "}
        <Outlet />
      </main>
    </>
  );
}
export default Layout;
