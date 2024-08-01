import { Metadata } from 'next';

import { DataTable } from '@/components/data-table';
import { Header } from '@/components/header';
import { columns } from './columns';

import { prisma } from '@/lib/database';

export const metadata: Metadata = {
  title: 'Fakultas',
};

const FacultiesPage = async () => {
  const [faculties] = await Promise.all([prisma.faculty.findMany()]);

  return (
    <div className="mx-auto grid max-w-screen-xl flex-1 auto-rows-max gap-4 w-full">
      <Header title="Fakultas" subtitle="List Fakultas" />

      <DataTable
        columns={columns}
        data={faculties}
        filterKey="name"
        href="/admin/faculties/new"
      />
    </div>
  );
};

export default FacultiesPage;
