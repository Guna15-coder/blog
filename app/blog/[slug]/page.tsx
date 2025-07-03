import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/posts";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import dynamic from "next/dynamic";

// Dynamically import MDXContent
const MDXContent = dynamic(() => import("@/components/MDXContent"), { ssr: true });

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight],
    },
  });

  return (
    <div className="flex flex-col lg:flex-row max-w-6xl mx-auto px-4 py-10 gap-8">
      {/* Left: Blog Content (70%) */}
      <div className="w-full lg:w-[70%] prose dark:prose-invert text-justify">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-sm text-muted-foreground mb-4">
          {new Date(post.created_at).toLocaleDateString()}
        </p>
        <MDXContent source={mdxSource} />
      </div>

      {/* Right: Ad/Sidebar (30%) */}
      <aside className="w-full lg:w-[30%] space-y-4">
        <div className="border border-border rounded-xl p-4 bg-muted text-muted-foreground">
          <h2 className="text-lg font-semibold mb-2">Sponsored</h2>
          <p>📢 Looking for automation tools? Try n8n Cloud — reliable, fast, and open-source.</p>
          <a
            href="https://n8n.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline mt-2 inline-block"
          >
            Visit n8n →
          </a>
        </div>

        <div className="border border-border rounded-xl p-4 bg-muted text-muted-foreground">
          <h2 className="text-lg font-semibold mb-2">More from this blog</h2>
          <ul className="list-disc pl-4 text-sm">
            {blogPosts
              .filter((b) => b.slug !== post.slug)
              .slice(0, 3)
              .map((b) => (
                <li key={b.id}>
                  <a href={`/${b.slug}`} className="hover:underline text-foreground">
                    {b.title}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
