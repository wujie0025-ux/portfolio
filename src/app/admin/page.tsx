"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  LogOut,
  Edit3,
  Trash2,
  Loader2,
  ImagePlus,
  X,
  GripVertical,
} from "lucide-react";
import { categories, getCategoryLabel } from "@/lib/utils";

interface Work {
  id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  videoUrl?: string | null;
  featured: boolean;
  order: number;
  createdAt: string;
}

const emptyWork = {
  title: "",
  description: "",
  category: "poster",
  images: [] as string[],
  videoUrl: "",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Work | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyWork);
  const [uploading, setUploading] = useState(false);
  const [pdfUploading, setPdfUploading] = useState(false);
  const [videoUploading, setVideoUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchWorks = useCallback(async () => {
    const res = await fetch("/api/works");
    const data = await res.json();
    setWorks(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchWorks();
  }, [fetchWorks]);

  // Upload images
  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    const fd = new FormData();
    Array.from(files).forEach((f) => fd.append("files", f));

    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const { urls } = await res.json();
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...urls],
      }));
    } catch {
      alert("上传失败");
    } finally {
      setUploading(false);
    }
  }

  // Remove image
  function removeImage(index: number) {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  }

  // Upload video
  async function handleVideoUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setVideoUploading(true);
    const fd = new FormData();
    fd.append("files", files[0]);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const { urls } = await res.json();
      if (urls.length > 0) {
        setForm((prev) => ({ ...prev, videoUrl: urls[0] }));
      }
    } catch {
      alert("视频上传失败");
    } finally {
      setVideoUploading(false);
    }
  }

  // Remove video
  function removeVideo() {
    setForm((prev) => ({ ...prev, videoUrl: "" }));
  }

  // Upload PDF
  async function handlePdfUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setPdfUploading(true);
    const fd = new FormData();
    Array.from(files).forEach((f) => fd.append("files", f));

    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const { urls } = await res.json();
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...urls],
      }));
    } catch {
      alert("PDF 上传失败");
    } finally {
      setPdfUploading(false);
    }
  }

  // Save work
  async function handleSave() {
    if (!form.title) return;
    setSaving(true);

    try {
      const body = {
        ...form,
        videoUrl: form.videoUrl || null,
      };

      const url = editing
        ? `/api/works/${editing.id}`
        : "/api/works";
      const method = editing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        resetForm();
        fetchWorks();
      } else {
        const data = await res.json();
        alert(data.error || "保存失败");
      }
    } catch {
      alert("保存失败");
    } finally {
      setSaving(false);
    }
  }

  // Delete work
  async function handleDelete(id: string) {
    if (!confirm("确定删除该作品？此操作不可恢复。")) return;
    setDeleting(id);
    try {
      await fetch(`/api/works/${id}`, { method: "DELETE" });
      fetchWorks();
    } catch {
      alert("删除失败");
    } finally {
      setDeleting(null);
    }
  }

  // Edit work
  function startEdit(work: Work) {
    setEditing(work);
    setForm({
      title: work.title,
      description: work.description,
      category: work.category,
      images: work.images,
      videoUrl: work.videoUrl || "",
    });
    setCreating(true);
  }

  function resetForm() {
    setEditing(null);
    setCreating(false);
    setForm(emptyWork);
  }

  // Logout
  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#1a1a1a]">
            作品管理
          </h1>
          <p className="text-sm text-[#888] mt-1">
            共 {works.length} 个作品
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCreating(true)}
            className="mono-btn-primary flex items-center gap-2 text-sm"
          >
            <Plus size={16} />
            新增作品
          </button>
          <button
            onClick={handleLogout}
            className="mono-btn-ghost flex items-center gap-1.5 text-sm text-[#888]"
          >
            <LogOut size={16} />
            退出
          </button>
        </div>
      </div>

      {/* Work list */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 skeleton rounded-xl" />
          ))}
        </div>
      ) : works.length === 0 ? (
        <div className="text-center py-20 text-[#888]">
          <p className="text-lg">还没有作品</p>
          <p className="text-sm mt-2">点击右上角按钮添加第一个作品</p>
        </div>
      ) : (
        <div className="space-y-2">
          {works.map((work, i) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#e5e5e5] hover:border-[#e5e5e5] transition-colors"
            >
              {/* Thumbnail */}
              <div className="w-14 h-14 rounded-lg bg-[#f5f5f5] overflow-hidden flex-shrink-0">
                {work.images[0] ? (
                  <img
                    src={work.images[0]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImagePlus size={18} className="text-[#888]/40" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-[#1a1a1a] truncate">
                  {work.title}
                </h3>
                <p className="text-xs text-[#888] mt-0.5">
                  {getCategoryLabel(work.category)} ·{" "}
                  {new Date(work.createdAt).toLocaleDateString("zh-CN")}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => startEdit(work)}
                  className="p-2 rounded-lg hover:bg-[#f5f5f5] text-[#888] hover:text-[#1a1a1a] transition-colors"
                  title="编辑"
                >
                  <Edit3 size={15} />
                </button>
                <button
                  onClick={() => handleDelete(work.id)}
                  disabled={deleting === work.id}
                  className="p-2 rounded-lg hover:bg-red-50 text-[#888] hover:text-red-500 transition-colors"
                  title="删除"
                >
                  {deleting === work.id ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : (
                    <Trash2 size={15} />
                  )}
                </button>
                <GripVertical size={14} className="text-[#ddd] ml-1" />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create/Edit modal */}
      <AnimatePresence>
        {creating && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={resetForm}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[80vh] overflow-auto p-6"
            >
              <h2 className="text-lg font-semibold text-[#1a1a1a] mb-6">
                {editing ? "编辑作品" : "新增作品"}
              </h2>

              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
                    作品标题 *
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="mono-input"
                    placeholder="作品名称"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
                    分类
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="mono-input"
                  >
                    {categories.map((cat) => (
                      <option key={cat.key} value={cat.key}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Video */}
                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
                    作品视频 (可选)
                  </label>

                  {/* Uploaded video preview */}
                  {form.videoUrl ? (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f5f5f5] mb-3">
                      <video
                        src={form.videoUrl}
                        className="w-16 h-12 rounded-lg object-cover"
                        muted
                      />
                      <span className="text-xs text-[#666] flex-1 truncate">
                        {form.videoUrl.split("/").pop()}
                      </span>
                      <button
                        onClick={removeVideo}
                        className="p-1.5 rounded-full hover:bg-white text-[#888] transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-3 mb-3">
                      {/* Upload video button */}
                      <label className="flex-1 flex items-center justify-center gap-2 p-6 rounded-xl border-2 border-dashed border-[#e5e5e5] hover:border-[#1a1a1a] cursor-pointer transition-colors">
                        {videoUploading ? (
                          <>
                            <Loader2 size={18} className="animate-spin text-[#888]" />
                            <span className="text-sm text-[#888]">上传中...</span>
                          </>
                        ) : (
                          <>
                            <Plus size={18} className="text-[#888]" />
                            <span className="text-sm text-[#666]">上传视频</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={(e) => handleVideoUpload(e.target.files)}
                        />
                      </label>
                    </div>
                  )}

                  <p className="text-xs text-[#999] mb-2">
                    支持 MP4、WebM、MOV 格式，或填写外部链接
                  </p>
                  <input
                    type="url"
                    value={form.videoUrl && !form.videoUrl.startsWith("/api/media/") ? form.videoUrl : ""}
                    onChange={(e) =>
                      setForm({ ...form, videoUrl: e.target.value })
                    }
                    className="mono-input"
                    placeholder="或粘贴外部视频链接 https://..."
                  />
                </div>

                {/* Images */}
                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
                    作品图片
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {form.images.map((url, i) => (
                      <div
                        key={i}
                        className="relative w-20 h-20 rounded-lg overflow-hidden bg-[#f5f5f5]"
                      >
                        <img
                          src={url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removeImage(i)}
                          className="absolute top-0.5 right-0.5 p-0.5 rounded-full bg-black/50 text-white hover:bg-black/70"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                    <label className="w-20 h-20 rounded-lg border-2 border-dashed border-[#e5e5e5] hover:border-[#1a1a1a] flex items-center justify-center cursor-pointer transition-colors">
                      {uploading ? (
                        <Loader2 size={20} className="animate-spin text-[#888]" />
                      ) : (
                        <Plus size={20} className="text-[#888]" />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => handleUpload(e.target.files)}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-[#888]">
                    支持 JPG、PNG、WebP 格式
                  </p>
                </div>

                {/* PDF Files */}
                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">
                    PDF 文件 (可选)
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {form.images
                      .filter((url) => url.endsWith(".pdf"))
                      .map((url, i) => (
                        <div
                          key={`pdf-${i}`}
                          className="relative w-20 h-20 rounded-lg overflow-hidden bg-[#f5f5f5] flex items-center justify-center"
                        >
                          <span className="text-[10px] text-[#666] font-medium text-center px-1 leading-tight">
                            PDF
                          </span>
                          <button
                            onClick={() => {
                              const pdfs = form.images.filter((u) => u.endsWith(".pdf"));
                              const realIdx = form.images.indexOf(pdfs[i]);
                              removeImage(realIdx);
                            }}
                            className="absolute top-0.5 right-0.5 p-0.5 rounded-full bg-black/50 text-white hover:bg-black/70"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    <label className="w-20 h-20 rounded-lg border-2 border-dashed border-[#e5e5e5] hover:border-[#1a1a1a] flex items-center justify-center cursor-pointer transition-colors">
                      {pdfUploading ? (
                        <Loader2 size={20} className="animate-spin text-[#888]" />
                      ) : (
                        <Plus size={20} className="text-[#888]" />
                      )}
                      <input
                        type="file"
                        accept=".pdf"
                        multiple
                        className="hidden"
                        onChange={(e) => handlePdfUpload(e.target.files)}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-[#888]">支持 PDF 格式</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-[#e5e5e5]">
                <button
                  onClick={resetForm}
                  className="mono-btn-ghost text-sm"
                >
                  取消
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !form.title}
                  className="mono-btn-primary text-sm"
                >
                  {saving ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={14} className="animate-spin" />
                      保存中...
                    </span>
                  ) : editing ? (
                    "保存修改"
                  ) : (
                    "创建作品"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
