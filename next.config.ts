import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    crossOrigin: "anonymous",
    images: {
        remotePatterns: [
            {
                hostname: "dmtrapp.blob.core.windows.net",
            },
            {
                hostname: "lh3.googleusercontent.com",
            },
        ],
    },
};

export default withNextIntl(nextConfig);
