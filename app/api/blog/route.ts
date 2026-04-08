import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { slug, title, content, id } = body;

    console.log("before db push:", slug);
    console.log("before db push id is :", id);

    const res = await prisma.blog.create({
      data: {
        userId: id,
        slug,
        title,
        content
      },
      select: {
        slug: true
      }
    });

    console.log("result in api is:", res);

    return NextResponse.json(
      { message: "blog created success", data: res },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      { error: "blog creation failed" },
      { status: 500 }
    );
  }
}
