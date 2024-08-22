import EventsList from "../src/components/EventsList";
import { useHttp } from "../hooks/useHttp";
import Loading from "../src/components/Loading";
const initialEvent = { link: "events", data: "events" };
function EventsPages() {
  const { error, isLoading, data } = useHttp(initialEvent, []);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <>
      {error ? <p>{error}</p> : <EventsList events={data || []}></EventsList>}
    </>
  );
}

export default EventsPages;
