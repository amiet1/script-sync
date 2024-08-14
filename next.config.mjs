
/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          // Apply these headers to all routes
          source: '/(.*)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'no-store', // Disable caching for all routes
            },
          ],
        },
      ];
    },
  };
  
 export default nextConfig;
  


