import { useState, useEffect } from "react";
import { sendHttpRequest } from "../http";

export function useFetch(url, initialValue) {
  const [data, setData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    async function getEvent() {
      setIsLoading(true);

      try {
        const resData = await sendHttpRequest(url.link);
        setData(resData[url.data]);
        console.log(resData[url.data]);
      } catch (error) {
        setError(error.message || "something wrong..");
        console.log(error);
      }
      setIsLoading(false);
    }
    getEvent();
    console.log(data);
  }, []);
  return { data, isLoading, error };
}
