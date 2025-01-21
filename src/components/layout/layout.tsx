import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Helmet>
        <title>Modern React App</title>
        <meta
          name="description"
          content="A modern React application with TypeScript, Tailwind CSS, and more"
        />
      </Helmet>

      <main>
        <div className="h-screen flex">
          <div className="flex gap-0 min-h-full w-full">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}
