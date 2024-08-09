import { ChevronDownIcon, ChevronLeftIcon } from '@radix-ui/react-icons';
import { FolderOpen, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

type Props = {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive: boolean;
  subMenu?: boolean;
  subMenuItems?: { href: string; label: string }[];
};

export const NavLink = ({
  href,
  label,
  icon: Icon,
  isActive,
  subMenu,
  subMenuItems,
}: Props) => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <li>
      {subMenu ? (
        <>
          <button
            onClick={() => setSubMenuOpen((prev) => !prev)}
            className="flex w-full text-start py-2 px-3 font-semibold text-muted-foreground rounded-md relative"
          >
            {subMenuOpen ? (
              <FolderOpen className="size-6" />
            ) : (
              <Icon className="size-6" />
            )}
            <span className="text-sm w-full ml-3">{label}</span>

            {subMenu && subMenuOpen ? (
              <ChevronDownIcon className="size-5" />
            ) : (
              <ChevronLeftIcon className="size-5" />
            )}

            {subMenuOpen && (
              <div className="absolute left-0 h-6 w-1 bg-blue-500" />
            )}
          </button>

          <ul className="pl-6">
            {subMenu &&
              subMenuOpen &&
              subMenuItems?.map((subMenuItem) => (
                <li key={subMenuItem.href}>
                  <Link
                    href={subMenuItem.href}
                    className={cn(
                      'relative flex w-full text-start py-2 px-3 font-semibold text-muted-foreground rounded-md cursor-pointer transition-colors duration-200',
                      pathname === subMenuItem.href
                        ? 'bg-gray-200 dark:bg-slate-800 text-foreground'
                        : 'hover:text-foreground'
                    )}
                  >
                    <span
                      className={cn(
                        'text-sm w-full ml-1',
                        pathname === subMenuItem.href && 'font-bold'
                      )}
                    >
                      {subMenuItem.label}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </>
      ) : (
        <Link
          href={href}
          className={cn(
            'relative flex items-center py-2 px-3 my-1 font-semibold text-muted-foreground rounded-md cursor-pointer transition-colors duration-200',
            isActive
              ? 'bg-gray-200 dark:bg-slate-800 text-foreground'
              : 'hover:text-foreground'
          )}
        >
          <Icon className="size-5" />
          <span className={cn('text-sm w-52 ml-3', isActive && 'font-bold')}>
            {label}
          </span>

          {false && (
            <div className="absolute right-2 size-2 rounded bg-blue-500" />
          )}
        </Link>
      )}
    </li>
  );
};
