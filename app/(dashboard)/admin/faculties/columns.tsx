'use client';

import { Faculty } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { Actions } from './actions';

export const columns: ColumnDef<Faculty>[] = [
  {
    accessorKey: 'name',
    header: 'Nama',
    cell: ({ row }) => <div className="text-base">{row.original.name}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Sejak',
    cell: ({ row }) => (
      <div className="text-sm">{format(row.original.createdAt, 'PPP')}</div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];
