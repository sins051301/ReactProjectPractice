import { useParams } from "react-router-dom";
import EventItem from "../src/components/EventItem";
import {useFetch} from "../hooks/useFetch";
import { H1 } from "../Css/BasicDesign";


function EventDetailPage() {
  
  const params = useParams();

  const initialEvent = { link: `events/${params.id}`, data: "event" };

  const { error, isLoading, data } = useFetch(initialEvent, []);
  if (isLoading) {
    return <p>loading....</p>;
  }
  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <H1>{data.title}</H1>
          <p>
            <EventItem event={data}></EventItem>
          </p>
        </>
      )}
    </>
  );
}
export default EventDetailPage;
