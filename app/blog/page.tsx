"use client";

import { blogPosts } from "@/lib/supabase";
import Link from "next/link";
import React from "react";

export default function BlogList() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Blog Posts</h1>
      <ul className="space-y-2">
        {blogPosts.map(post => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
