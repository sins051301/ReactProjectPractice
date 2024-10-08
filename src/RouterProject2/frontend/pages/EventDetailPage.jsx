import { useParams } from "react-router-dom";
import EventItem from "../src/components/EventItem";
import { useHttp } from "../hooks/useHttp";
import { H1 } from "../Css/BasicDesign";
import { useMemo } from "react";

function EventDetailPage() {
  const params = useParams();

  const initialEvent = useMemo(
    () => ({ link: `events/${params.id}`, data: "event" }),
    [params.id]
  );

  const { error, isLoading, data } = useHttp(initialEvent, []);

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
