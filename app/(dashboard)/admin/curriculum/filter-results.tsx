'use client';

import { useQuery } from '@tanstack/react-query';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { columns } from './columns';

import { CurriculumData } from '@/types';
import { kyInstance } from '@/lib/ky';

export const FilterResults = ({ majorId }: { majorId: string }) => {
  const { isLoading, isPending, data } = useQuery({
    queryKey: ['curriculum-filter', majorId],
    queryFn: async () =>
      kyInstance
        .get('/api/curriculum', {
          searchParams: {
            majorId,
          },
        })
        .json<CurriculumData[]>(),
    gcTime: 0,
  });

  if (isLoading || isPending) {
    return null;
  }

  return (
    <>
      {data ? (
        <DataTable
          columns={columns}
          data={data}
          filterKey="name"
          href="/admin/curriculum/new"
        />
      ) : (
        <div className="border p-6 rounded-lg shadow-sm bg-card">
          <Button size="sm" asChild>
            <Link
              href="/admin/curriculum/new"
              className="flex items-center gap-2"
            >
              <PlusCircledIcon className="size-4" />
              Tambah
            </Link>
          </Button>
        </div>
      )}
    </>
  );
};
