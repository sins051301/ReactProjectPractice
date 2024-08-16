import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
  return (
    <>
      <main>
        <MainNavigation></MainNavigation>
        <h1>An error occurede!</h1>
        <p>Could not find this page!</p>
      </main>
    </>
  );
}

export default ErrorPage;
