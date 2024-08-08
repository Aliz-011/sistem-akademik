'use client';

import { usePathname } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';
import { ExitIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { logout } from '@/actions/user.actions';
import { useSession } from '@/hooks/use-session';
import { adminRoutes } from '@/lib/constants';
import { NavLink } from '../nav-link';

export const Sidebar = () => {
  const { user } = useSession();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    queryClient.clear();
    await logout();
  };

  return (
    <aside className="bg-gray-50 hidden lg:block w-96">
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
          {adminRoutes.map(({ href, icon, label, subMenu, subMenuItems }) => (
            <NavLink
              key={href}
              href={href}
              label={label}
              icon={icon}
              subMenu={subMenu}
              subMenuItems={subMenuItems}
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
                  src={user.avatarUrl || '/user-placeholder.svg'}
                  width={20}
                  height={20}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="right">
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
