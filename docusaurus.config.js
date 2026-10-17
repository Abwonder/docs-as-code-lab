const config = {
  title: 'Signal Harbor',
  tagline: 'Understand the system. Ship the documentation.',
  url: 'https://abwonder.github.io',
  baseUrl: '/docs-as-code-lab/',
  organizationName: 'Abwonder',
  projectName: 'docs-as-code-lab',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  markdown: {hooks: {onBrokenMarkdownLinks: 'throw', onBrokenMarkdownImages: 'throw'}},
  i18n: {defaultLocale: 'en', locales: ['en']},
  presets: [['classic', {
    docs: {
      routeBasePath: '/',
      sidebarPath: require.resolve('./sidebars.js'),
      editUrl: 'https://github.com/Abwonder/docs-as-code-lab/edit/main/',
    },
    blog: false,
    theme: {customCss: require.resolve('./src/css/custom.css')},
  }]],
  themeConfig: {
    navbar: {
      title: 'SIGNAL HARBOR / LAB',
      items: [
        {to: '/tutorials/first-incident', label: 'Quickstart', position: 'left'},
        {to: '/reference/api', label: 'API', position: 'left'},
        {href: 'https://github.com/Abwonder/docs-as-code-lab', label: 'GitHub ↗', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      copyright: 'An AI-assisted portfolio lab · Synthetic service and data · Created October 2026',
    },
    colorMode: {defaultMode: 'light', respectPrefersColorScheme: true},
    prism: {additionalLanguages: ['bash', 'json', 'yaml', 'diff']},
  },
};
module.exports = config;
