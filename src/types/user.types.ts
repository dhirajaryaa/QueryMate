import { users } from '@/db/schema/user.schema';

export type User = typeof users.$inferSelect;

//? for db insert
export type NewUser = typeof users.$inferInsert;

//! remove password field form user
export type SafeUser = Omit<User, "password">;