import { z } from 'zod';

export const loginSchema = z.object({
    email: z.email("Must be a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters long").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
});

export const registerSchema = z.object({
    name: z.string().min(5),
    email: z.email("Must be a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters long").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
});
