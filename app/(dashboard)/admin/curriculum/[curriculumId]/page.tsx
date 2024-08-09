import { CurriculumForm } from './curriculum-form';
import { prisma } from '@/lib/database';

const CurriculumDetailPage = async ({
  curriculumId,
}: {
  curriculumId: string;
}) => {
  const [majors] = await Promise.all([prisma.major.findMany()]);

  const options = majors.map((major) => ({
    label: major.name,
    value: major.id,
  }));

  return (
    <div className="mx-auto max-w-[58rem] w-full space-y-4 p-4">
      <CurriculumForm options={options} />
    </div>
  );
};

export default CurriculumDetailPage;
