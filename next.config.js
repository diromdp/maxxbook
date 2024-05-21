/** @type {import('next').NextConfig} */
const path = require('path');
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

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
            },
            {
                protocol: 'https',
                hostname: 'docs.brohim.online'
            },
            {
                protocol: 'https',
                hostname: 'usc1.contabostorage.com'
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

module.exports = withNextIntl(nextConfig);

