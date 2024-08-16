import { useEffect, useState } from "react";
import EventsList from "../src/components/EventsList";
import { fetchData } from "../http";
function EventsPages() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    async function getEvent() {
      setIsLoading(true);
 
      try {
        const resData = await fetchData();
        setData(resData.events);
      } catch (error) {
        setError(error.message || "something wrong..");
        console.log(error);
      }
      setIsLoading(false);
    }
    getEvent();
    console.log(data);
  }, []);
  if (isLoading) {
    return <p>loading....</p>;
  }

  return (
    <>
      {error ? (
        <p>error!!!!!!!!!!!!!!!!!!!!</p>
      ) : (
        <EventsList events={data}></EventsList>
      )}
    </>
  );
}

export default EventsPages;
