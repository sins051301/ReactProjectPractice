import { useState } from "react";
import { useEffect } from "react";
export function useForm(initialValue, event, params) {
  const [initialform, setinitialform] = useState({
    title: initialValue.title,
    image: initialValue.image,
    date: initialValue.date,
    description: initialValue.description,
  });
  const [link, setLink] = useState("events");
  useEffect(() => {
    if (event) {
      setinitialform(event);
      setLink((prev)=> prev + `/${params}`);
    }
  }, [event, params]);

  function onChange(event, id) {
    setinitialform((prev) => {
      return {
        ...prev,
        [id]: event.target.value,
      };
    });
  }
  return {onChange, initialform, link};
}
