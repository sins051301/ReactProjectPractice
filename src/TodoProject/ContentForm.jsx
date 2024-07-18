function ContentForm({ title, children }) {
  return (
    <>
      <h1>{title}</h1>
      <div>{children}</div>
    </>
  );
}
export default ContentForm;