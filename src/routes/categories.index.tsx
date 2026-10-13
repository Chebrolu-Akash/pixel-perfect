import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/site/Layout";
import { categories, toolsIn } from "@/lib/tools";

export const Route = createFileRoute("/categories/")({
  head: () => ({
    meta: [
      { title: "AI Tool Categories | TryAITools" },
      { name: "description", content: "Explore 15 AI tool categories and their subcategories." },
      { property: "og:title", content: "AI Tool Categories | TryAITools" },
      { property: "og:description", content: "Explore 15 AI tool categories and their subcategories." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <Page>
      <section className="bg-hero pb-12 pt-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h1 className="text-4xl font-bold">Categories</h1>
          <p className="mt-2 text-foreground/70">Pick an area to explore its tools.</p>
        </div>
      </section>
      <div className="mx-auto grid max-w-7xl gap-5 px-4 pt-10 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.slug}
            to="/categories/$slug"
            params={{ slug: c.slug }}
            className="group rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40 hover:shadow-soft"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold group-hover:text-primary">{c.name}</h2>
              <span className="rounded-full bg-lavender px-2.5 py-1 text-xs font-semibold text-primary">{toolsIn(c.name).length} tools</span>
            </div>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {c.subcategories.map((s) => (
                <li key={s} className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                  {s.replace(/^AI /, "")}
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </Page>
  ),
});
