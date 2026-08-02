import { Link } from 'wouter';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { Eyebrow, Section } from '@/components/site/primitives';
import { posts, categoryColors } from '@/lib/blog-posts';
import { useDocumentMeta } from '@/hooks/use-document-meta';

const TITLE = 'Blog — Airavoto Gaming POS';
const DESCRIPTION = 'Tips, news and stories from gaming centers using Airavoto POS.';

export default function Blog() {
  useDocumentMeta({ title: TITLE, description: DESCRIPTION });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(60% 45% at 50% 0%, oklch(0.75 0.10 290/0.18), transparent 70%)' }}
        />
        <div className="relative mx-auto w-full max-w-6xl px-5 text-center">
          <Eyebrow>Blog</Eyebrow>
          <h1 className="mx-auto mt-8 max-w-2xl text-balance text-5xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-7xl">
            Grow your gaming center
          </h1>
          <p className="mx-auto mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
            Practical tips, revenue ideas and operator stories — everything you need to run a better center.
          </p>
        </div>
      </section>

      <Section>
        <Link
          href={`/blog/${posts[0].slug}`}
          className="group relative block overflow-hidden rounded-3xl border border-border bg-surface transition-colors hover:bg-surface-2"
        >
          <div className="grid md:grid-cols-2">
            <div className="relative h-64 overflow-hidden md:h-auto">
              <img src={posts[0].img} alt={posts[0].title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${categoryColors[posts[0].category]}`}>{posts[0].category}</span>
                <span className="text-xs text-muted-foreground">
                  {posts[0].date} · {posts[0].readTime} read
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-bold leading-snug tracking-tight sm:text-3xl">{posts[0].title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{posts[0].excerpt}</p>
              <span className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
                Read article →
              </span>
            </div>
          </div>
        </Link>
      </Section>

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(1).map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:bg-surface-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={post.img} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${categoryColors[post.category]}`}>{post.category}</span>
                  <span className="text-[11px] text-muted-foreground">{post.readTime} read</span>
                </div>
                <h3 className="mt-3 text-sm font-semibold leading-snug tracking-tight">{post.title}</h3>
                <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-muted-foreground">{post.excerpt}</p>
                <span className="mt-4 text-[11px] text-muted-foreground">{post.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Footer />
    </main>
  );
}
