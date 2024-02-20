/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Enable static exports for the App Router.
   *
   * @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
   */
  output: "export",

  /**
   * Set base path. This is usually the slug of your repository.
   *
   * @see https://nextjs.org/docs/app/api-reference/next-config-js/basePath
   */
  basePath: "/casbin-editor-v2",

  /**
   * Disable server-based image optimization. Next.js does not support
   * dynamic features with static exports.
   *
   * @see https://nextjs.org/docs/pages/api-reference/components/image#unoptimized
   */
  images: {
    unoptimized: true,
  },
//   for casbin browser
  webpack: (config, { isServer,webpack }) => {
    // 不在服务端的Webpack配置中包含fs模块
    if (!isServer) {
      config.resolve.fallback = { fs: false, ...config.resolve.fallback };
    }

    // 添加ProvidePlugin插件来自动加载buffer模块
    config.plugins.push(
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      })
    );

    return config;
  },

};

export default nextConfig;
