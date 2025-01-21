import { Link } from "react-router-dom";

// components
import ThemeToggle from "@/components/navbar/theme_toggle";

// assets
import MainLogoIcon from "@/components/icons/MainLogoIcon";

// hooks
import { useTheme } from "@/components/theme-provider";

export default function Navbar() {
  const { theme } = useTheme();
  return (
    <nav className=" sticky sm:top-8 top-5 left-0 right-0  z-50 ">
      <div className="flex justify-between items-center container py-4 sm:px-8 px-6 bg-theme-background-main dark:bg-theme-background-dark rounded-full shadow-2xl border border-grey-200 dark:border-grey-200">
        <Link to={"/"}>
          {theme === "light" ? (
            <MainLogoIcon fill="#000" className="md:w-48 w-40" />
          ) : (
            <MainLogoIcon fill="#fff" className="md:w-48 w-40" />
          )}
        </Link>

        <ThemeToggle />
      </div>
    </nav>
  );
}
