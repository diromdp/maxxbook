/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'imgv2-1-f.scribdassets.com',
            },
            {
                protocol: 'https',
                hostname: 's-f.scribdassets.com'
            }
        ],
    },
    webpack: (config) => {
        config.resolve.alias.canvas = false;
        return config;
    },
}

module.exports = nextConfig
