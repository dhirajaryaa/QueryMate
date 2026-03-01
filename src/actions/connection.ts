'use server';

import { ConnectionInput, ConnectionResponse } from "@/types/connection.types";

export async function createNewConnection(payload: ConnectionInput): Promise<ConnectionResponse> {

    console.log(payload);
    

    return { success: false, error: "invalid uri" }
}