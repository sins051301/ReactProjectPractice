export default function Input({ id, label, error, ...props }) {
  return (
    <div className="control">
      <label htmlFor="name">{label}</label>
      <input type="text" id={id} {...props} required />
      {error && <p>{error}</p>}
    </div>
  );
}
