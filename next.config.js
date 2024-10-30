/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // This is important for static site generation
  images: {
    unoptimized: true // Required for static export
  }
}

module.exports = nextConfig 