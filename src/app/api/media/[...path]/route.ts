import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

const UPLOAD_DIR = path.join(process.cwd(), "data", "uploads");

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".avi": "video/x-msvideo",
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathSegments } = await params;
    const filename = pathSegments[pathSegments.length - 1];

    // Security: prevent directory traversal
    if (filename.includes("..") || filename.includes("/")) {
      return NextResponse.json({ error: "禁止访问" }, { status: 403 });
    }

    const filePath = path.join(UPLOAD_DIR, filename);

    if (!existsSync(filePath)) {
      return NextResponse.json({ error: "文件不存在" }, { status: 404 });
    }

    const buffer = await readFile(filePath);
    const ext = path.extname(filename).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Length": buffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("GET /api/media error:", error);
    return NextResponse.json({ error: "读取文件失败" }, { status: 500 });
  }
}
