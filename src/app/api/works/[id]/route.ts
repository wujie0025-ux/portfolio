import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: "未授权" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, description, category, images, videoUrl, featured, order } =
      body;

    const data: Record<string, unknown> = {};
    if (title !== undefined) data.title = title;
    if (description !== undefined) data.description = description;
    if (category !== undefined) data.category = category;
    if (images !== undefined) data.images = JSON.stringify(images);
    if (videoUrl !== undefined) data.videoUrl = videoUrl;
    if (featured !== undefined) data.featured = featured;
    if (order !== undefined) data.order = order;

    const work = await prisma.work.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      ...work,
      images: JSON.parse(work.images),
    });
  } catch (error) {
    console.error("PATCH /api/works error:", error);
    return NextResponse.json(
      { error: "更新作品失败" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: "未授权" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.work.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/works error:", error);
    return NextResponse.json(
      { error: "删除作品失败" },
      { status: 500 }
    );
  }
}
