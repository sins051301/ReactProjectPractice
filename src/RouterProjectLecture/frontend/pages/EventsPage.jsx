import EventsList from "../src/components/EventsList";
import { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";
function EventsPages() {
  const { events } = useLoaderData();

  return (
    //suspense를 통해 fallback상태에 보여지는 컴포너트 설정
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      {/* Await를 통해 받아들이는 event를 설정하고 받은 이벤트로 랜더링 하게끔 만듬 */}
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents}></EventsList>}
      </Await>
    </Suspense>
  );
}

export default EventsPages;

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

export function loader() {
  return defer({
    events: loadEvents(),
  });
}
