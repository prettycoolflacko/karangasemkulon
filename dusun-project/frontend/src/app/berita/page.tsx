import { apiFetch } from "@/lib/api";
import { News } from "@/types";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function BeritaPage() {
  const news = await apiFetch<News[]>("/api/news");

  return (
    <section className="px-6 py-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Berita &amp; Kegiatan</h1>
      <ul className="space-y-4">
        {news.map((item) => (
          <li key={item.id} className="border-b pb-4">
            <Link href={`/berita/${item.slug}`} className="text-lg font-semibold hover:underline">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
