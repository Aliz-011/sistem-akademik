import { Metadata } from 'next';

import { Header } from '@/components/header';
import { StudentFilter } from './student-filter';
import { FilterResults } from './filter-results';

import { prisma } from '@/lib/database';

export const metadata: Metadata = {
  title: 'Mahasiswa',
};

const StudentsPage = async ({
  searchParams,
}: {
  searchParams: { majorId: string; nim: string; fullName: string };
}) => {
  const [majors] = await Promise.all([
    prisma.major.findMany({
      select: {
        id: true,
        name: true,
      },
    }),
  ]);

  const majorOptions = majors.map((major) => ({
    label: major.name,
    value: major.id,
  }));

  return (
    <div className="mx-auto grid max-w-screen-xl flex-1 p-4 auto-rows-max gap-4 w-full">
      <Header title="Mahasiswa" subtitle="List seluruh mahasiswa" />

      <StudentFilter options={majorOptions} />
      <FilterResults
        majorId={searchParams.majorId}
        nama={searchParams.fullName}
        nim={searchParams.nim}
      />
    </div>
  );
};

export default StudentsPage;
