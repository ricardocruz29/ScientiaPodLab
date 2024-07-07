import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Error } from "../pages/error";
import { Layout } from "../pages/layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/resources",
        element: <div>Recursos Page</div>,
        children: [
          {
            path: "templates/:id",
            element: <div>Template page</div>,
          },
        ],
      },
      {
        path: "/podcasts",
        element: <div>Podcasts Page</div>,
        children: [
          {
            path: ":id",
            element: <div>Podcast id page</div>,
            children: [
              {
                path: "episode/record",
                element: <div>Podcast id episode id page</div>,
              },
              {
                path: "episode/:id",
                element: <div>Podcast id episode id page</div>,
              },
            ],
          },
        ],
      },
      {
        path: "/faqs",
        element: <div>FAQs Page</div>,
      },
    ],
  },
  {
    path: "/login",
    element: <div>Login Page</div>,
  },
  {
    path: "/register",
    element: <div>Register Page</div>,
  },
  {
    path: "/promo",
    element: <div>Landing Page</div>,
  },
]);
