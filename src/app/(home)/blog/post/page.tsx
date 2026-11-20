"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useBlogStore, BlogData } from "@/store/blogStore";

function BlogPostContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { blogs, fetchBlogs, isLoading } = useBlogStore();
  const [post, setPost] = useState<BlogData | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  useEffect(() => {
    if (blogs && blogs.length > 0 && id) {
      const found = blogs.find((b) => b._id === id);
      if (found) {
        setPost(found);
      }
    }
  }, [blogs, id]);

  const relatedPosts = React.useMemo(() => {
    if (!post) return [];
    return blogs
      .filter((b) => b._id !== post._id && b.category === post.category)
      .slice(0, 3);
  }, [blogs, post]);

  if (isLoading && !post) {
    return (
      <div className="w-full min-h-[60vh] bg-[#0d0e12] text-white flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#009ADE] border-t-transparent animate-spin" />
        <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
          Loading post...
        </span>
      </div>
    );
  }

  if (!post && !isLoading) {
    return (
      <div className="w-full min-h-[60vh] bg-[#0d0e12] text-white flex flex-col items-center justify-center gap-4 px-4">
        <h2 className="text-2xl font-black">Article Not Found</h2>
        <p className="text-xs text-neutral-400">
          The requested article or write-up could not be located.
        </p>
        <Link
          href="/blog"
          className="px-6 py-2.5 bg-[#009ADE] text-white rounded-full text-xs font-black uppercase tracking-wider hover:bg-[#0082be] transition-colors mt-2"
        >
          Back to Newsroom
        </Link>
      </div>
    );
  }

  return (
    <article className="w-full bg-[#0d0e12] text-white min-h-screen">
      {/* Top Header & Breadcrumb */}
      <section className="relative w-full py-16 md:py-24 border-b border-white/10 bg-gradient-to-b from-[#141721] to-[#0d0e12]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-[#009ADE] transition-colors self-start"
          >
            <span>←</span> Back to Newsroom
          </Link>

          <div className="flex items-center gap-3">
            <span className="bg-[#009ADE]/15 text-[#009ADE] border border-[#009ADE]/30 text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider">
              {post?.category}
            </span>
            <span className="text-xs text-neutral-400 font-medium">
              {post?.date}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
            {post?.title}
          </h1>

          {post?.subtitle && (
            <p className="text-base sm:text-xl text-neutral-300 font-medium leading-relaxed">
              {post.subtitle}
            </p>
          )}

          <div className="flex items-center gap-3 pt-2 border-t border-white/10 text-xs text-neutral-400">
            <span className="font-bold text-white">By {post?.author}</span>
            <span>•</span>
            <span>Published by New Energy Holdings</span>
          </div>
        </div>
      </section>

      {/* Main Cover Image */}
      {post?.picture && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <div className="relative w-full aspect-[16/9] max-h-[500px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900">
            <Image
              src={post.picture}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Article Body Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div
          className="prose prose-invert prose-neutral max-w-none text-neutral-300 leading-relaxed text-base sm:text-lg space-y-6"
          dangerouslySetInnerHTML={{ __html: post?.content || "" }}
        />

        {/* Share / Back Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#009ADE] hover:text-white transition-colors"
          >
            <span>←</span> Back to All Stories
          </Link>
          <span className="text-xs text-neutral-500 font-bold">
            New Energy Holdings Editorial
          </span>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-white/10 bg-[#12141c] py-16">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Related Articles &amp; Updates
              </h3>
              <Link
                href="/blog"
                className="text-xs font-black uppercase tracking-wider text-[#009ADE] hover:underline"
              >
                View Newsroom
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel._id}
                  href={`/blog/post?id=${rel._id}`}
                  className="bg-[#181a24] border border-white/10 rounded-xl p-6 flex flex-col gap-3 hover:border-[#009ADE]/50 transition-all group"
                >
                  <span className="text-[10px] text-[#009ADE] font-black uppercase tracking-wider">
                    {rel.category}
                  </span>
                  <h4 className="text-base font-bold text-white leading-snug group-hover:text-[#009ADE] transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                  <span className="text-[11px] text-neutral-500">
                    {rel.date}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

export default function BlogDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[60vh] bg-[#0d0e12] text-white flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#009ADE] border-t-transparent animate-spin" />
        </div>
      }
    >
      <BlogPostContent />
    </Suspense>
  );
}
