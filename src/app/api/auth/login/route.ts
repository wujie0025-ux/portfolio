import { NextRequest, NextResponse } from "next/server";
import { createToken, setAuthCookie, verifyPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (!password || password !== adminPassword) {
      return NextResponse.json(
        { error: "密码错误" },
        { status: 401 }
      );
    }

    const token = await createToken();
    await setAuthCookie(token);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "登录失败" },
      { status: 500 }
    );
  }
}
