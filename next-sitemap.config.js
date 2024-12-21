module.exports = {
  siteUrl: 'https://samueldekorte.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7, // Default priority
  additionalSitemaps: [
    'https://samueldekorte.com/sitemap-0.xml',
    'https://samueldekorte.com/sitemap-images.xml',
  ],
  transform: async (config, path) => {
    // Define specific priorities and changefreqs for paths
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
      };
    } else if (path === '/about') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.9,
      };
    } else if (path === '/articles') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.9,
      };
    } else if (path.startsWith('/articles/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.5,
      };
    }

    // Default for all other paths
    return {
      loc: path,
      changefreq: 'weekly',
      priority: 0.9,
    };
  },
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://samueldekorte.com/sitemap-0.xml',
      'https://samueldekorte.com/sitemap-images.xml',
    ],
  },
};
