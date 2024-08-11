export default function Input({ id, label, error, ...props }) {
  return (
    <p className="control">
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} name={id} {...props} required />
      {error && <p>{error}</p>}
    </p>
  );
}
