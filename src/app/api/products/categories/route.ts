import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");
  const categories = await db.category.findMany({
    where: {
      name: {
        contains: name || undefined,
      },
    },
  });
  return new NextResponse(JSON.stringify(categories.map((e) => e.name)), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}