import { Header } from '@/components/header';

import { prisma } from '@/lib/database';
import { CurriculumFilter } from './curriculum-filter';

const CurriculumPage = async () => {
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
    <div className="mx-auto grid max-w-screen-xl flex-1 p-4 auto-rows-max gap-4 w-full space-y-4">
      <Header title="Kurikulum" subtitle="Manajemen kurikulum" />

      <CurriculumFilter options={majorOptions} />
    </div>
  );
};

export default CurriculumPage;
