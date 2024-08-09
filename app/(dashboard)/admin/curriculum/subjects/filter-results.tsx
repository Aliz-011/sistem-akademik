'use client';

import { useQuery } from '@tanstack/react-query';

import { DataTable } from '@/components/data-table';
import { columns } from './columns';

import { kyInstance } from '@/lib/ky';
import { SubjectData } from '@/types';

type Props = {
  subjectName: string;
  subjectAlias: string;
  majorId: string;
};

export const FilterResults = ({
  majorId,
  subjectAlias,
  subjectName,
}: Props) => {
  const { isLoading, isPending, data } = useQuery({
    queryKey: ['subjects-filter', majorId, subjectName, subjectAlias],
    queryFn: async () =>
      kyInstance
        .get('/api/curriculum/subjects', {
          searchParams: {
            majorId,
            alias: subjectAlias,
            name: subjectName,
          },
        })
        .json<SubjectData[]>(),
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
          data={[]}
          filterKey="name"
          href="/admin/curriculum/subjects/new"
        />
      )}
    </>
  );
};
