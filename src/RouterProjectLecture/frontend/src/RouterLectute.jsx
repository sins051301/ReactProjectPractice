import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Layout from "./components/Layout";
import EventsPages, { loader as eventsLoader } from "../pages/EventsPage";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "../pages/EventDetailPage";
import EventLayout from "../pages/EventLayout";
import NewEventPage from "../pages/NewEventPage";
import { action as newEventAction } from "./components/EventForm";
import EditEventPage from "../pages/EditEventPage";
import ErrorPage from "../pages/ErrorPage";
import NewsLetterPage, {
  action as newsletterAction,
} from "../pages/NewsLetter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "events",
        element: <EventLayout />,
        children: [
          {
            index: true,
            element: <EventsPages />,
            loader: eventsLoader,
          },
          {
            path: ":eventId",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: newEventAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: newEventAction,
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsLetterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function RouterLecture() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default RouterLecture;
