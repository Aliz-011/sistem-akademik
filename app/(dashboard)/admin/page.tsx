import { GraduationCap } from 'lucide-react';

import { Header } from '@/components/header';
import { DataCard, DataCardLoading } from '@/components/data-card';
import { Skeleton } from '@/components/ui/skeleton';

import { prisma } from '@/lib/database';
import { StudentTrend } from './student-trend';

const AdminPage = async () => {
  const [studentCountsBySex, activeStudents] = await Promise.all([
    prisma.student.groupBy({
      by: ['sex'],
      _count: {
        sex: true,
      },
    }),

    prisma.student.count(),
  ]);

  const studentCounts = Object.fromEntries(
    studentCountsBySex.map(({ sex, _count }) => [sex, _count.sex])
  );

  if (studentCountsBySex === undefined || activeStudents === undefined) {
    return (
      <div className="flex flex-col space-y-4 p-4">
        <Skeleton className="w-24 h-8" />
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
          <DataCardLoading />
          <DataCardLoading />
          <DataCardLoading />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4 p-4">
      <Header title="Dashboard" />
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <DataCard
          title="Mahasiswa aktif"
          subtitle="Jumlah mahasiswa aktif"
          icon={GraduationCap}
          value={activeStudents}
          variant="success"
        />
        <DataCard
          title="Mahasiswa laki-laki"
          subtitle="Jumlah mahasiswa laki-laki"
          icon={GraduationCap}
          value={studentCounts.MALE}
        />
        <DataCard
          title="Mahasiswa perempuan"
          subtitle="Jumlah mahasiswa perempuan"
          icon={GraduationCap}
          value={studentCounts.FEMALE}
          variant="danger"
        />
        <div className="col-span-full">
          <StudentTrend />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
