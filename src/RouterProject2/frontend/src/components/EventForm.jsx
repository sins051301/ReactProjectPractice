import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./EventForm.module.css";
import { useDispatch } from "react-redux";
import { FormAction } from "../../store/form";
import { useHttp } from "../../hooks/useHttp";
import { useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
function EventForm({ method, event }) {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useSelector((state) => state.FormItem);

  const { onChange, initialform, link } = useForm(
    {
      title: form.title,
      image: form.image,
      date: form.date,
      description: form.description,
    },
    event,
    params.id
  );

  const { sendEvent, error } = useHttp({ link: link }, [], {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  function cancelHandler() {
    dispatch(FormAction.setForm(initialform));
    navigate("..");
  }

  async function handleForm(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    data.id = Math.random() * 1000;

    await sendEvent(JSON.stringify(data));
    navigate("..");
  }

  return (
    <form className={classes.form} onSubmit={handleForm}>
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={initialform.title}
          onChange={(event) => onChange(event, "title")}
          required
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          value={initialform.image}
          onChange={(event) => onChange(event, "image")}
          required
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={initialform.date}
          onChange={(event) => onChange(event, "date")}
          required
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          value={initialform.description}
          onChange={(event) => onChange(event, "description")}
          required
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button type="submit">Save</button>
      </div>
    </form>
  );
}

export default EventForm;
