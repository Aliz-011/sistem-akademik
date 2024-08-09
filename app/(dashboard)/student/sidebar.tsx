'use client';

import { usePathname } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import {
  MoonIcon,
  SunIcon,
  ExitIcon,
  DesktopIcon,
} from '@radix-ui/react-icons';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NavLink } from '../nav-link';

import { logout } from '@/actions/user.actions';
import { studentRoutes } from '@/lib/constants';
import { useSession } from '@/hooks/use-session';

export const Sidebar = () => {
  const { user } = useSession();
  const pathname = usePathname();
  const { setTheme } = useTheme();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    queryClient.clear();
    await logout();
  };

  return (
    <aside className="bg-gray-50 dark:bg-neutral-900/80 hidden lg:block w-96">
      <nav className="h-full flex flex-col border-r shadow-sm">
        <div className="px-6 py-4 flex items-center gap-2 h-16 border-b">
          <Image
            src="https://merakiui.com/images/logo.svg"
            alt="logo"
            height={24}
            width={24}
          />
          <Link href="/" className="font-bold text-lg">
            siakad
          </Link>
        </div>

        <ul className="flex-1 px-3 py-6">
          {studentRoutes.map(({ href, icon, label }) => (
            <NavLink
              key={href}
              href={href}
              label={label}
              icon={icon}
              isActive={pathname === href}
            />
          ))}
        </ul>

        <div className="flex items-center gap-2 py-6 px-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full size-8"
              >
                <Image
                  src={user.avatarUrl || 'https://github.com/shadcn.png'}
                  width={20}
                  height={20}
                  alt="Avatar"
                  className="overflow-hidden size-full rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="right" className="w-48">
              <DropdownMenuGroup>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="flex items-center gap-3">
                    <DesktopIcon className="size-4" />
                    Dark Mode
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem
                        onClick={() => setTheme('light')}
                        className="flex items-center gap-3"
                      >
                        <SunIcon className="size-4" />
                        Light
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setTheme('dark')}
                        className="flex items-center gap-3"
                      >
                        <MoonIcon className="size-4" />
                        Dark
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setTheme('system')}
                        className="flex items-center gap-3"
                      >
                        <DesktopIcon className="size-4" />
                        System
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
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

          <span className="font-medium text-lg">{user.username}</span>
        </div>
      </nav>
    </aside>
  );
};
