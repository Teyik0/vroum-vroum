import prisma from '@/utils/client';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const userParams = await request.json();
    const { username, password } = userParams;

    if (!username || !password) {
      throw new Error('Username and password are required');
    }

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) throw new Error('User not found');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid password');

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '4h',
    });

    const userUpdatedWithJWT = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        authToken: token,
      },
    });

    return new Response(JSON.stringify(userUpdatedWithJWT));
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
