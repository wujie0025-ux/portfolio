import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import { createWriteStream } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { Readable } from "stream";

export const maxDuration = 120; // 2 minutes for large files

const UPLOAD_DIR = path.join(process.cwd(), "data", "uploads");

export async function POST(request: NextRequest) {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: "未授权" }, { status: 401 });
    }

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "没有文件" }, { status: 400 });
    }

    await mkdir(UPLOAD_DIR, { recursive: true });

    const urls: string[] = [];

    for (const file of files) {
      const ext = file.name.split(".").pop() || "jpg";
      const filename = `${randomUUID()}.${ext}`;
      const filePath = path.join(UPLOAD_DIR, filename);

      // Stream file to disk to handle large files
      const bytes = await file.arrayBuffer();
      await writeFile(filePath, new Uint8Array(bytes));

      urls.push(`/api/media/${filename}`);
    }

    return NextResponse.json({ urls });
  } catch (error) {
    console.error("POST /api/upload error:", error);
    return NextResponse.json({ error: "上传失败，请检查文件大小" }, { status: 500 });
  }
}
