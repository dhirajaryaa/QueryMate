"use server";

//! all exported function use Action end with name to identify easily server action function

import { db } from "@/db";
import { connection } from "@/db/schema";
import { auth } from "@/lib/auth";
import { testDatabaseConnection } from "@/lib/db/test.connection";
import { connectionSchema } from "@/schema/connection.schema";
import {
  ConnectionInput,
  ConnectionResponse,
  ConnectionsList,
  GetConnections,
  NewConnection,
} from "@/types/connection.types";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { z } from "zod";

export async function createNewConnectionAction(
  payload: ConnectionInput,
): Promise<ConnectionResponse> {
  // check schema
  const valid = connectionSchema.safeParse(payload);
  if (!valid.success) {
    return { success: false, error: z.prettifyError(valid.error) };
  }

  // session get
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { success: false, error: "UnAuthorized Request!" };
  }
  // save in db
  const data = await db
    .insert(connection)
    .values({
      ...payload,
      userId: session.user.id,
    })
    .returning();

  return { success: true, data };
}

// test connection
export async function testConnectionAction(payload: ConnectionInput): Promise<{
  success: boolean;
  error?: string;
}> {
  return await testDatabaseConnection(payload);
}

// get connection list
export async function getConnectionAction(): Promise<GetConnections> {
  // session get
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { succuss: false, error: "UnAuthorized Request!" };
  }
  // get all connection
  const allConn = await db
    .select()
    .from(connection)
    .where(eq(connection.userId, session.user.id));

  // stats list
  const stats = {
    total: 0,
    pending: 0,
    active: 0,
    issus: 0,
  };
  if (allConn && allConn.length < 0) {
    return { succuss: true, data: [], stats };
  }

  stats.total = allConn.length;
  stats.pending = allConn.filter((d) => d.status === "pending").length;
  stats.active = allConn.filter((d) => d.status === "active").length;
  stats.issus = allConn.filter((d) => d.status === "issus").length;

  return { succuss: true, data: allConn, stats };
}

export async function connectionsListAction(): Promise<ConnectionsList> {
  // session get
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { success: false, error: "UnAuthorized Request!" };
  }
  // get all connection
  const allConn = await db
    .select({
      id: connection.id,
      name: connection.name,
      type: connection.type,
    })
    .from(connection)
    .where(eq(connection.userId, session.user.id));

  return { success: true, data: allConn };
}
