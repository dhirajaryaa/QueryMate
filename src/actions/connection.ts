"use server";

//! all exported function use Action end with name to identify easily server action function

import { db } from "@/db";
import { connection } from "@/db/schema";
import { auth } from "@/lib/auth";
import { testDatabaseConnection } from "@/lib/db/test.connection";
import { AppError } from "@/lib/errors";
import { connectionSchema } from "@/schema/connection.schema";
import {
  ConnectionInput,
  ConnectionResponse,
  ConnectionsList,
  GetConnections,
  TestConnection,
} from "@/types/connection.types";
import { handleServerActionError } from "@/utils/handle-errors";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { z } from "zod";

//new connection
export async function createNewConnectionAction(
  payload: ConnectionInput,
): Promise<ConnectionResponse> {
  // check schema
  const valid = connectionSchema.safeParse(payload);
  if (!valid.success) {
    return {
      success: false,
      error: new AppError(
        "bad_request:api",
        z.prettifyError(valid.error),
      ).toJson(),
    };
  }

  // session get
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw new AppError("unauthorized:auth");
  }
  // save in db
  const [data] = await db
    .insert(connection)
    .values({
      ...payload,
      userId: session.user.id,
    })
    .returning({ id: connection.id });

  return { success: true, data };
}

// test connection
export async function testConnectionAction(
  payload: ConnectionInput,
): Promise<TestConnection> {
  try {
    const res = await testDatabaseConnection(payload);
    if (res.error) {
      return {
        success: false,
        error: new AppError("bad_request:api", res.error).toJson(),
      };
    }
    return { success: true, data: null };
  } catch (error) {
    return handleServerActionError(error);
  }
}

// get connection list
export async function getConnectionsAction(): Promise<GetConnections> {
  try {
    // session get
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      throw new AppError("unauthorized:auth");
    }
    // get all connection
    const allConn = await db
      .select()
      .from(connection)
      .where(eq(connection.userId, session.user.id));

    // stats list
    const stats = {
      total: allConn.length ?? 0,
      pending: 0,
      active: 0,
      issus: 0,
    };
    for (const conn of allConn) {
      if (conn.status === "active") stats.active++;
      if (conn.status === "issus") stats.issus++;
      if (conn.status === "pending") stats.pending++;
    }

    return { success: true, data: { connections: allConn, stats } };
  } catch (error) {
    return handleServerActionError(error);
  }
}

// list all connection
export async function connectionsListAction(): Promise<ConnectionsList> {
  try {
    // session get
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      throw new AppError("unauthorized:auth");
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
  } catch (error) {
    return handleServerActionError(error);
  }
}
