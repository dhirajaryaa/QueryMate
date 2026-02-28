import { user } from '@/db/schema/user.schema';

export type User = typeof user.$inferSelect;

//? for db insert
export type NewUser = typeof user.$inferInsert;

//! remove password field form user
export type SafeUser = Omit<User, "password">;