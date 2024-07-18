function DialogComponent({ text, setDisplay }) {
  return (
    <form method="dialog" onSubmit={setDisplay}>
      <button>{text}</button>
    </form>
  );
}
export default DialogComponent;
