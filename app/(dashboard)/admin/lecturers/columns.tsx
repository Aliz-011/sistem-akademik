'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Actions } from './actions';
import { Lecturer } from '@prisma/client';

export const columns: ColumnDef<Lecturer>[] = [
  {
    accessorKey: 'nip',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NIP" />
    ),
  },
  {
    accessorKey: 'fullName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" />
    ),
  },
  //   {
  //     accessorKey: 'majorId',
  //     header: 'Program studi',
  //     cell: ({ row }) => <div>{row.original.major.name}</div>,
  //   },
  {
    id: 'actions',
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];
