import { prisma } from '@/lib/database';
import { SubjectForm } from './subject-form';

export interface GroupedData {
  [key: string]: Array<{ value: string; label: string }>;
}

const SubjectDetailPage = async ({ subjectId }: { subjectId: string }) => {
  const [majors, subject, curriculums, lecturers] = await Promise.all([
    prisma.major.findMany({
      select: {
        id: true,
        name: true,
      },
    }),

    prisma.subject.findFirst({
      where: {
        id: subjectId,
      },
      include: {
        major: {
          select: {
            id: true,
            name: true,
          },
        },
        curriculum: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }),

    prisma.curriculum.findMany({
      select: {
        id: true,
        name: true,
        major: {
          select: {
            name: true,
          },
        },
      },
    }),

    prisma.lecturer.findMany({
      select: {
        id: true,
        fullName: true,
      },
    }),
  ]);

  const majorOptions = majors.map((major) => ({
    label: major.name,
    value: major.id,
  }));

  const lecturerOptions = lecturers.map((lecturer) => ({
    label: lecturer.fullName,
    value: lecturer.id,
  }));

  const groupedData = curriculums.reduce<GroupedData>((acc, item) => {
    const majorName = item.major.name;
    if (!acc[majorName]) {
      acc[majorName] = [];
    }
    acc[majorName].push({
      value: item.id,
      label: item.name,
    });
    return acc;
  }, {});

  const curriculumOptions = Object.entries(groupedData).map(
    ([majorName, items]) => ({
      label: majorName,
      items: items,
    })
  );

  return (
    <div className="mx-auto max-w-[58rem] w-full space-y-4 p-4">
      <SubjectForm
        majorOptions={majorOptions}
        curriculumOptions={curriculumOptions}
        lecturerOptions={lecturerOptions}
      />
    </div>
  );
};

export default SubjectDetailPage;
