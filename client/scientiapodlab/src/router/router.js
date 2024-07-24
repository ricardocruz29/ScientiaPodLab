import { createBrowserRouter } from "react-router-dom";
import { Error } from "../pages/error";
import { Layout } from "../pages/layout";
import Login from "../pages/login/login";
import Register from "../pages/register/register";
import Resources from "../pages/resources/resources";
import Template from "../pages/resources/template/template";
import Podcasts from "../pages/podcasts/podcasts";
import Podcast from "../pages/podcasts/podcast/podcast";
import EpisodeRecord from "../pages/podcasts/podcast/episode-record/episode-record";
import Episode from "../pages/podcasts/podcast/episode/episode";
import FAQs from "../pages/faqs/faqs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/resources",
        element: <Resources />,
      },
      {
        path: "/resources/templates/:id",
        element: <Template />,
      },
      {
        path: "/podcasts",
        element: <Podcasts />,
      },
      {
        path: "/podcasts/:id",
        element: <Podcast />,
      },
      {
        path: "/podcasts/:id/episode/record",
        element: <EpisodeRecord />,
      },
      {
        path: "/podcasts/:id/episode/:id",
        element: <Episode />,
      },
      {
        path: "/faqs",
        element: <FAQs />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
