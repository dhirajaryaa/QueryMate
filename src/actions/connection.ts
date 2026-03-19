"use server";

//! all exported function use Action end with name to identify easily server action function

import { db } from "@/db";
import { connection } from "@/db/schema";
import { auth } from "@/lib/auth";
import { testDatabaseConnection } from "@/lib/db/test.connection";
import { AppError } from "@/lib/errors";
import {
  connectionSchema,
  editConnectionSchema,
} from "@/schema/connection.schema";
import {
  ConnectionEditInput,
  ConnectionInput,
  ConnectionResponse,
  ConnectionsList,
  EditConnection,
  GetConnection,
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
  try {
    // check schema
    const valid = connectionSchema.safeParse(payload);
    if (!valid.success) {
      throw new AppError("bad_request:api", z.prettifyError(valid.error));
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
  } catch (error) {
    return handleServerActionError(error);
  }
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

//? list all connection [for select db input]
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

//get connection
export async function getConnectionAction(
  connId: string,
): Promise<GetConnection> {
  try {
    if (!connId) {
      throw new AppError("bad_request:api", "connection id is invalid.");
    }
    // session get
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      throw new AppError("unauthorized:auth");
    }
    // get connection
    const [conn] = await db
      .select()
      .from(connection)
      .where(eq(connection.id, connId))
      .limit(1);

    if (!conn) {
      throw new AppError("not_found:api", "Connection not found!");
    }

    return { success: true, data: conn };
  } catch (error) {
    return handleServerActionError(error);
  }
}

// edit connection
export async function editConnectionAction(
  connId: string,
  payload: ConnectionEditInput,
): Promise<EditConnection> {
  try {
    // check schema
    const valid = editConnectionSchema.safeParse(payload);
    if (!valid.success) {
      throw new AppError("bad_request:api", z.prettifyError(valid.error));
    }

    // session get
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      throw new AppError("unauthorized:auth");
    }
    // save in db
    const [data] = await db
      .update(connection)
      .set({
        ...payload,
      })
      .where(eq(connection.id, connId))
      .returning();

    return { success: true, data };
  } catch (error) {
    return handleServerActionError(error);
  }
}
