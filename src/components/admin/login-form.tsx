"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Loader2 } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "登录失败");
      }
    } catch {
      setError("网络错误，请重试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-sm"
    >
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-[#f5f5f5] flex items-center justify-center mx-auto mb-4">
          <Lock size={24} className="text-[#1a1a1a]" />
        </div>
        <h1 className="text-2xl font-semibold text-[#1a1a1a]">管理员登录</h1>
        <p className="mt-2 text-sm text-[#888]">请输入密码以管理作品集</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[#1a1a1a] mb-1.5"
          >
            密码
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mono-input"
            placeholder="请输入管理密码"
            autoFocus
            required
          />
          {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={loading || !password}
          className="mono-btn-primary w-full"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              验证中...
            </span>
          ) : (
            "登录"
          )}
        </button>
      </form>
    </motion.div>
  );
}
