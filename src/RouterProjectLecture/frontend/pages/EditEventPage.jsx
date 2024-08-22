import EventForm from "../src/components/EventForm";
import { useRouteLoaderData } from "react-router-dom";
function EditEventPage() {
  const data = useRouteLoaderData("event-detail");
  const event = data.event;

  return (
    <>
      <EventForm method={"PATCH"} event={event}></EventForm>
    </>
  );
}
export default EditEventPage;
