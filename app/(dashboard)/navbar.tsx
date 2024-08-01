'use client';

import { useQueryClient } from '@tanstack/react-query';
import {
  ExitIcon,
  GearIcon,
  QuestionMarkCircledIcon,
} from '@radix-ui/react-icons';
import { Package2, PanelLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { SearchInput } from './search-input';

import { logout } from '@/actions/user.actions';
import { useSession } from '@/hooks/use-session';
// Route diganti sesuai role dari user
import { routes } from './admin/sidebar';

export const Navbar = () => {
  const { user } = useSession();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    queryClient.clear();
    await logout();
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
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
            {routes.map(({ href, icon: Icon, label }) => (
              <Link
                href={href}
                key={href}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Icon className="h-5 w-5" />
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
            className="overflow-hidden rounded-full"
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
          <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2">
            <GearIcon />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <QuestionMarkCircledIcon />
            Support
          </DropdownMenuItem>
          <DropdownMenuSeparator />
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
    </header>
  );
};
