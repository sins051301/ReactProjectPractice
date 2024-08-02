import { useEffect, useState } from "react";

//커스텀 훅 이름은 use로 시작해야 함 (use로 시작하는 것은 hook으로 인식)
//최대한 일반적인 사용이 가능하게 만들어줌
export default function useFetch(fetchFn, initialValue) {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({ error: error.message || "Failed to fetch data" });
      }
      setIsLoading(false);
    }
    fetchData();
  }, [fetchFn]);
  //외부의 값 의존성
  return {
    isLoading,
    fetchedData,
    setFetchedData,
    error,
  };
}
