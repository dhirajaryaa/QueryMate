import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function Post(req: NextRequest) {
  // session check
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    NextResponse.json({ message: "UnAuthorized Request" }, { status: 401 });
  }
  // prompt get
  const { prompt } = await req.json();
  if (!prompt) {
    NextResponse.json({ message: "Bad Request" }, { status: 400 });
  };


  try {
  } catch (error) {
    NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
  }
}
