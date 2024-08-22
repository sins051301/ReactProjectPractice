import { useEffect } from "react";

function Practice() {
  const response = new Response("hello", {
    status: 500,
    headers: { "Content-Type": "text/plain" },
  });

  async function fetch() {
    const responseData = await response.text();
    console.log(response.status);
    console.log(response.headers);
    console.log(responseData);
  }
  useEffect(() => {
    fetch();
  }, []);
  return <></>;
}

export default Practice;
