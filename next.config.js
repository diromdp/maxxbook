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
                hostname: 'usc1.contabostorage.com'
            },
            {
                protocol: 'https',
                hostname: 'sin1.contabostorage.com'
            },
            {
                protocol: 'https',
                hostname: 'sgp1.vultrobjects.com'
            },
            {
                protocol: 'http',
                hostname: 'sgp1.vultrobjects.com'
            }
        ],
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.externals = [...config.externals];
        config.module.rules.push({
            test: /\.pdf$/i,
            type: 'asset/source'
        });
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, './src/'),
        };

        return config;
    }
}

module.exports = withNextIntl(nextConfig);