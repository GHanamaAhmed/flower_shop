import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";
import JSXStyle from "styled-jsx/style";
export async function DELETE(req: NextRequest) {
  try {
    const { ids }: { ids: string[] } = await req.json();
    const res = await cloudinary.v2.api.delete_resources(ids);
    return new NextResponse(JSON.stringify(res), {
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return new NextResponse(JSON.stringify(error), {
      status: error?.error?.http_code || 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
