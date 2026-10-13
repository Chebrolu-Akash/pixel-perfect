import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Page } from "@/components/site/Layout";
import { ToolCard } from "@/components/site/ToolCard";
import { categories, shortName, tools, toolsIn } from "@/lib/tools";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TryAITools — Discover 2,000+ AI Tools by Category" },
      { name: "description", content: "Browse over 2,000 hand-picked AI tools for writing, images, video, coding, marketing and more." },
      { property: "og:title", content: "TryAITools — Discover 2,000+ AI Tools" },
      { property: "og:description", content: "Find the right AI tool for every task, organized into 15 categories." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const featured = categories
  .map((c) => toolsIn(c.name)[0])
  .filter((t): t is NonNullable<typeof t> => !!t)
  .slice(0, 8);

function Index() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  return (
    <Page>
      <section className="relative mx-2 overflow-hidden rounded-b-[2.5rem] bg-hero sm:mx-4">
        <div className="pointer-events-none absolute -left-40 top-24 h-[34rem] w-[22rem] rounded-[45%] bg-gradient-primary opacity-60 blur-sm" />
        <div className="pointer-events-none absolute -right-40 top-24 h-[34rem] w-[22rem] rounded-[45%] bg-gradient-primary opacity-60 blur-sm" />
        <div className="relative mx-auto max-w-4xl px-4 pb-28 pt-24 text-center sm:pt-32">
          <span className="inline-block rounded-full border border-primary/20 bg-background/70 px-4 py-1.5 text-xs font-semibold text-primary">
            {tools.length.toLocaleString()}+ AI tools · {categories.length} categories
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-6xl">
            Find the Perfect AI Tool <br className="hidden sm:block" /> for Every Task
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-foreground/75">
            Explore a curated directory of AI tools for writing, design, video, coding, marketing and beyond.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/tools", search: { q } });
            }}
            className="mx-auto mt-9 flex max-w-xl items-center gap-2 rounded-2xl bg-background p-2 shadow-soft"
          >
            <Search className="ml-3 h-5 w-5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search tools, e.g. ChatGPT, video editor…"
              className="flex-1 bg-transparent px-2 py-2 outline-none"
            />
            <button className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Search</button>
          </form>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {categories.slice(0, 6).map((c) => (
              <Link
                key={c.slug}
                to="/categories/$slug"
                params={{ slug: c.slug }}
                className="rounded-full bg-background/70 px-3 py-1.5 text-xs font-medium text-foreground/80 hover:text-primary"
              >
                {shortName(c.name)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold">Browse by Category</h2>
            <p className="mt-2 text-muted-foreground">Every tool, neatly organized.</p>
          </div>
          <Link to="/categories" className="hidden items-center gap-1 text-sm font-semibold text-primary sm:flex">
            All categories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/categories/$slug"
              params={{ slug: c.slug }}
              className="group rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40 hover:shadow-soft"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold group-hover:text-primary">{c.name}</h3>
                <span className="rounded-full bg-lavender px-2.5 py-1 text-xs font-semibold text-primary">{toolsIn(c.name).length}</span>
              </div>
              <p className="mt-2 line-clamp-1 text-sm text-muted-foreground">{c.subcategories.slice(0, 3).join(" · ")}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <h2 className="text-3xl font-bold">Popular Tools</h2>
        <p className="mt-2 text-muted-foreground">Top picks from each category.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((t) => (
            <ToolCard key={t.id} tool={t} />
          ))}
        </div>
      </section>
    </Page>
  );
}
