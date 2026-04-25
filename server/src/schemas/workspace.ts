import { z } from 'zod';

export const createWorkspaceSchema = z.object({
  name: z.string().min(2),
});

export const addMemberSchema = z.object({
  userId: z.string(),
});