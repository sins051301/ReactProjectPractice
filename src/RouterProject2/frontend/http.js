export async function fetchData() {
    const response = fetch('http://localhost:8080/events');
    const resData = await response.json();
    if(!response.ok){
        throw new Error("respone error");
    }
    return resData;
}
