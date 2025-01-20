import { Role } from '@prisma/client';

export type TAuthUser = {
	email: string;
	role: Role;
} | null;
