import Link from "next/link";

export default function Header() {
  return (
    <header
      id="header"
      className={`dark:bg-[#0d11163b] bg-[#fefefe3b] backdrop-blur-lg fixed top-0 z-10 flex w-full items-center justify-center gap-4 px-24 py-2 transition-all duration-200 ease-out`}

    >
      <Link
        className="rounded-xl bg-transparent px-6 py-2 transition-all duration-100 ease-out hover:bg-[#ffffff0a]"
        href="#hero"
      >
        Features
      </Link>
      <Link
        className="rounded-xl bg-transparent px-6 py-2 transition-all duration-100 ease-out hover:bg-[#ffffff0a]"
        href="#config"
      >
        Config
      </Link>
      <Link
        className="rounded-xl bg-transparent px-6 py-2 transition-all duration-100 ease-out hover:bg-[#ffffff0a]"
        href="#themes"
      >
        Themes
      </Link>
    </header>
  );
}
