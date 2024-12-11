import nextMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypePrism from '@mapbox/rehype-prism';
import remarkToc from 'remark-toc';
import remarkSlug from 'remark-slug';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['jsx', 'mdx'],
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkToc,
      remarkSlug, // Include remark-slug plugin
    ],
    rehypePlugins: [rehypePrism],
  },
});

export default withMDX(nextConfig);
