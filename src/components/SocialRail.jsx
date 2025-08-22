import { Github, Linkedin, Facebook } from "lucide-react";

const links = [
  {
    href: "https://www.linkedin.com/in/jvazquez545",
    label: "LinkedIn",
    Icon: Linkedin,
  },
  {
    href: "https://github.com/JesusV545",
    label: "GitHub",
    Icon: Github,
  },
  {
    href: "https://facebook.com/jesus.vazquez.443378",
    label: "Facebook",
    Icon: Facebook,
  },
];

export default function SocialRail() {
  return (
    <aside
      className="
        fixed left-6 top-1/2 -translate-y-1/2 z-40
        hidden md:flex flex-col gap-4
        bg-white/70 backdrop-blur-md shadow-lg
        p-3 rounded-2xl border border-gray-200
      "
      aria-label="Social links"
    >
    {links.map((link) => {
    const { href, label, Icon } = link;
    return (
        <a
        key={label}
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        title={label}
        className="grid place-items-center w-10 h-10 rounded-xl text-gray-700 hover:text-white hover:bg-blue-600 transition-all"
        >
        <Icon size={20} strokeWidth={2.2} />
        </a>
    );
    })}

    </aside>
  );
}
