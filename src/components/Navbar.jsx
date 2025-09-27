import { useState } from "react";
import avatar from "../assets/avatar.jpg";
import { Menu, X } from "lucide-react"; // optional if using an icon library

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("about");

  const navLinks = [
    { label: "About", href: "#about", key: "about" },
    { label: "Projects", href: "#projects", key: "projects" },
    { label: "Contact", href: "#contact", key: "contact" },
  ];

  return (
    <nav className="bg-brand-100/85 backdrop-blur border-b border-brand-300/60 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src={avatar}
            alt="Jesus Vazquez avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-brand-500"
          />
          <h1 className="text-xl font-bold text-brand-900 tracking-tight">
            Jesus Vazquez
          </h1>
        </div>

        {/* Hamburger Button (mobile only) */}
        <button
          className="sm:hidden text-brand-900"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Nav Links (desktop) */}
        <ul className="hidden sm:flex space-x-6 text-brand-700 font-medium">
          {navLinks.map(({ label, href, key }) => (
            <li key={key}>
              <a
                href={href}
                onClick={() => setActive(key)}
                className={`transition-all duration-200 ease-in-out border-b-2 pb-1 ${
                  active === key
                    ? "text-brand-900 border-brand-500"
                    : "border-transparent hover:text-brand-900 hover:border-brand-500/70"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul
          className="sm:hidden px-6 pb-4 pt-2 text-right text-brand-900 font-medium space-y-3 animate-fade-in bg-brand-100/95 backdrop-blur border border-brand-300/60 shadow-md rounded-md mx-4 mt-2"
        >
          {navLinks.map(({ label, href, key }) => (
            <li key={key}>
              <a
                href={href}
                onClick={() => {
                  setActive(key);
                  setMenuOpen(false);
                }}
                className={`block transition-all duration-200 border-b-2 pb-1 ${
                  active === key
                    ? "text-brand-900 border-brand-500"
                    : "border-transparent hover:text-brand-900 hover:border-brand-500/70"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
