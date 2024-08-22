import { useEffect } from "react";
import classes from "./NewsLetterSignup.module.css";
import { useFetcher } from "react-router-dom";
function NewsLetterSignup() {
    // 공통된 컴포넌트가 있겅나 같은 페이지에서 여러번 사용되는 
    // 컴포넌트가 있을 경우에 데이터 받을 경우 유용함
      const fetcher = useFetcher();
  const { data, state } = fetcher;
  useEffect(() => {
    if (state === "idle" && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);
  return (
    //다른 라우트로의 이동을 막아준다.
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsLetterSignup;
