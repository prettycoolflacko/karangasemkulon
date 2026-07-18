import { apiFetch } from "@/lib/api";
import { GalleryItem, Video } from "@/types";

export const dynamic = "force-dynamic";

export default async function GaleriPage() {
  const [gallery, videos] = await Promise.all([
    apiFetch<GalleryItem[]>("/api/gallery"),
    apiFetch<Video[]>("/api/videos"),
  ]);

  return (
    <section className="px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Galeri</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {gallery.map((item) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={item.id} src={item.image_url} alt={item.caption ?? ""} className="rounded" />
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-10 mb-4">Video</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((video) => (
          <div key={video.id}>
            <iframe
              className="w-full aspect-video rounded"
              src={`https://www.youtube.com/embed/${video.youtube_id}`}
              title={video.title}
              allowFullScreen
            />
            <p className="mt-2 font-medium">{video.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
