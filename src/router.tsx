import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import HomePage from "./pages/home-page";
import ErrorElement from "./components/error/error";

// Components
import Layout from "./components/layout/layout";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorElement />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },

        {
          path: "*",
          element: <ErrorElement />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
