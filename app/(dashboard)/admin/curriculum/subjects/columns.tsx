'use client';

import { Subject } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';

export const columns: ColumnDef<Subject>[] = [
  {
    accessorKey: 'major',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Program Studi" />
    ),
  },
  {
    accessorKey: 'alias',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kode" />
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" />
    ),
  },
  {
    accessorKey: 'semester',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Paket Semester" />
    ),
  },
  {
    id: 'actions',
    // cell: ({ row }) => <Actions id={row.original.id} />,
  },
];
