// export async function fetchData(url) {
//   //await 주의
//   const response = await fetch(`http://localhost:8080/${url}`);
//   const resData = await response.json();
//   if (!response.ok) {
//     throw new Error("respone error");
//   }
//   return resData;
// }

export async function sendHttpRequest(url, config) {
    //await 주의
   
    const response = await fetch(`http://localhost:8080/${url}`, config);
    console.log(response);
    const resData = await response.json();

    if (!response.ok) {
      throw new Error("respone error");
    }
    return resData;
}

  
// export async function SendData(data) {
//   const response = await fetch(`http://localhost:8080/`, {
//     method: "POST",
//     body: JSON.stringify({ data }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const resData = await response.json();
//   if (!response.ok) {
//     throw new Error("Failed to update user data.");
//   }
//   return resData.message;
// }
