import { useState } from "react";
import { sendHttpRequest } from "../http";

export function useSend(url, initialValue, blob) {
  const [data, setData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  async function sendEvent(data) {
  
    setIsLoading(true);
    console.log(data)
    try {
      const resData = await sendHttpRequest(url.link, { ...blob, body: data });
      setData(resData);
     
      console.log(resData);
    } catch (error) {
      setError(error.message || "something wrong..");
      console.log(error);
    }
    setIsLoading(false);
  }

  return { data, isLoading, error, sendEvent };
}
