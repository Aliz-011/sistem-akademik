'use client';

import { usePathname } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { Settings } from 'lucide-react';
import { ExitIcon } from '@radix-ui/react-icons';
import Image from 'next/image';

import { NavLink } from '../nav-link';
import { Button } from '@/components/ui/button';

import { logout } from '@/actions/user.actions';
import { studentRoutes } from '@/lib/constants';

export const Sidebar = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    queryClient.clear();
    await logout();
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Image
            src="https://merakiui.com/images/logo.svg"
            alt="logo"
            height={24}
            width={24}
            className="w-auto h-6"
          />
          <span className="sr-only">Acme Inc</span>
        </Link>

        {studentRoutes.map((route) => (
          <NavLink
            key={route.href}
            label={route.label}
            icon={route.icon}
            href={route.href}
            isActive={pathname === route.href}
          />
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <Link
          href="#"
          title="Settings"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
        >
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Link>

        <Button variant="ghost" onClick={handleLogout} title="Logout">
          <ExitIcon />
        </Button>
      </nav>
    </aside>
  );
};
