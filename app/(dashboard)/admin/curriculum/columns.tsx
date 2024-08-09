'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Actions } from './actions';

import { CurriculumData } from '@/types';

export const columns: ColumnDef<CurriculumData>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" />
    ),
  },
  {
    accessorKey: 'year',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tahun" />
    ),
  },
  {
    accessorKey: 'idealStudyPeriod',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ideal" />
    ),
  },
  {
    accessorKey: 'maxStudyPeriod',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Maks" />
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
