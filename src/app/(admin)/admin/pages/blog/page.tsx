"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { useBlogStore, BlogData } from "@/store/blogStore";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { apiCall } from "@/lib/apiClient";

const emptyForm: BlogData = {
  category: "",
  title: "",
  subtitle: "",
  picture: "",
  author: "",
  date: "",
  content: "",
  shortName: "",
  abbreviation: "",
};

const CATEGORY_GROUPS: { label: string; categories?: string[] }[] = [
  { label: "All" },
  {
    label: "News & Articles",
    categories: ["Press Releases", "Market Analysis", "Industry News", "Blog"],
  },
  {
    label: "Home Page",
    categories: ["Hero", "Capabilities", "Community", "Voices", "Careers"],
  },
  {
    label: "About Page",
    categories: [
      "About-Hero",
      "Pillars",
      "Rooted-Values",
      "Values",
      "Corporate",
      "Sustainability",
    ],
  },
  {
    label: "Projects Page",
    categories: ["Projects", "Pipeline", "Project-Steps"],
  },
  {
    label: "Community Solar",
    categories: ["Community-Energy"],
  },
  {
    label: "Landowners",
    categories: ["Landowners"],
  },
  {
    label: "Investment Plans",
    categories: ["Plans"],
  },
  {
    label: "Contact & Locations",
    categories: ["Locations", "Contact"],
  },
];

const PRESET_CATEGORIES = [
  "Press Releases",
  "Market Analysis",
  "Industry News",
  "Hero",
  "Capabilities",
  "Community",
  "Voices",
  "Careers",
  "About-Hero",
  "Pillars",
  "Rooted-Values",
  "Values",
  "Corporate",
  "Sustainability",
  "Community-Energy",
  "Landowners",
  "Projects",
  "Pipeline",
  "Project-Steps",
  "Plans",
  "Locations",
];

