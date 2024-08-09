import { Header } from '@/components/header';
import { SubjectFilter } from './subject-filter';

import { prisma } from '@/lib/database';
import { FilterResults } from './filter-results';

const SubjectsPage = async ({
  searchParams: { alias, majorId, name },
}: {
  searchParams: { majorId: string; alias: string; name: string };
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
      <Header title="Matakuliah" subtitle="Daftar mata kuliah" />

      <SubjectFilter options={majorOptions} />
      <FilterResults
        majorId={majorId}
        subjectAlias={alias}
        subjectName={name}
      />
    </div>
  );
};

export default SubjectsPage;
