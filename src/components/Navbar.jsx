import { useState } from "react";

export default function Navbar() {
  const [active, setActive] = useState("about");

  const navLinks = [
    { label: "About", href: "#about", key: "about" },
    { label: "Projects", href: "#projects", key: "projects" },
    { label: "Contact", href: "#contact", key: "contact" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600 tracking-tight">Jesus Vazquez</h1>

        <ul className="flex space-x-6 text-gray-700 font-medium">
          {navLinks.map(({ label, href, key }) => (
            <li key={key}>
              <a
                href={href}
                onClick={() => setActive(key)}
                className={`transition-all duration-200 ease-in-out border-b-2 pb-1 ${
                  active === key
                    ? "text-blue-600 border-blue-600"
                    : "border-transparent hover:text-blue-500 hover:border-blue-300"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
