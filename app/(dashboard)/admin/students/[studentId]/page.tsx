import { StudentForm } from './student-form';
import { prisma } from '@/lib/database';

export const generateMetadata = async ({
  params,
}: {
  params: { studentId: string };
}) => {
  const [student] = await Promise.all([
    prisma.student.findUnique({
      where: {
        id: params.studentId,
      },
    }),
  ]);

  return {
    title: student
      ? `Edit ${student.fullName.substring(0, 10)}`
      : 'Tambah mahasiswa',
  };
};

const StudentDetailPage = async ({
  params,
}: {
  params: { studentId: string };
}) => {
  const [student, majors] = await Promise.all([
    prisma.student.findUnique({
      where: {
        id: params.studentId,
      },
    }),

    prisma.major.findMany(),
  ]);

  const options = majors.map((major) => ({
    label: major.name,
    value: major.id,
  }));

  return (
    <div className="mx-auto max-w-[58rem] w-full space-y-4 p-4">
      <StudentForm initialValues={student} options={options} />
    </div>
  );
};

export default StudentDetailPage;
