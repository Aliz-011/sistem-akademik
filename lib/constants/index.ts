import { Folder, Home } from 'lucide-react';

export const adminRoutes = [
  {
    href: '/admin',
    label: 'HOME',
    icon: Home,
  },
  {
    href: '/admin/faculties',
    label: 'FAKULTAS',
    icon: Folder,
  },
  {
    href: '/admin/majors',
    label: 'PROGRAM STUDI',
    icon: Folder,
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
    href: '/admin/curriculum',
    label: 'KURIKULUM',
    icon: Folder,
    subMenu: true,
    subMenuItems: [
      {
        href: '/admin/curriculum',
        label: 'Data Kurikulum',
      },
      {
        href: '/admin/curriculum/subjects',
        label: 'Matakuliah',
      },
    ],
  },
  {
    href: '/admin/lecturers',
    label: 'DOSEN',
    icon: Folder,
    subMenu: true,
    subMenuItems: [
      {
        href: '/admin/lecturers',
        label: 'Data Dosen',
      },
      {
        href: '/admin/lecturers/schedules',
        label: 'Jadwal Dosen',
      },
      {
        href: '/admin/lecturers/student-guiding',
        label: 'Mhs. Bimbingan Akd. Per Dosen',
      },
      {
        href: '/admin/lecturers/furlough',
        label: 'Cuti Dosen',
      },
    ],
  },
  {
    href: '/admin/students',
    label: 'KEMAHASISWAAN',
    icon: Folder,
    subMenu: true,
    subMenuItems: [
      {
        href: '/admin/students',
        label: 'Mahasiswa',
      },
      {
        href: '/admin/students/guides',
        label: 'Bimbingan Akademik',
      },
    ],
  },
];

export const studentRoutes = [
  {
    href: '/student',
    label: 'HOME',
    icon: Home,
  },
];
