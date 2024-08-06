'use client';

import { useQuery } from '@tanstack/react-query';

import { DataTable } from '@/components/data-table';
import { columns, StudentData } from './columns';

import { kyInstance } from '@/lib/ky';

type Props = {
  nama: string;
  nim: string;
  majorId: string;
};

export const FilterResults = ({ majorId, nama, nim }: Props) => {
  const { isLoading, isPending, data } = useQuery({
    queryKey: ['students-filter', majorId, nim, nama],
    queryFn: async () =>
      kyInstance
        .get('/api/students', {
          searchParams: {
            majorId,
            nim,
            fullName: nama,
          },
        })
        .json<StudentData[]>(),
    gcTime: 0,
  });

  if (isLoading || isPending) {
    return null;
  }

  return (
    <>
      {!!data && (
        <DataTable
          columns={columns}
          data={data}
          filterKey="fullName"
          href="/admin/students/new"
        />
      )}
    </>
  );
};
