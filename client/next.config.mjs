const nextConfig = {
  reactStrictMode: true,

  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
  transpilePackages: [
    'antd',
    'rc-util',
    '@babel/runtime',
    '@ant-design/icons',
    '@ant-design/icons-svg',
    'rc-pagination',
    'rc-picker',
    'rc-tree',
    'rc-table',
    'rc-input',
  ],

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://rental-car-7mor.onrender.com/api/:path*',
      },
    ];
  },
};

export default nextConfig;
