import { Metadata } from 'next';

import { Header } from '@/components/header';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';

import { prisma } from '@/lib/database';

export const metadata: Metadata = {
  title: 'Program studi',
};

const MajorsPage = async () => {
  const [majors] = await Promise.all([
    prisma.major.findMany({
      include: {
        faculty: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    }),
  ]);

  return (
    <div className="mx-auto grid max-w-screen-xl flex-1 p-4 auto-rows-max gap-4 w-full">
      <Header title="Program studi" subtitle="List program studi" />

      <DataTable
        columns={columns}
        data={majors}
        filterKey="name"
        href="/admin/majors/new"
      />
    </div>
  );
};

export default MajorsPage;
