import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./EventForm.module.css";
import { useDispatch } from "react-redux";
import { FormAction } from "../../store/form";
import { useSend } from "../../hooks/useSend";
import { useEffect } from "react";

function EventForm({ method, event }) {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.FormItem);
  const navigate = useNavigate();
  console.log(method);
  const { sendEvent, error } = useSend({ link: "events" }, [], {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });
  function cancelHandler() {
    navigate("..");
  }

  function handleForm(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    data.id = Math.random() * 1000;
    //dispatch(FormAction.setForm(data));
    //console.log(data);

    sendEvent(JSON.stringify(data)); 
  }

  return (
    <form className={classes.form} onSubmit={handleForm}>
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required />
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
