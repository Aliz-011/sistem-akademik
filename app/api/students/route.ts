import { NextRequest } from 'next/server';

import { validateRequest } from '@/auth';
import { prisma } from '@/lib/database';

export async function GET(req: NextRequest) {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let conditions = [];
    let where: any = {};

    const majorId = req.nextUrl.searchParams.get('majorId') || undefined;
    const fullName = req.nextUrl.searchParams.get('fullName') || undefined;
    const nim = req.nextUrl.searchParams.get('nim') || undefined;

    if (majorId) {
      conditions.push({ majorId: { equals: majorId } });
    }

    if (fullName) {
      conditions.push({ fullName: { search: fullName, mode: 'insensitive' } });
    }

    if (nim) {
      conditions.push({ nim: { equals: nim } });
    }

    // If there are any conditions, use OR to combine them
    if (conditions.length > 0) {
      where.OR = conditions;
    } else {
      // If no conditions are provided, don't apply any filters
      where = {};
    }

    const data = await prisma.student.findMany({
      where,
      include: {
        major: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ erorr: 'Internal error' }, { status: 500 });
  }
}
