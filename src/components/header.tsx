import { ConnectButton } from "@rainbow-me/rainbowkit";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="px-4 py-2 flex gap-x-4 justify-between items-center border-b border-border">
      <nav className="flex flex-row">
        <img
          src="https://nexus-demo.availproject.org/avail-logo.svg"
          alt="Avail Logo"
        />
      </nav>

      <div className="flex items-center gap-x-4">
        <button
          type="button"
          aria-label="Toggle theme"
          onClick={toggleTheme}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 transition-colors"
        >
          {theme === "dark" ? (
            <SunIcon className="h-5 w-5" />
          ) : (
            <MoonIcon className="h-5 w-5" />
          )}
        </button>
        <ConnectButton />
      </div>
    </header>
  );
};

export default Header;
