import { DataTable } from '@/components/data-table';
import { Header } from '@/components/header';
import React from 'react';
import { columns } from './columns';

const LecturersPage = () => {
  return (
    <div className="mx-auto grid max-w-screen-xl flex-1 p-4 auto-rows-max gap-4 w-full">
      <Header title="Dosen" subtitle="List seluruh dosen" />
      <DataTable
        columns={columns}
        data={[]}
        filterKey="fullName"
        href="/admin/lecturers/new"
      />
    </div>
  );
};

export default LecturersPage;
