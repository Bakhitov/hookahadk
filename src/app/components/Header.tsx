import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Switch } from "@/app/components/ui/switch";
import blackLogo from "@/public/blackfull.svg";
import whiteLogo from "@/public/whitefull.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import type { Lang } from "@/app/i18n";

type HeaderProps = {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
  labels: {
    langLabel: string;
    themeLabel: string;
    headerTitle: string;
    headerSubtitle: string;
    navAbout: string;
    navGoals: string;
    navActivities: string;
    navPartnership: string;
    navContacts: string;
  };
};

export function Header({ lang, onLangChange, labels }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored ? stored === "dark" : prefersDark;
    setIsDark(initial);
    document.documentElement.classList.toggle("dark", initial);
  }, []);

  const handleThemeToggle = (checked: boolean) => {
    setIsDark(checked);
    document.documentElement.classList.toggle("dark", checked);
    localStorage.setItem("theme", checked ? "dark" : "light");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="h-15 w-30">
              <img
                src={blackLogo}
                alt={labels.headerTitle}
                className="h-14 w-44 object-contain dark:hidden"
              />
              <img
                src={whiteLogo}
                alt={labels.headerTitle}
                className="hidden h-14 w-44 object-contain dark:block"
              />
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm text-muted-foreground hover:text-[#9ccf2a] transition-colors"
            >
              {labels.navAbout}
            </button>
            <button
              onClick={() => scrollToSection("goals")}
              className="text-sm text-muted-foreground hover:text-[#9ccf2a] transition-colors"
            >
              {labels.navGoals}
            </button>
            <button
              onClick={() => scrollToSection("activities")}
              className="text-sm text-muted-foreground hover:text-[#9ccf2a] transition-colors"
            >
              {labels.navActivities}
            </button>
            <button
              onClick={() => scrollToSection("partnership")}
              className="text-sm text-muted-foreground hover:text-[#9ccf2a] transition-colors"
            >
              {labels.navPartnership}
            </button>
            <button
              onClick={() => scrollToSection("contacts")}
              className="px-6 py-2 rounded-lg bg-[#cafe3c] text-black hover:bg-[#b8ee2c] transition-colors"
            >
              {labels.navContacts}
            </button>
            <div className="flex items-center gap-2 px-2 py-1">
              <Select
                value={lang}
                onValueChange={(v) => onLangChange(v as Lang)}
              >
                <SelectTrigger className="h-7 w-[84px] rounded-lg border-border bg-background px-2 text-xs">
                  <SelectValue placeholder={labels.langLabel} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ru">RU</SelectItem>
                  <SelectItem value="kz">KZ</SelectItem>
                  <SelectItem value="en">ENG</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 border border-border rounded-lg px-2 py-2">
              <Sun size={14} className="text-muted-foreground" />
              <Switch
                checked={isDark}
                onCheckedChange={handleThemeToggle}
                aria-label={labels.themeLabel}
              />
              <Moon size={14} className="text-muted-foreground" />
            </div>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("about")}
                className="text-left text-sm text-muted-foreground hover:text-[#9ccf2a] transition-colors"
              >
                {labels.navAbout}
              </button>
              <button
                onClick={() => scrollToSection("goals")}
                className="text-left text-sm text-muted-foreground hover:text-[#9ccf2a] transition-colors"
              >
                {labels.navGoals}
              </button>
              <button
                onClick={() => scrollToSection("activities")}
                className="text-left text-sm text-muted-foreground hover:text-[#9ccf2a] transition-colors"
              >
                {labels.navActivities}
              </button>
              <button
                onClick={() => scrollToSection("partnership")}
                className="text-left text-sm text-muted-foreground hover:text-[#9ccf2a] transition-colors"
              >
                {labels.navPartnership}
              </button>
              <button
                onClick={() => scrollToSection("contacts")}
                className="text-left text-sm text-muted-foreground hover:text-[#9ccf2a] transition-colors"
              >
                {labels.navContacts}
              </button>
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-muted-foreground">
                  {labels.langLabel}
                </span>
                <Select
                  value={lang}
                  onValueChange={(v) => onLangChange(v as Lang)}
                >
                  <SelectTrigger className="h-7 w-[90px] rounded-lg border-border bg-background px-2 text-xs">
                    <SelectValue placeholder={labels.langLabel} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ru">RU</SelectItem>
                    <SelectItem value="kz">KZ</SelectItem>
                    <SelectItem value="en">ENG</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between border border-border rounded-lg px-3 py-2">
                <span className="text-sm text-muted-foreground">
                  {labels.themeLabel}
                </span>
                <div className="flex items-center gap-2">
                  <Sun size={14} className="text-muted-foreground" />
                  <Switch
                    checked={isDark}
                    onCheckedChange={handleThemeToggle}
                    aria-label={labels.themeLabel}
                  />
                  <Moon size={14} className="text-muted-foreground" />
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
