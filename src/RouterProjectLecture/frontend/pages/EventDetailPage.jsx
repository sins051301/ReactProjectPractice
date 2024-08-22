import EventItem from "../src/components/EventItem";
import { Suspense } from "react";
import {
  json,
  redirect,
  useRouteLoaderData,
  Await,
  defer,
} from "react-router-dom";
import EventsList from "../src/components/EventsList";
function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail");
  //console.log(data);
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent}></EventItem>}
        </Await>
      </Suspense>

      <Suspense fallback={<p style={{ textAlign: "center" }}>loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents}></EventsList>}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch(`http://localhost:8080/events/` + id);
  if (!response.ok) {
    throw json(
      { msessage: "Could not fetch details for selected event." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}
async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    console.log(
      json(
        { message: "Could not fetch events" },
        {
          status: 500,
        }
      )
    );
    throw json(
      { message: "Could not fetch events" },
      {
        status: 500,
      }
    );
  } else {
    //defer를 거치기 때문에 직접 변환 시켜서 반환해야함
    //JSON 본문을 자바스크립트 객체로 변환
    const resData = await response.json();
    return resData.events;
  }
}

//요청 객체와 parmas를 포함하고 있음
export async function loader({ request, params }) {
  const id = params.eventId;
  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
}

export async function action({ request, params }) {
  const Id = params.eventId;
  const response = await fetch(`http://localhost:8080/events/` + Id, {
    method: request.method,
  });
  if (!response.ok) {
    throw json(
      { msessage: "Could not fetch details for selected event." },
      {
        status: 500,
      }
    );
  } else {
    return redirect("/events");
  }
}
