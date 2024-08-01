import { ChevronLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';

import { prisma } from '@/lib/database';
import { MajorForm } from './major-form';

export const generateMetadata = async ({
  params,
}: {
  params: { majorId: string };
}) => {
  const [major] = await Promise.all([
    prisma.major.findUnique({
      where: {
        id: params.majorId,
      },
    }),
  ]);

  return {
    title: major ? `Edit ${major.name}` : 'Tambah program studi',
  };
};

const MajorDetail = async ({
  params: { majorId },
}: {
  params: { majorId: string };
}) => {
  const [major, faculties] = await Promise.all([
    prisma.major.findFirst({
      where: {
        id: majorId,
      },
    }),
    prisma.faculty.findMany({ select: { id: true, name: true } }),
  ]);

  const options = faculties.map((faculty) => ({
    label: faculty.name,
    value: faculty.id,
  }));

  return (
    <div className="mx-auto max-w-[59rem] w-full space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="size-7" asChild>
          <Link href="/admin/majors">
            <ChevronLeftIcon className="size-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>

        <Header title="Form program studi" />
      </div>

      <MajorForm initialValues={major} options={options} />
    </div>
  );
};

export default MajorDetail;
