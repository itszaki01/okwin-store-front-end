/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['img-cdn1.okwin.shop','cdn.okwin.shop','img-cdn2.okwin.shop'],
  },
};

export default nextConfig;
