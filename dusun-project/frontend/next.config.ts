import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // Menonaktifkan optimasi cache agar gambar yang baru diupload
    // langsung tampil tanpa perlu rebuild Docker container.
    unoptimized: true,
  },
};

export default nextConfig;


export default nextConfig;
