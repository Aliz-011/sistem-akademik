'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Package2, PanelLeft } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { ChevronRightIcon, ExitIcon } from '@radix-ui/react-icons';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SearchInput } from './search-input';

import { useSession } from '@/hooks/use-session';
import { adminRoutes, studentRoutes } from '@/lib/constants';
import { logout } from '@/actions/user.actions';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

export const Navbar = () => {
  const pathname = usePathname();
  const { user } = useSession();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    queryClient.clear();
    await logout();
  };

  const crumbs = adminRoutes.filter((route) => pathname.startsWith(route.href));

  return (
    <header>
      <div className="flex items-center gap-4 h-16 py-4 border-b w-full px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <p>Dashboard</p>
          <ChevronRightIcon className="size-4" />
          {crumbs.map((crumb, index) => (
            <Fragment key={index}>
              {index > 0 && (
                <span className="text-gray-400">
                  <ChevronRightIcon className="size-4" />
                </span>
              )}
              {index === crumbs.length - 1 ? (
                <span className="text-gray-600 capitalize">
                  {crumb.label.toLowerCase()}
                </span>
              ) : (
                <Link href={crumb.href} className="capitalize">
                  {crumb.label.toLowerCase()}
                </Link>
              )}
            </Fragment>
          ))}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="lg:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
              >
                <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              {user.role === 'ADMIN' &&
                adminRoutes.map(({ href, icon: Icon, label }) => (
                  <Link
                    href={href}
                    key={href}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Icon className="size-6" />
                    {label}
                  </Link>
                ))}
              {user.role === 'STUDENT' &&
                studentRoutes.map(({ href, icon: Icon, label }) => (
                  <Link
                    href={href}
                    key={href}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Icon className="size-6" />
                    {label}
                  </Link>
                ))}
            </nav>
          </SheetContent>
        </Sheet>

        <SearchInput />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full flex sm:hidden"
            >
              <Image
                src={user.avatarUrl || '/user-placeholder.svg'}
                width={24}
                height={24}
                alt="Avatar"
                className="overflow-hidden rounded-full"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full cursor-pointer"
              >
                <ExitIcon />
                Logout
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
