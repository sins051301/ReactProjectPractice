import EventsList from "../src/components/EventsList";
import { useFetch } from "../hooks/useFetch";
const initialEvent = { link: "events", data: "events" };
function EventsPages() {
  const { error, isLoading, data } = useFetch(initialEvent, []);

  if (isLoading) {
    return <p>loading....</p>;
  }

  return (
    <>
      {error ? <p>{error}</p> : <EventsList events={data || []}></EventsList>}
    </>
  );
}

export default EventsPages;
