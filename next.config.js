/** @type {import('next').NextConfig} */
const path = require('path');

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
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, './src/'),
        }; return config;
    },
}

module.exports = nextConfig
