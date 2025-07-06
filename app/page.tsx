"use client";

import Navbar from "@/components/Navbar";
import { blogPosts } from "@/lib/posts";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BlogList() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Navbar />

      <div className="pt-24 px-6 max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-8 text-center"
        >
          Latest Posts
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-muted dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <img
                  src={post.imageUrl  }
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-2xl font-semibold mb-2 hover:underline">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-3">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-sm line-clamp-3">
                    {post.content || post.content.slice(0, 120) + "..."}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
