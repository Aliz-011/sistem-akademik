'use client';

import { Student } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { Actions } from './actions';

type ColumnsType = Student & { major: { name: string; id: string } };

export const columns: ColumnDef<ColumnsType>[] = [
  {
    accessorKey: 'nim',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NIM" />
    ),
  },
  {
    accessorKey: 'fullName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" />
    ),
  },

  {
    accessorKey: 'majorId',
    header: 'Program studi',
    cell: ({ row }) => <div>{row.original.major.name}</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];
