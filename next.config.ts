import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
 
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
 
const nextConfig: NextConfig = {
  turbopack: {
    // Explicitly point Turbopack to this project, not C:\Users\cpu
    root: path.resolve(__dirname),
  },
};
 
export default withNextIntl(nextConfig);
