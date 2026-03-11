"use client";

import { useState } from "react";
import { YT_VIDEOS, YT_SHORTS } from "@/lib/constants";

const YT_CHANNEL = "https://www.youtube.com/@freshkite";

// ── YouTube logo SVG ─────────────────────────────────────────────────────────
function YTLogo({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
      <path fill="#fff" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

// ── Short Card — portrait 9:16, plays inline, "View on YouTube" strip below ──
function ShortCard({ videoId }: { videoId: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="group flex flex-col rounded-2xl overflow-hidden bg-[#0F172A] shadow-md hover:shadow-xl hover:shadow-black/20 transition-all duration-300 hover:-translate-y-1">
      {/* ── Media area — portrait 9:16 ── */}
      <div className="relative" style={{ aspectRatio: "9/16" }}>
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title="Freshkite Short"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <>
            {/* Thumbnail */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt=""
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70 group-hover:to-black/60 transition-colors duration-300" />
            {/* Shorts badge — top left */}
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-red-600 text-white text-[9px] font-bold px-2 py-1 rounded-full shadow-lg">
              <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L4.5 13.5H11L9 22l9.5-13H13L13 2z" />
              </svg>
              Shorts
            </div>
            {/* Play button — center */}
            <button
              onClick={() => setPlaying(true)}
              aria-label="Play short"
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-white transition-all duration-200">
                <svg className="w-5 h-5 text-[#0F172A] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          </>
        )}
      </div>

      {/* ── View on YouTube strip ── */}
      <a
        href={`https://youtube.com/shorts/${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 bg-[#0a101f] hover:bg-red-600 border-t border-white/8 text-white/60 hover:text-white text-[10px] font-semibold py-2.5 transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <YTLogo className="w-3 h-3" />
        View on YouTube
        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );
}

// ── Video Card — landscape 16:9, inline embed on click ───────────────────────
function VideoCard({ videoId, title, description }: { videoId: string; title: string; description: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-300 hover:-translate-y-0.5 flex flex-col">
      {/* Thumbnail / embed */}
      <div className="relative aspect-video bg-[#0F172A] overflow-hidden flex-shrink-0">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              }}
            />
            <div className="absolute inset-0 bg-[#0F172A]/25 group-hover:bg-[#0F172A]/15 transition-colors" />
            <button
              onClick={() => setPlaying(true)}
              aria-label={`Play: ${title}`}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-red-500 transition-all duration-200">
                <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
            {/* YouTube badge */}
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
              <YTLogo className="w-3 h-3" />
              YouTube
            </div>
          </>
        )}
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-[#0F172A] mb-2 leading-snug line-clamp-2">{title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 flex-1">{description}</p>
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1d4ed8] transition-colors"
        >
          Watch on YouTube
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}

// ── Section divider label ─────────────────────────────────────────────────────
function RowLabel({ children, href }: { children: React.ReactNode; href?: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="text-xs font-bold text-white bg-red-600 px-3 py-1.5 rounded-full flex-shrink-0 flex items-center gap-1.5">
        {children}
      </span>
      <div className="flex-1 h-px bg-slate-200" />
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors flex items-center gap-1"
        >
          See all
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      )}
    </div>
  );
}

// ── Main section ─────────────────────────────────────────────────────────────
export default function YouTubeVideos() {
  return (
    <section id="videos" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-4 py-1.5 mb-6">
              <YTLogo className="w-3.5 h-3.5 text-red-600" />
              <span className="text-xs font-semibold text-red-600 tracking-wide uppercase">
                Watch &amp; Learn
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] mb-4 leading-tight">
              See Freshkite{" "}
              <span className="text-[#2563EB]">in action</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Real classes, student success stories, and program insights —
              before you even apply.
            </p>
          </div>

          <a
            href={YT_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2.5 bg-red-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-red-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-600/20 text-sm"
          >
            <YTLogo className="w-4 h-4" />
            Visit our Channel
          </a>
        </div>

        {/* ── SHORTS ROW ── */}
        <div className="mb-14">
          <RowLabel href={`${YT_CHANNEL}/shorts`}>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L4.5 13.5H11L9 22l9.5-13H13L13 2z" />
            </svg>
            Shorts
          </RowLabel>

          {/* Mobile: horizontal scroll */}
          <div className="flex gap-3 overflow-x-auto pb-3 sm:hidden" style={{ scrollSnapType: "x mandatory" }}>
            {YT_SHORTS.map((s) => (
              <div key={s.videoId} className="flex-shrink-0 w-40" style={{ scrollSnapAlign: "start" }}>
                <ShortCard videoId={s.videoId} />
              </div>
            ))}
          </div>

          {/* Desktop: 5-col grid */}
          <div className="hidden sm:grid sm:grid-cols-5 gap-4">
            {YT_SHORTS.map((s) => (
              <ShortCard key={s.videoId} videoId={s.videoId} />
            ))}
          </div>
        </div>

        {/* ── VIDEOS ROW ── */}
        <div>
          <RowLabel>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Videos
          </RowLabel>

          <div className="grid sm:grid-cols-2 gap-6">
            {YT_VIDEOS.map((v) => (
              <VideoCard
                key={v.videoId}
                videoId={v.videoId}
                title={v.title}
                description={v.description}
              />
            ))}
          </div>
        </div>

        {/* Channel CTA */}
        <p className="mt-10 text-center text-xs text-slate-400">
          More classes, student stories, and live sessions on our{" "}
          <a
            href={YT_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-red-500 hover:text-red-600 transition-colors"
          >
            YouTube channel
          </a>
          .
        </p>

      </div>
    </section>
  );
}
