'use client';

import { Major } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { DataTableColumnHeader } from '@/components/data-table-column-header';

type ColumnsType = Major & { faculty: { name: string; id: string } };

export const columns: ColumnDef<ColumnsType>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" />
    ),
  },
  {
    accessorKey: 'facultyId',
    header: 'Fakultas',
    cell: ({ row }) => <div>{row.original.faculty.name}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Sejak',
    cell: ({ row }) => (
      <div className="text-sm">{format(row.original.createdAt, 'PPP')}</div>
    ),
  },
];
