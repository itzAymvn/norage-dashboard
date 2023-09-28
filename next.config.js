/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["cdn.discordapp.com", "crafatar.com"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.discordapp.com",
                port: "",
                pathname: "/avatars/**",
            },
            {
                protocol: "https",
                hostname: "cdn.discordapp.com",
                port: "",
                pathname: "/icons/***",
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
