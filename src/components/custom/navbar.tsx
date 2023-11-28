import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    name: "Table",
    path: "/table",
  },
  {
    name: "Bar Chart",
    path: "/bar-chart",
  },
  {
    name: "Pie Chart",
    path: "/pie-chart",
  },
  {
    name: "Scatter Plot",
    path: "/scatter-plot",
  },
];

const Navbar = () => {
  const location = useLocation();
  return (
    <div className="flex flex-row bg-slate-800 w-full h-14 px-8 gap-6 items-stretch col-span-2 hide-print">
      {navItems.map((item) => {
        return (
          <Link
            key={item.path}
            to={item.path}
            className="grid place-items-center cursor-pointer group"
          >
            <p
              className={`relative after:bg-white after:absolute after:h-[2px] ${
                location.pathname === item.path
                  ? "after:w-full after:left-0 font-medium text-white"
                  : "after:w-0 after:left-[50%] text-slate-400 group-focus:after:text-slate-200 group-hover:after:text-slate-200"
              } after:place-items-center after:bottom-0 group-hover:after:w-full group-focus:after:w-full group-hover:after:left-0 group-focus:after:left-0 after:transition-all after:duration-300 px-2`}
            >
              {item.name}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default Navbar;
