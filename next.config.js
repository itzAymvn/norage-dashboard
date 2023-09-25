/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.discordapp.com",
                port: "",
                pathname: "/avatars/**",
            },
            {
                protocol: "https",
                hostname: "crafatar.com",
                port: "",
                pathname: "/avatars/**",
            },
        ],
    },

    experimental: {
        serverActions: true,
    },
};

module.exports = nextConfig;
