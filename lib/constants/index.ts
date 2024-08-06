import { Home, Library, School, Users } from 'lucide-react';

export const adminRoutes = [
  {
    href: '/admin',
    label: 'HOME',
    icon: Home,
  },
  {
    href: '/admin/faculties',
    label: 'FAKULTAS',
    icon: School,
  },
  {
    href: '/admin/majors',
    label: 'PROGRAM STUDI',
    icon: Library,
    subMenu: true,
    subMenuItems: [
      {
        href: '/admin/majors',
        label: 'Manajemen Program Studi',
      },
      {
        href: '/admin/majors/accreditation',
        label: 'Akreditasi',
      },
    ],
  },
  {
    href: '/admin/students',
    label: 'MAHASISWA',
    icon: Users,
  },
];

export const studentRoutes = [
  {
    href: '/student',
    label: 'HOME',
    icon: Home,
  },
];
