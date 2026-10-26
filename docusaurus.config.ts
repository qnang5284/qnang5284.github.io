import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Javier García-Miranda',
  tagline: 'Technical Writing & Software Documentation Portfolio',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: 'https://qnang5284.github.io',
  baseUrl: '/',
  organizationName: 'qnang5284',
  projectName: 'qnang5284.github.io',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  onDuplicateRoutes: 'throw',

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
      onBrokenMarkdownImages: 'throw',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    localeConfigs: {
      en: {
        label: 'English',
      },
      es: {
        label: 'Español',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          onInlineTags: 'throw',
          exclude: [
            '**/_*.{js,jsx,ts,tsx,md,mdx}',
            '**/_*/**',
            '**/*.test.{js,jsx,ts,tsx}',
            '**/__tests__/**',
            '**/README.md',
          ],
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: 'throw',
          onInlineAuthors: 'throw',
          onUntruncatedBlogPosts: 'throw',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    mermaid: {
      theme: {
        light: 'base',
        dark: 'base',
      },
      options: {
        fontFamily: 'Nunito, "Segoe UI", sans-serif',
        themeVariables: {
          fontFamily: 'Nunito, "Segoe UI", sans-serif',
          fontSize: '16px',
          darkMode: false,
          background: 'transparent',
          primaryColor: '#f6c431',
          primaryTextColor: '#1a120c',
          primaryBorderColor: '#1a120c',
          secondaryColor: '#3ec6e8',
          secondaryTextColor: '#1a120c',
          secondaryBorderColor: '#1a120c',
          tertiaryColor: '#e23d3d',
          tertiaryTextColor: '#1a120c',
          tertiaryBorderColor: '#1a120c',
          lineColor: '#1a120c',
          textColor: '#1a120c',
          mainBkg: '#f6c431',
          nodeBorder: '#1a120c',
          nodeTextColor: '#1a120c',
          clusterBkg: '#fff3d4',
          clusterBorder: '#1a120c',
          edgeLabelBackground: '#fff8e4',
        },
      },
    },
    navbar: {
      title: 'Javier García-Miranda',
      logo: {
        alt: 'Javier García-Miranda',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
      },
      items: [
        {
          type: 'dropdown',
          label: 'Documentation',
          position: 'left',
          className: 'navbar-docs-toggle',
          items: [
            {
              to: '/docs/docker-quickstart/',
              label: 'Camunda 8 Setup',
            },
            {
              to: '/docs/grafana-loki-quickstart',
              label: 'Grafana Loki',
            },
            {
              to: '/docs/case-study',
              label: 'Case Study',
            },
            {
              to: '/docs/homebrewery-user-guide-v2',
              label: 'Homebrewery User Guide',
            },
            {
              to: '/docs/minisvault-api-reference',
              label: 'Minis Vault',
            },
            {
              to: '/docs/scribenode-api-reference',
              label: 'Scribenode API Reference',
            },
          ],
        },
        {
          href: 'https://github.com/qnang5284',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://www.linkedin.com/in/javier-garc%C3%ADa-miranda-a5430a1ab/',
          label: 'LinkedIn',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Camunda 8 Setup',
              to: '/docs/docker-quickstart/',
            },
            {
              label: 'Grafana Loki',
              to: '/docs/grafana-loki-quickstart',
            },
            {
              label: 'Case Study',
              to: '/docs/case-study',
            },
            {
              label: 'Homebrewery User Guide',
              to: '/docs/homebrewery-user-guide-v2',
            },
            {
              label: 'Minis Vault',
              to: '/docs/minisvault-api-reference',
            },
            {
              label: 'Scribenode API Reference',
              to: '/docs/scribenode-api-reference',
            },
          ],
        },
        {
          title: 'Connect',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/qnang5284',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/javier-garc%C3%ADa-miranda-a5430a1ab/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Javier García-Miranda. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig & {
    mermaid: {
      theme: {light: string; dark: string};
      options: Record<string, unknown>;
    };
  },
};

export default config;
