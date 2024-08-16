import { useParams } from "react-router-dom";
import EventItem from "../src/components/EventItem";

function EventDetailPage() {
  const params = useParams();

  return (
    <>
      <h1>items</h1>
      <p>{params.id}</p>
      <EventItem></EventItem>
    </>
  );
}
export default EventDetailPage;
