// app/help-center/page.tsx

import Hero from "@/components/help-center/Hero";
import CategoryGrid from "@/components/help-center/CategoryGrid";
import PopularArticles from "@/components/help-center/PopularArticles";
import SupportCard from "@/components/help-center/SupportCard";

export default function HelpCenterPage() {
  return (
    <main className="min-h-screen bg-[#F7F8FC]">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Hero */}
        <Hero />

        {/* Categories */}
        <section className="mt-10">
          <h2 className="mb-5 text-lg font-semibold text-slate-900">
            Browse by Category
          </h2>

          <CategoryGrid />
        </section>

        {/* Bottom */}
        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <PopularArticles />
          <SupportCard />
        </section>
      </div>
    </main>
  );
}