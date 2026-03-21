"use server";

//! all exported function use Action end with name to identify easily server action function

import { db } from "@/db";
import { connection, connectionSchema } from "@/db/schema";
import { auth } from "@/lib/auth";
import { GetDbSchema } from "@/lib/db/schema";
import { testDatabaseConnection } from "@/lib/db/test.connection";
import { AppError } from "@/lib/errors";
import {
  addConnectionSchema,
  editConnectionSchema,
} from "@/schema/connection.schema";
import {
  ConnectionEditInput,
  ConnectionInput,
  ConnectionResponse,
  ConnectionSchemaRefresh,
  ConnectionsList,
  DeleteConnection,
  EditConnection,
  GetConnection,
  GetConnections,
  GetConnectionSchema,
  TestConnection,
} from "@/types/connection.types";
import { handleServerActionError } from "@/utils/handle-errors";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { z } from "zod";

//new connection
export async function createNewConnectionAction(
  payload: ConnectionInput,
): Promise<ConnectionResponse> {
  try {
    // check schema
    const valid = addConnectionSchema.safeParse(payload);
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

// connection schema refresh
export async function connectionSchemaRefreshAction(
  connId: string,
): Promise<ConnectionSchemaRefresh> {
  try {
    // session get
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      throw new AppError("unauthorized:auth");
    }

    // connection find
    const [conn] = await db
      .select()
      .from(connection)
      .where(eq(connection.id, connId))
      .limit(1);
    if (!conn) {
      throw new AppError("not_found:api", "Connection not found!");
    }

    const rowSchema = await GetDbSchema(connId);

    if (!rowSchema) {
      throw new AppError("bad_request:database", "failed to fetch schema");
    }
    const [schema] = await db
      .select()
      .from(connectionSchema)
      .where(eq(connectionSchema.connectionId, conn.id));

    if (!schema) {
      await db
        .insert(connectionSchema)
        .values({
          connectionId: conn.id,
          structure: rowSchema.schema,
          relationships: rowSchema.relations,
        })
        .returning();
    }

    // update schema
    await db
      .update(connectionSchema)
      .set({
        structure: rowSchema.schema,
        relationships: rowSchema.relations,
      })
      .where(eq(connectionSchema.connectionId, conn.id));

    // status updata
    await db
      .update(connection)
      .set({ status: "active" })
      .where(eq(connection.id, conn.id));

    return { success: true, data: schema };
  } catch (error) {
    return handleServerActionError(error);
  }
}

// delete connection
export async function connectionDeleteAction(
  connId: string,
): Promise<DeleteConnection> {
  try {
    // session get
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      throw new AppError("unauthorized:auth");
    }

    // connection find
    const [conn] = await db
      .delete(connection)
      .where(
        and(eq(connection.id, connId), eq(connection.userId, session.user.id)),
      )
      .returning({ connectionId: connection.id });
    if (!conn) {
      throw new AppError("not_found:api", "Connection not found!");
    }

    return { success: true, data: null };
  } catch (error) {
    return handleServerActionError(error);
  }
}

//connection schema get
export async function getConnectionSchemaAction(
  connId: string,
): Promise<GetConnectionSchema> {
  try {
    // session get
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      throw new AppError("unauthorized:auth");
    }

    // connection schema find
    const [schema] = await db
      .select()
      .from(connectionSchema)
      .where(and(eq(connectionSchema.connectionId, connId)))
      .limit(1);
    if (!schema) {
      throw new AppError("not_found:api", "Connection not found!");
    }

    return { success: true, data: schema };
  } catch (error) {
    return handleServerActionError(error);
  }
}
