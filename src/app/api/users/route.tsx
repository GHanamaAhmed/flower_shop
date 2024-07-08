import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import { db } from "@/lib/db";
import { UserRoles } from "@/types/users";

type BodyDelteProps = {
  ids: string[];
};
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(options);
  if (!session?.user) return new NextResponse(null, { status: 401 }); // Unauthorized
  const user = db.user.findUnique({
    where: { id: session?.user.id, role: UserRoles.admin },
  });
  if (!user) return new NextResponse(null, { status: 403 }); // Forbidden
  const { ids }: BodyDelteProps = await req.json();
  console.log(ids);

  const users = await db.user.deleteMany({
    where: {
      id: {
        in: ids || [],
      },
    },
  });
  console.log(users);

  return new NextResponse(null, { status: 204 }); // No Content
}
