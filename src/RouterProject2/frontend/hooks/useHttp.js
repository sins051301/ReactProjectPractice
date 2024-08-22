import { useState } from "react";
import { sendHttpRequest } from "../http";
import { useCallback } from "react";
import { useEffect } from "react";

export function useHttp(url, initialValue, blob) {
  const [data, setData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendEvent = useCallback(
    async function sendEvent(data) {
      setIsLoading(true);

      try {
        const resData = await sendHttpRequest(url.link, {
          ...blob,
          body: data,
        });
        if(url.data)
          setData(resData[url.data]);
        else
          setData(resData);
      } catch (error) {
        setError(error.message || "something wrong..");
      }
      setIsLoading(false);
    },
    [url, blob]
  );

  useEffect(() => {
    if ((blob && blob.method === "GET") || !blob) {
      sendEvent();
    }
  }, [sendEvent, blob]);

  return { data, isLoading, error, sendEvent };
}
