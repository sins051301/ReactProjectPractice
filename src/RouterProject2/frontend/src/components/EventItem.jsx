import classes from "./EventItem.module.css";
import { Link } from "react-router-dom";
import { useSend } from "../../hooks/useSend";
import { useNavigate } from "react-router-dom";
function EventItem({ event }) {
  const navigate = useNavigate();
  const { sendEvent } = useSend({ link: `events/${event.id}` }, [], {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  function startDeleteHandler() {
    sendEvent();
    navigate("..");
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to={`/events/${event.id}/edit`}>Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
