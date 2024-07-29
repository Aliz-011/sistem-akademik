import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

type Props = {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive: boolean;
};

export const NavLink = ({ href, label, icon: Icon, isActive }: Props) => {
  return (
    <Link
      href={href}
      className={cn(
        isActive
          ? 'flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
          : 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
      )}
      title={label}
    >
      <Icon className="size-5" />
      <span className="sr-only">{label}</span>
    </Link>
  );
};
