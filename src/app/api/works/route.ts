import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const works = await prisma.work.findMany({
      where: category ? { category } : undefined,
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    const parsed = works.map((w) => ({
      ...w,
      images: JSON.parse(w.images),
    }));

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("GET /api/works error:", error);
    return NextResponse.json(
      { error: "获取作品失败" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: "未授权" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, category, images, videoUrl, featured, order } =
      body;

    if (!title || !category) {
      return NextResponse.json(
        { error: "缺少必填字段" },
        { status: 400 }
      );
    }

    const work = await prisma.work.create({
      data: {
        title,
        description: description || "",
        category,
        images: JSON.stringify(images || []),
        videoUrl: videoUrl || null,
        featured: featured || false,
        order: order || 0,
      },
    });

    return NextResponse.json({
      ...work,
      images: JSON.parse(work.images),
    });
  } catch (error) {
    console.error("POST /api/works error:", error);
    return NextResponse.json(
      { error: "创建作品失败" },
      { status: 500 }
    );
  }
}
