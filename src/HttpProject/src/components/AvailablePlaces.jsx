import Places from "./Places.jsx";
import { useState, useEffect } from "react";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";
export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailableplaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        //await 해야함
        const places = await fetchAvailablePlaces();
        //프로미스를 반환하지 않음
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
        
          setAvailableplaces(sortedPlaces);
          setIsLoading(false);
        });
        //setAvailableplaces(places);
        //fetch도 실패한 경우 네트워크 에러
      } catch (error) {
        
        setError({ message: error.message || "cant fetch" });
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (error) {
    return <Error title="An error occured!" message={error.message}></Error>;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      loadingText={"loading..."}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
