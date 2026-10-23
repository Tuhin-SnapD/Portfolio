/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  // Every image in this project is already compressed (WebP/JPEG, 28-70 kB).
  // Netlify's Next runtime rejects /_next/image requests with 400 ("Unable to
  // optimize image and unable to fallback to upstream image"), which broke the
  // avatar and project screenshots in production. Serving the files directly is
  // both reliable and faster: no image function hop, just the CDN.
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/files',
          outputPath: 'static/files',
        },
      },
    });
    return config;
  },
};

module.exports = nextConfig; 