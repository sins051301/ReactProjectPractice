import { Outlet } from "react-router-dom";
import EventsNavigation from "./EventsNavigation";
function EventLayout() {
  return (
    <>
      <EventsNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default EventLayout;
