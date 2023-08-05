'use server';

import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from './client';

export const logout = async (authToken: string) => {
  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET!);
    const { id } = decoded as { id: number };
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        authToken: null,
      },
    });
    if (!user) throw new Error('User not found');

    return user;
  } catch (error: any) {
    throw new Error(`Something went wrong ${error.message}`);
  }
};

export const fetchSession = async (authToken: string) => {
  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET!);
    const { id } = decoded as { id: number };

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new Error('User not found');
    return user;
  } catch (error: any) {
    throw new Error(`Something went wrong ${error.message}`);
  }
};

export const login = async (username: string, password: string) => {
  try {
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
    if (!userUpdatedWithJWT) throw new Error('Error updating user with JWT');

    return userUpdatedWithJWT;
  } catch (error: any) {
    throw new Error(`Something went wrong ${error.message}`);
  }
};

export const register = async (username: string, password: string) => {
  try {
    const hashedPassword = bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        password: await hashedPassword,
      },
    });

    return user;
  } catch (error: any) {
    throw new Error(`Something went wrong ${error.message}`);
  }
};
