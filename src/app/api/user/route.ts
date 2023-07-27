import prisma from '@/utils/client';
import * as bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const userParams = await request.json();
    const { username, password } = userParams;

    const hashedPassword = bcrypt.hash(password, 10);

    if (!username || !password) {
      throw new Error('Username and password are required');
    }

    const user = await prisma.user.create({
      data: {
        username,
        password: await hashedPassword,
      },
    });

    return new Response(JSON.stringify(user));
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
