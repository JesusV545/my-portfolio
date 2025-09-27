import { useEffect, useState } from "react";
import { Github, Linkedin, Facebook } from "lucide-react";

const links = [
  { href: "https://www.linkedin.com/in/jvazquez545", label: "LinkedIn", Icon: Linkedin },
  { href: "https://github.com/JesusV545", label: "GitHub", Icon: Github },
  { href: "https://facebook.com/jesus.vazquez.443378", label: "Facebook", Icon: Facebook },
];

export default function SocialRail() {
  // Switch to a compact dock when viewport height is short
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const check = () => setCompact(window.innerHeight < 780); // tweak threshold if you like
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Hidden on mobile widths (<= md) as before
  if (compact) {
    // Bottom dock (prevents overlap with content when screen is short)
    return (
      <nav
        aria-label="Social links"
        className="
          fixed left-4 bottom-4 z-40
          hidden md:flex items-center gap-3
          bg-brand-100/95 backdrop-blur shadow-lg
          px-3 py-2 rounded-2xl border border-brand-300/60
        "
      >
        {links.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            title={label}
            className="grid place-items-center w-10 h-10 rounded-xl text-brand-900 hover:text-white hover:bg-brand-500 transition-all"
          >
            <Icon size={20} strokeWidth={2.2} />
          </a>
        ))}
      </nav>
    );
  }

  // Default vertical rail for roomy/tall screens
  return (
    <aside
      aria-label="Social links"
      className="
        fixed left-6 top-1/2 -translate-y-1/2 z-40
        hidden md:flex flex-col gap-4
        bg-brand-100/95 backdrop-blur shadow-lg
        p-3 rounded-2xl border border-brand-300/60
      "
    >
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          title={label}
          className="grid place-items-center w-10 h-10 rounded-xl text-brand-900 hover:text-white hover:bg-brand-500 transition-all"
        >
          <Icon size={20} strokeWidth={2.2} />
        </a>
      ))}
    </aside>
  );
}
