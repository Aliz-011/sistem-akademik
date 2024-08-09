import { validateRequest } from '@/auth';
import { prisma } from '@/lib/database';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let conditions = [];
    let where: any = {};

    const majorId = req.nextUrl.searchParams.get('majorId') || undefined;
    const name = req.nextUrl.searchParams.get('name') || undefined;
    const alias = req.nextUrl.searchParams.get('alias') || undefined;

    if (majorId) {
      conditions.push({ majorId: { equals: majorId } });
    }

    if (name) {
      conditions.push({ name: { search: name, mode: 'insensitive' } });
    }

    if (alias) {
      conditions.push({ alias: { equals: alias } });
    }

    // If there are any conditions, use OR to combine them
    if (conditions.length > 0) {
      where.OR = conditions;
    } else {
      // If no conditions are provided, don't apply any filters
      where = {};
      return new Response();
    }

    const data = await prisma.subject.findMany({
      where,
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
    });

    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ erorr: 'Internal error' }, { status: 500 });
  }
}
