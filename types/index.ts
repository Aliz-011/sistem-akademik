import { Prisma, User } from '@prisma/client';

export type UserData = Omit<User, 'createdAt'> & {
  createdAt: string;
};

export const majorSelect = {
  id: true,
  name: true,
} satisfies Prisma.MajorSelect;

export const curriculumSelect = {
  id: true,
  name: true,
} satisfies Prisma.CurriculumSelect;

export const getStudentDataInclude = () => {
  return {
    major: {
      select: majorSelect,
    },
  } satisfies Prisma.StudentInclude;
};

export type StudentData = Prisma.StudentGetPayload<{
  include: ReturnType<typeof getStudentDataInclude>;
}>;

export type SubjectData = Prisma.SubjectGetPayload<{
  include: {
    curriculum: {
      select: typeof curriculumSelect;
    };
    major: {
      select: typeof majorSelect;
    };
  };
}>;

export type CurriculumData = Prisma.CurriculumGetPayload<{
  include: {
    major: {
      select: typeof majorSelect;
    };
  };
}>;
