import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Layout from "./components/Layout";
import EventsPages from "../pages/EventsPage";
import EventDetailPage from "../pages/EventDetailPage";
import EventLayout from "../layout/EventLayout";
import NewEventPage from "../pages/NewEventPage";
import EditEventPage from "../pages/EditEventPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/events",
        element: <EventLayout />,
        children: [
          {
            path: "/events",
            element: <EventsPages />,
          },
          {
            path: "/events/:id",
            element: <EventDetailPage />,
          },
          {
            path: "/events/:id/edit",
            element: <EditEventPage />,
          },
          {
            path: "/events/new",
            element: <NewEventPage />,
          },
        ],
      },
    ],
  },
]);

function Router2() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default Router2;
