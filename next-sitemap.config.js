module.exports = {
    siteUrl: 'https://samueldekorte.com',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    changefreq: 'daily',
    priority: 0.7, // Set a default priority for all pages
    additionalSitemaps: [
      'https://samueldekorte.com/sitemap-0.xml',
      'https://samueldekorte.com/sitemap-images.xml',
    ],
    // Define priorities for specific pages
    transform: async (config, path) => {
      if (path === '/') {
        return {
          loc: path,
          changefreq: 'daily',
          priority: 1.0,
        };
      } else if (path.includes('/about')) {
        return {
          loc: path,
          changefreq: 'weekly',
          priority: 0.9,
        };
      }
      else if (path.includes('/articles')) {
        return {
          loc: path,
          changefreq: 'weekly',
          priority: 0.9,
        };
      }
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.5,
      };
    },
  };
  