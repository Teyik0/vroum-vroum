import prisma from '@/utils/client';
import jwt from 'jsonwebtoken';

export async function GET(request: Request) {
  try {
    const authorization = request.headers.get('Authorization');
    if (!authorization) throw new Error('Authorization header is required');

    const token = authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const { id } = decoded as { id: number };

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new Error('User not found');

    return new Response(JSON.stringify(user));
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
