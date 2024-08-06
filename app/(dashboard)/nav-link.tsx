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
          ? 'flex items-center gap-4 h-9 p-1.5 text-blue-500 transition-colors duration-200 bg-blue-100 rounded-lg dark:text-blue-400 dark:bg-gray-800'
          : 'flex items-center gap-4 h-9 p-1.5 rounded-lg text-muted-foreground transition-colors hover:text-foreground'
      )}
    >
      <Icon className="size-5" />
      <span className="text-sm">{label}</span>
    </Link>
  );
};
