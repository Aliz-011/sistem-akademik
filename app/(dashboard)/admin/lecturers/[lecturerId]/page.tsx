import { LecturerForm } from './lecturer-form';

import { prisma } from '@/lib/database';

// TODO: Use NIP and not only the ID of the lecturer
type Props = {
  lecturerId: string;
};

const LecturerDetailPage = async ({ lecturerId }: Props) => {
  const [lecturer] = await Promise.all([
    prisma.lecturer.findFirst({
      where: {
        id: lecturerId,
      },
    }),
  ]);

  return (
    <div className="mx-auto max-w-[58rem] w-full space-y-4 p-4">
      <LecturerForm />
    </div>
  );
};

export default LecturerDetailPage;
