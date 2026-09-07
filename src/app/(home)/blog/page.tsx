"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useBlogStore, BlogData } from "@/store/blogStore";

const NEWS_CATEGORIES = [
  "All",
  "Press Releases",
  "Market Analysis",
  "Industry News",
  "Projects",
  "Community",
];

export default function BlogListingPage() {
  const { blogs, isLoading, fetchBlogs } = useBlogStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Filter blogs: Show Newsroom articles + project/community articles
  const newsBlogs = useMemo(() => {
    return blogs.filter((b) => {
      // Exclude purely UI internal snippets if wanted, or show all articles
      const cat = b.category?.toLowerCase() || "";
      const isArticleCategory = [
        "press releases",
        "market analysis",
        "industry news",
        "blog",
        "projects",
        "community",
        "hero",
        "sustainability",
      ].includes(cat);

      // If category selected
      if (selectedCategory !== "All") {
        if (b.category?.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      } else if (!isArticleCategory) {
        // In "All" tab, prioritize article-formatted posts
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = b.title?.toLowerCase().includes(q);
        const inSubtitle = b.subtitle?.toLowerCase().includes(q);
        const inContent = b.content?.toLowerCase().includes(q);
        if (!inTitle && !inSubtitle && !inContent) return false;
      }

      return true;
    });
  }, [blogs, selectedCategory, searchQuery]);

  const featuredPost = newsBlogs[0];
  const remainingPosts = newsBlogs.slice(1);

  return (
    <div className="w-full bg-[#0d0e12] text-white min-h-screen">
      {/* Top Banner Header */}
      <section className="relative w-full py-20 md:py-28 overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#141721] to-[#0d0e12]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-6">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-[#009ADE]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#009ADE]" />
            <span>NEWSROOM &amp; INSIGHTS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight max-w-4xl">
            Clean Energy News, Stories &amp; Market Insights
          </h1>

          <p className="text-base sm:text-xl text-neutral-400 font-light max-w-2xl leading-relaxed">
            Stay up to date with project developments, regulatory breakthroughs, industry research, and corporate updates from New Energy Holdings.
          </p>

          {/* Search & Category Filter */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {NEWS_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#009ADE] text-white shadow-lg shadow-[#009ADE]/20"
                        : "bg-[#181a24] hover:bg-[#202330] text-neutral-400 hover:text-white border border-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:w-80">
              <svg
                className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-[#181a24] border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#009ADE]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Articles Content Area */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col gap-16">
        {isLoading && blogs.length === 0 ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#009ADE] border-t-transparent animate-spin" />
            <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
              Loading articles...
            </span>
          </div>
        ) : newsBlogs.length === 0 ? (
          <div className="py-24 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-neutral-400 gap-3">
            <span className="text-sm font-bold">No articles match your filter.</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-[#009ADE] hover:underline cursor-pointer"
              >
                Clear search query
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Featured Hero Article Banner */}
            {featuredPost && (
              <div className="w-full bg-[#141620] border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:border-[#009ADE]/40 transition-all duration-300 group">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-7 relative h-[280px] sm:h-[400px] lg:h-auto overflow-hidden bg-neutral-900">
                    <Image
                      src={featuredPost.picture || "/images/banner.jpg"}
                      alt={featuredPost.title}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141620] via-transparent to-transparent lg:hidden" />
                  </div>

                  <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between gap-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <span className="bg-[#009ADE]/15 text-[#009ADE] border border-[#009ADE]/30 text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider">
                          {featuredPost.category}
                        </span>
                        <span className="text-xs text-neutral-500 font-medium">
                          {featuredPost.date}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight group-hover:text-[#009ADE] transition-colors">
                        <Link href={`/blog/${featuredPost._id || ""}`}>
                          {featuredPost.title}
                        </Link>
                      </h2>

                      {featuredPost.subtitle && (
                        <p className="text-sm text-neutral-400 font-normal leading-relaxed line-clamp-3">
                          {featuredPost.subtitle}
                        </p>
                      )}

                      <div
                        className="text-xs text-neutral-500 font-light leading-relaxed line-clamp-3"
                        dangerouslySetInnerHTML={{
                          __html: featuredPost.content || "",
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-xs text-neutral-400 font-bold">
                        By {featuredPost.author}
                      </span>
                      <Link
                        href={`/blog/${featuredPost._id || ""}`}
                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#009ADE] hover:text-white transition-colors"
                      >
                        <span>Read Article</span>
                        <span className="text-base">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Articles Grid */}
            {remainingPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {remainingPosts.map((post) => (
                  <article
                    key={post._id || post.title}
                    className="bg-[#141620] border border-white/10 rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#009ADE]/40 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
                  >
                    <div>
                      {/* Thumbnail */}
                      <div className="relative h-48 w-full overflow-hidden bg-neutral-900">
                        <Image
                          src={post.picture || "/images/solarenergy.webp"}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-[#0f1015]/80 backdrop-blur-md text-[#009ADE] border border-white/10 text-[9px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col gap-3">
                        <span className="text-[11px] text-neutral-500 font-medium">
                          {post.date}
                        </span>

                        <h3 className="text-lg font-bold text-white leading-snug group-hover:text-[#009ADE] transition-colors line-clamp-2">
                          <Link href={`/blog/${post._id || ""}`}>
                            {post.title}
                          </Link>
                        </h3>

                        {post.subtitle ? (
                          <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                            {post.subtitle}
                          </p>
                        ) : (
                          <div
                            className="text-xs text-neutral-500 font-light leading-relaxed line-clamp-2"
                            dangerouslySetInnerHTML={{
                              __html: post.content || "",
                            }}
                          />
                        )}
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-white/5 text-xs">
                      <span className="text-neutral-500 font-medium truncate max-w-[140px]">
                        {post.author}
                      </span>
                      <Link
                        href={`/blog/${post._id || ""}`}
                        className="text-[#009ADE] hover:text-white font-bold flex items-center gap-1 transition-colors"
                      >
                        Read <span>→</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
