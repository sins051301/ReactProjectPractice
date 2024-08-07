export async function fetchUserMeals() {
  const response = await fetch("http://localhost:4000/meals");
  const resData = await response.json();
  //에러 응답인 경우
  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }
  return resData;
}

export async function updateUserMeals(orderData) {
  const response = await fetch("http://localhost:4000/orders", {
    method: "POST",
    body: JSON.stringify({ order: orderData }),
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
