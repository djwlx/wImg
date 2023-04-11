import Login from "@/pages/login";
import UploadPage from "../pages/upload";
import Head from "./Head";
import { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Head />,
    children: [
      {
        index: true,
        element: <UploadPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export default routes;
