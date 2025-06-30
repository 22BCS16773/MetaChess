
import { HomeIcon, Cloud } from "lucide-react";
import Index from "./pages/Index.jsx";
import Weather from "./pages/Weather.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Weather",
    to: "/weather",
    icon: <Cloud className="h-4 w-4" />,
    page: <Weather />,
  },
];
