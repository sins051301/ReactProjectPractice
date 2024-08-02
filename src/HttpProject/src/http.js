export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:4000/places");
  const resData = await response.json();
  //에러 응답인 경우
  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }
  return resData.places;
}


export async function fetchUserPlaces() {
  const response = await fetch("http://localhost:4000/user-places");
  const resData = await response.json();
  //에러 응답인 경우
  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }
  return resData.places;
}

//벡엔드가 특정 종류의 요청과 정확히 원하는 데이터만 받음
export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:4000/user-places", {
    //자바의 배열은 첨부할 수 있는 형식이 아님
    method: "PUT",
    body: JSON.stringify({ places }),
    //요청에 첨부될 데이터가 json형식이라고 알려줘야함
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();
  if (!response.ok) {

    throw new Error("Failed to update user data.");
  }
  return resData.message;
}