function getSectionBadge(category: string): { label: string; color: string } {
  const c = category?.toLowerCase().trim();
  switch (c) {
    case "hero":
      return { label: "Home > Hero", color: "text-amber-400 border-amber-500/30 bg-amber-500/10" };
    case "capabilities":
      return { label: "Home > Capabilities", color: "text-[#009ADE] border-[#009ADE]/30 bg-[#009ADE]/10" };
    case "community":
      return { label: "Home > Community", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" };
    case "voices":
      return { label: "Home > Voices Quote", color: "text-purple-400 border-purple-500/30 bg-purple-500/10" };
    case "careers":
      return { label: "Home/About > Careers", color: "text-sky-400 border-sky-500/30 bg-sky-500/10" };
    case "about-hero":
      return { label: "About > Hero", color: "text-pink-400 border-pink-500/30 bg-pink-500/10" };
    case "pillars":
      return { label: "About > What Drives Us", color: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10" };
    case "rooted-values":
      return { label: "About > Rooted Values", color: "text-teal-400 border-teal-500/30 bg-teal-500/10" };
    case "values":
      return { label: "About > 8 Values", color: "text-blue-400 border-blue-500/30 bg-blue-500/10" };
    case "corporate":
      return { label: "About > Corporate", color: "text-violet-400 border-violet-500/30 bg-violet-500/10" };
    case "sustainability":
      return { label: "About > Sustainability", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" };
    case "community-energy":
      return { label: "Community Solar Page", color: "text-amber-400 border-amber-500/30 bg-amber-500/10" };
    case "landowners":
      return { label: "Landowners Page", color: "text-lime-400 border-lime-500/30 bg-lime-500/10" };
    case "locations":
      return { label: "Contact > Location", color: "text-teal-400 border-teal-500/30 bg-teal-500/10" };
    case "projects":
      return { label: "Projects > Overview", color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10" };
    case "pipeline":
      return { label: "Projects > Pipeline", color: "text-blue-400 border-blue-500/30 bg-blue-500/10" };
    case "project-steps":
      return { label: "Projects > Every Step", color: "text-orange-400 border-orange-500/30 bg-orange-500/10" };
    case "plans":
      return { label: "Plans > Architecture", color: "text-green-400 border-green-500/30 bg-green-500/10" };
    case "press releases":
    case "market analysis":
    case "industry news":
    case "blog":
      return { label: "Newsroom Post", color: "text-[#e4c126] border-[#e4c126]/30 bg-[#e4c126]/10" };
    default:
      return { label: category || "General", color: "text-neutral-400 border-neutral-700 bg-neutral-800/40" };
  }
}

export default function AdminBlogPage() {
  const { blogs, isLoading, fetchBlogs, createBlog, updateBlog, deleteBlog } = useBlogStore();

  const [activeGroup, setActiveGroup] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<BlogData | null>(null);
  const [form, setForm] = useState<BlogData>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<BlogData | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToastMsg(msg);
    setToastType(type);
    setTimeout(() => setToastMsg(null), 4000);
  };

  useEffect(() => {
    fetchBlogs(true);
  }, []);

  const openCreate = () => {
    setEditTarget(null);
    setForm({
      ...emptyForm,
      category: activeGroup !== "All" && CATEGORY_GROUPS.find(g => g.label === activeGroup)?.categories?.[0] || "News",
      author: "New Energy Holdings",
      date: new Date().toISOString().slice(0, 10),
    });
    setImageFile(null);
    setImagePreview("");
    setFormError(null);
    setModalOpen(true);
  };

  const openEdit = (blog: BlogData) => {
    setEditTarget(blog);
    setForm({
      category: blog.category,
      title: blog.title,
      subtitle: blog.subtitle || "",
      picture: blog.picture || "",
      author: blog.author,
      date: blog.date,
      content: blog.content,
      shortName: blog.shortName || "",
      abbreviation: blog.abbreviation || "",
    });
    setImageFile(null);
    setImagePreview(blog.picture || "");
    setFormError(null);
    setModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) return form.picture || "";
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", imageFile);
      const data = await apiCall<{ success: boolean; url: string }>("/api/upload", {
        method: "POST",
        body: fd,
      });
      return data.url || form.picture || "";
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.category || !form.title || !form.author || !form.date || !form.content) {
      return setFormError("Category, title, author, date, and content are required.");
    }
    setSubmitting(true);
    setFormError(null);
    try {
      const pictureUrl = await uploadImage();
      const payload = { ...form, picture: pictureUrl };
      const res = editTarget?._id
        ? await updateBlog(editTarget._id, payload)
        : await createBlog(payload);
      if (res.success) {
        showToast(editTarget ? "Write-up updated successfully." : "Write-up created successfully.");
        setModalOpen(false);
      } else {
        setFormError(res.error || "Failed to save.");
      }
    } catch (err: any) {
      console.error(err);
      setFormError(err.message || "Failed to upload image or save write-up.");
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget?._id) return;
    setDeleting(true);
    const res = await deleteBlog(deleteTarget._id);
    setDeleting(false);
    if (res.success) showToast("Write-up deleted.");
    else showToast(res.error || "Failed.", "error");
    setDeleteTarget(null);
  };

  // Filtered list based on group tab & search
  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      // 1. Group filtering
      if (activeGroup !== "All") {
        const targetGroup = CATEGORY_GROUPS.find((g) => g.label === activeGroup);
        if (targetGroup?.categories) {
          const match = targetGroup.categories.some(
            (c) => c.toLowerCase() === b.category?.toLowerCase()
          );
          if (!match) return false;
        }
      }

      // 2. Search query filtering
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = b.title?.toLowerCase().includes(q);
        const inSubtitle = b.subtitle?.toLowerCase().includes(q);
        const inCategory = b.category?.toLowerCase().includes(q);
        const inAuthor = b.author?.toLowerCase().includes(q);
        const inShortName = b.shortName?.toLowerCase().includes(q);
        if (!inTitle && !inSubtitle && !inCategory && !inAuthor && !inShortName) {
          return false;
        }
      }

      return true;
    });
  }, [blogs, activeGroup, searchQuery]);

  return (
    <div className="p-[10px] md:p-8 flex flex-col gap-8 w-full min-h-screen">
      {/* Toast Feedback */}
      {toastMsg && (
        <div
          className={`fixed top-6 right-6 z-50 px-4 py-3 rounded-lg shadow-xl border text-xs font-bold flex items-center gap-2 ${
            toastType === "success"
              ? "bg-[#10141a]/95 border-[#528574] text-[#528574]"
              : "bg-[#10141a]/95 border-red-500/50 text-red-500"
          }`}
        >
          {toastType === "success" ? "✓" : "✗"} {toastMsg}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f1115] border-2 border-red-500/60 rounded-xl max-w-md w-full p-6 flex flex-col gap-6">
            <div className="flex items-center gap-3 border-b border-neutral-900 pb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#241315] text-[#f87171] border border-[#3d1e22]">
                <svg className="w-5 h-5 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h4 className="text-lg font-black text-white uppercase tracking-wider">Delete Write-up</h4>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Delete <span className="font-bold text-white">{deleteTarget.title}</span>?
              <br />
              <span className="text-xs text-neutral-500">
                Category: {deleteTarget.category}
              </span>
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded border border-neutral-800 text-neutral-400 hover:text-white bg-neutral-900/30 text-xs font-bold uppercase cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="px-5 py-2 rounded text-xs font-black uppercase cursor-pointer bg-red-600 hover:bg-red-500 text-white disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f1115] border border-neutral-800 rounded-xl w-full max-w-2xl flex flex-col shadow-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800 flex-shrink-0">
              <div className="flex flex-col">
                <h3 className="text-base font-black text-white">
                  {editTarget ? "Edit Page Write-up / Blog" : "New Page Write-up / Blog"}
                </h3>
                {editTarget && (
                  <span className="text-xs text-neutral-400">
                    Controls: {getSectionBadge(form.category).label}
                  </span>
                )}
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 py-6 overflow-y-auto flex-1 min-h-0">
              {formError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded p-3 text-xs text-red-400 font-bold">
                  {formError}
                </div>
              )}

              {/* Cover image */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-neutral-500 font-extrabold uppercase tracking-wider">
                  Associated Picture / Banner (Optional)
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-14 rounded border border-neutral-800 bg-neutral-900 overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {imagePreview ? (
                      <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                    ) : form.picture ? (
                      <img src={form.picture} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M21 12V6.75A2.25 2.25 0 0018.75 4.5H5.25A2.25 2.25 0 003 6.75v10.5A2.25 2.25 0 005.25 19.5H12" />
                      </svg>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white rounded cursor-pointer"
                    >
                      {imagePreview || form.picture ? "Change" : "Upload Image"}
                    </button>
                    {form.picture && (
                      <button
                        type="button"
                        onClick={() => {
                          setForm((f) => ({ ...f, picture: "" }));
                          setImagePreview("");
                          setImageFile(null);
                        }}
                        className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-xs font-bold text-red-400 rounded cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </div>
              </div>

              {/* Category & Author */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-neutral-500 font-extrabold uppercase tracking-wider">
                    Category / Target Section *
                  </label>
                  <div className="flex flex-col gap-1">
                    <input
                      type="text"
                      required
                      value={form.category}
                      onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                      className="bg-neutral-950 border border-neutral-800 px-4 py-2.5 rounded text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#e4c126]"
                      placeholder="e.g. Capabilities, Values, Hero"
                    />
                    {/* Quick Category Picker */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      <span className="text-[9px] text-neutral-500 uppercase font-black">Quick Pick:</span>
                      {["Hero", "Capabilities", "Values", "Pillars", "Locations", "Landowners", "Projects", "Press Releases"].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, category: cat }))}
                          className={`text-[9px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                            form.category.toLowerCase() === cat.toLowerCase()
                              ? "border-[#e4c126] text-[#e4c126] bg-[#e4c126]/10 font-bold"
                              : "border-neutral-800 text-neutral-400 hover:text-white"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-neutral-500 font-extrabold uppercase tracking-wider">
                    Author / Entity *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.author}
                    onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                    className="bg-neutral-950 border border-neutral-800 px-4 py-2.5 rounded text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#e4c126]"
                    placeholder="e.g. New Energy Holdings"
                  />
                </div>
              </div>

              {/* Title & Short Name */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-8 flex flex-col gap-1.5">
                  <label className="text-[10px] text-neutral-500 font-extrabold uppercase tracking-wider">
                    Title / Headline *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    className="bg-neutral-950 border border-neutral-800 px-4 py-2.5 rounded text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#e4c126]"
                    placeholder="Write-up title or section heading..."
                  />
                </div>

                <div className="sm:col-span-4 flex flex-col gap-1.5">
                  <label className="text-[10px] text-neutral-500 font-extrabold uppercase tracking-wider">
                    Short Tag / Metric (Optional)
                  </label>
                  <input
                    type="text"
                    value={form.shortName || ""}
                    onChange={(e) => setForm((f) => ({ ...f, shortName: e.target.value }))}
                    className="bg-neutral-950 border border-neutral-800 px-4 py-2.5 rounded text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#e4c126]"
                    placeholder="e.g. 6 GW, Step 01, Quality"
                  />
                </div>
              </div>

              {/* Subtitle */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-neutral-500 font-extrabold uppercase tracking-wider">
                  Subtitle / Summary Description
                </label>
                <input
                  type="text"
                  value={form.subtitle || ""}
                  onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
                  className="bg-neutral-950 border border-neutral-800 px-4 py-2.5 rounded text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#e4c126]"
                  placeholder="Optional summary, tagline, or author role..."
                />
              </div>

              {/* Date */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-neutral-500 font-extrabold uppercase tracking-wider">
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  className="bg-neutral-950 border border-neutral-800 px-4 py-2.5 rounded text-sm text-white focus:outline-none focus:border-[#e4c126]"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-neutral-500 font-extrabold uppercase tracking-wider">
                  Content / Body Text *
                </label>
                <RichTextEditor
                  value={form.content}
                  onChange={(html) => setForm((f) => ({ ...f, content: html }))}
                  placeholder="Enter detailed content, write-up, or article body..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting || uploading}
                className="w-full py-3 bg-[#e4c126] hover:bg-[#d8b520] disabled:bg-neutral-700 disabled:cursor-not-allowed text-neutral-900 font-extrabold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                {(submitting || uploading) && (
                  <div className="w-3.5 h-3.5 border-2 border-neutral-900/40 border-t-neutral-900 rounded-full animate-spin" />
                )}
                {uploading
                  ? "Uploading image..."
                  : submitting
                  ? "Saving write-up..."
                  : editTarget
                  ? "Save Changes"
                  : "Publish Write-up"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800/80 pb-6">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl font-black text-white tracking-tight">Website Write-ups &amp; Blog Posts</h1>
          <p className="text-xs text-neutral-400 font-medium">
            Manage all write-ups, section copy, and articles across the website. Any changes edited here immediately reflect on the respective pages.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchBlogs(true)}
            className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 text-neutral-300 px-4 py-3 rounded text-xs font-bold hover:text-white hover:border-neutral-700 transition-colors cursor-pointer"
            title="Refresh database records"
          >
            <svg className="w-4 h-4 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Refresh
          </button>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-[#e4c126] text-neutral-900 px-5 py-3 rounded text-xs font-black uppercase tracking-wider hover:bg-[#c9a71b] transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 stroke-[3] stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New Write-up
          </button>
        </div>
      </div>

      {/* Group Tabs & Search Bar */}
      <div className="flex flex-col gap-4">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {CATEGORY_GROUPS.map((group) => {
            const isActive = activeGroup === group.label;
            return (
              <button
                key={group.label}
                onClick={() => setActiveGroup(group.label)}
                className={`px-3.5 py-2 rounded-lg text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#e4c126] text-neutral-900 shadow-md shadow-[#e4c126]/10"
                    : "bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800"
                }`}
              >
                {group.label}
              </button>
            );
          })}
        </div>

        {/* Search & Count Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#13151a]/60 border border-neutral-800/80 p-3 rounded-lg">
          <div className="relative w-full sm:w-96">
            <svg className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search write-ups by title, subtitle, or category..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-md pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#e4c126]"
            />
          </div>
          <div className="text-xs text-neutral-400 font-semibold self-end sm:self-center">
            Showing <span className="text-white font-bold">{filteredBlogs.length}</span> of {blogs.length} items
          </div>
        </div>
      </div>

      {/* Table */}
      {isLoading && blogs.length === 0 ? (
        <div className="py-20 flex flex-col gap-3 items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#e4c126] border-t-transparent animate-spin" />
          <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
            Loading write-ups...
          </span>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="py-20 border border-dashed border-neutral-800 rounded-lg flex flex-col items-center justify-center text-neutral-500 gap-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-neutral-400">
            No write-ups match the selected filter
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-[#e4c126] hover:underline"
            >
              Clear search query
            </button>
          )}
        </div>
      ) : (
        <div className="w-full overflow-hidden bg-[#13151a]/30 border border-neutral-800/40 rounded-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full table-auto border-collapse text-left">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-900/60 text-[10px] text-neutral-400 font-extrabold uppercase tracking-wider">
                  <th className="py-4 px-6">Write-up / Headline</th>
                  <th className="py-4 px-6">Controls Page Section</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Author</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900/50">
                {filteredBlogs.map((blog) => {
                  const badge = getSectionBadge(blog.category);
                  return (
                    <tr key={blog._id} className="hover:bg-neutral-800/20 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {blog.picture ? (
                            <div className="w-12 h-9 rounded overflow-hidden flex-shrink-0 bg-neutral-900 border border-neutral-800">
                              <img src={blog.picture} alt={blog.title} className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div className="w-12 h-9 rounded flex items-center justify-center bg-neutral-900 border border-neutral-800 text-neutral-600 flex-shrink-0">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                              </svg>
                            </div>
                          )}
                          <div className="flex flex-col gap-0.5 min-w-0 max-w-sm">
                            <span className="font-bold text-white text-sm truncate group-hover:text-[#e4c126] transition-colors">
                              {blog.title}
                            </span>
                            {blog.subtitle && (
                              <span className="text-xs text-neutral-500 truncate">{blog.subtitle}</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`border text-[11px] font-black px-2.5 py-1 rounded whitespace-nowrap ${badge.color}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-xs font-bold text-neutral-300 bg-neutral-800/60 px-2.5 py-1 rounded border border-neutral-700/40">
                          {blog.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-neutral-300 text-xs font-medium">{blog.author}</td>
                      <td className="py-4 px-6 text-neutral-500 text-xs">{blog.date}</td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex gap-2.5 justify-end">
                          <button
                            onClick={() => openEdit(blog)}
                            title="Edit this write-up"
                            className="p-2 rounded bg-neutral-900 hover:bg-[#e4c126]/10 border border-neutral-800 hover:border-[#e4c126]/30 text-neutral-400 hover:text-[#e4c126] transition-all cursor-pointer"
                          >
                            <svg className="w-4 h-4 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => setDeleteTarget(blog)}
                            title="Delete write-up"
                            className="p-2 rounded bg-red-950/10 hover:bg-red-950/30 border border-red-900/20 text-red-400 hover:text-red-300 transition-all cursor-pointer"
                          >
                            <svg className="w-4 h-4 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
