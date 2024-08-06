'use client';

import { usePathname } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';
import { Settings } from 'lucide-react';
import { ExitIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';

import { NavLink } from '../nav-link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

import { logout } from '@/actions/user.actions';
import { adminRoutes } from '@/lib/constants';
import { cn } from '@/lib/utils';

export const Sidebar = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    queryClient.clear();
    await logout();
  };

  return (
    <aside className="fixed inset-y-0 z-10 md:flex flex-shrink-0 bg-card overflow-hidden border-r hidden focus:outline-none">
      {/* MINI COLUMN */}
      <div className="flex flex-col flex-shrink-0 h-full border-r">
        {/* logo */}
        <div className="flex flex-col items-center sm:py-4">
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
        </div>

        {/* middle icons */}
        <div className="flex flex-col items-center justify-center flex-1 space-y-4">
          <button className="p-2 text-blue-400 transition-colors duration-200 rounded-full bg-indigo-50 hover:text-blue-600 hover:bg-blue-100 dark:hover:text-light dark:hover:bg-blue-700 dark:bg-dark focus:outline-none focus:bg-blue-100 dark:focus:bg-blue-700 focus:ring-blue-800">
            <span className="sr-only">Open Notification panel</span>
            <MagnifyingGlassIcon className="size-6" />
          </button>
        </div>

        <div className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
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
        </div>
      </div>

      {/* SIDEBAR LINKS */}
      <nav className="flex-1 w-64 px-2 py-4 space-y-2 overflow-y-hidden hover:overflow-y-auto">
        {adminRoutes.map(({ href, label, icon: Icon, subMenu, subMenuItems }) =>
          subMenu ? (
            <Accordion key={href} type="single" collapsible>
              <AccordionItem value={label} className="border-none">
                <AccordionTrigger className="hover:no-underline py-1.5">
                  <div className="flex items-center gap-4 px-2 text-muted-foreground">
                    <Icon className="size-5" />
                    <span className="font-normal text-sm">{label}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-10 pt-2 pb-0">
                  {subMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        pathname === item.href
                          ? 'flex h-9 px-1.5 items-center text-blue-500 transition-colors duration-200 bg-blue-100 rounded-lg'
                          : 'flex h-9 px-1.5 items-center rounded-lg text-muted-foreground transition-colors hover:text-foreground'
                      )}
                    >
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <NavLink
              key={href}
              label={label}
              icon={Icon}
              href={href}
              isActive={pathname === href}
            />
          )
        )}
      </nav>
    </aside>
  );
};
