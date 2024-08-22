import EventForm from "../src/components/EventForm";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { useHttp } from "../hooks/useHttp";
import Loading from "../src/components/Loading";
function EditEventPage() {
  const params = useParams();
  const initialEvent = useMemo(
    () => ({ link: `events/${params.id}`, data: "event" }),
    [params.id]
  );
  const { error, isLoading, data } = useHttp(initialEvent, []);
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : (
        <EventForm method={"PATCH"} event={data}></EventForm>
      )}
    </>
  );
}
export default EditEventPage;
