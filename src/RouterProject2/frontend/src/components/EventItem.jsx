import classes from "./EventItem.module.css";
import { Link } from "react-router-dom";
import { useHttp } from "../../hooks/useHttp";
import { useNavigate } from "react-router-dom";
function EventItem({ event }) {
  const navigate = useNavigate();
  const { sendEvent } = useHttp({ link: `events/${event.id}` }, [], {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  //event.preventDefault가 필요없음 -> 삭제되서 새로고침이 일어나지 않음
  async function startDeleteHandler() {
    await sendEvent();
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
