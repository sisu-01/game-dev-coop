import { connectToDb } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  if (request.method === "POST") {
    try {
      const { searchParams } = await request.json();
      if (!asdf) {
        return NextResponse.json({ error: "message" }, { status: 400 });
      }
      await connectToDb();
      return NextResponse.json({ message: "message", asdf });
    } catch (error) {
      return NextResponse.json({ error: "message" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
};