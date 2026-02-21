/**
 * Theme Toggle Component
 *
 * Cycles through: light → dark → system.
 * Shows the appropriate icon for the current resolved theme.
 * Smooth rotation transition on click.
 */

'use client';

import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

const CYCLE: Array<'light' | 'dark'> = ['light', 'dark'];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const safeTheme: 'light' | 'dark' =
    theme === 'dark' ? 'dark' : 'light';

  const next = () => {
    const idx = CYCLE.indexOf(safeTheme);
    setTheme(CYCLE[(idx + 1) % CYCLE.length]);
  };

  const icon =
    safeTheme === 'dark' ? (
      <Sun className="w-5 h-5" />
    ) : (
      <Moon className="w-5 h-5" />
    );

  const label =
    safeTheme === 'dark'
      ? 'Dark mode'
      : 'Light mode';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={next}
      aria-label={label}
      title={label}
      className="w-10 h-10 rounded-full hover:bg-accent hover:text-accent-foreground transition-all duration-300 [&_svg]:transition-transform [&_svg]:duration-300 [&_svg]:hover:rotate-45"
    >
      {icon}
    </Button>
  );
}
