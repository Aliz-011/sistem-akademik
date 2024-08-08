'use client';

import { Major } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Actions } from './actions';

type ColumnsType = Major & { faculty: { name: string; id: string } };

export const columns: ColumnDef<ColumnsType>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" />
    ),
    cell: ({ row }) => <div className="text-base">{row.original.name}</div>,
  },
  {
    accessorKey: 'facultyId',
    header: 'Fakultas',
    cell: ({ row }) => (
      <div className="text-base">{row.original.faculty.name}</div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Sejak',
    cell: ({ row }) => <div>{format(row.original.createdAt, 'PPP')}</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];
