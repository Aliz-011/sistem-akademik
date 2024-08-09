import { ChevronLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { FacultyForm } from './faculty-form';

import { prisma } from '@/lib/database';

export const generateMetadata = async ({
  params,
}: {
  params: { facultyId: string };
}) => {
  const [faculty] = await Promise.all([
    prisma.faculty.findUnique({
      where: {
        id: params.facultyId,
      },
    }),
  ]);

  return {
    title: faculty ? `Edit ${faculty.name}` : 'Tambah fakultas',
  };
};

const FacultyDetail = async ({
  params: { facultyId },
}: {
  params: { facultyId: string };
}) => {
  const [faculty] = await Promise.all([
    prisma.faculty.findUnique({
      where: {
        id: facultyId,
      },
    }),
  ]);

  return (
    <div className="mx-auto max-w-[59rem] w-full space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" className="size-6" asChild>
          <Link href="/admin/faculties">
            <ChevronLeftIcon className="size-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>

        <Header title="Form fakultas" />
      </div>

      <FacultyForm initialValues={faculty} />
    </div>
  );
};

export default FacultyDetail;
