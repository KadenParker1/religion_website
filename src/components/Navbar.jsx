import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const links = [
    { to: "/", label: "Home" },
    { to: "/search", label: "Search" },
    { to: "/cards", label: "Cards" },
    { to: "/notes", label: "Notes" },
  ];

  return (
    <nav className="flex gap-4 bg-white p-3 shadow-md px-6 py-3 sticky top-0 z-50">
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`font-semibold ${
            pathname === link.to
              ? "text-indigo-700 underline"
              : "text-gray-600 hover:text-indigo-500"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
