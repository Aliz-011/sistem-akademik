import { NextRequest } from 'next/server';

import { prisma } from '@/lib/database';
import { validateRequest } from '@/auth';

export async function GET(req: NextRequest) {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const majorId = req.nextUrl.searchParams.get('majorId') || undefined;

    let where: any = {};

    if (majorId) {
      where.majorId = majorId;
    }

    const data = await prisma.curriculum.findMany({
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
