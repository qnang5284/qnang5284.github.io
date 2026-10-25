import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  portfolioSidebar: [
    {
      type: 'category',
      label: 'Camunda 8 Setup',
      collapsed: true,
      link: {
        type: 'doc',
        id: 'docker-quickstart/camunda8-docker-quickstart',
      },
      items: [
        'docker-quickstart/camunda-8-run-quickstart',
        'docker-quickstart/docker-compose-quickstart',
      ],
    },
    'grafana-loki-quickstart/grafana-loki-quickstart',
    {
      type: 'category',
      label: 'Case Study',
      collapsed: true,
      link: {
        type: 'doc',
        id: 'case-study/case-study',
      },
      items: [
        'case-study/camunda-8-run-setup',
        'case-study/grafana-loki',
      ],
    },
    {
      type: 'category',
      label: 'Homebrewery User Guide',
      collapsed: true,
      link: {
        type: 'doc',
        id: 'homebrewery-user-guide-v2/homebrewery-user-guide-v2',
      },
      items: [
        'homebrewery-user-guide-v2/start-a-new-document',
        'homebrewery-user-guide-v2/core-markdown-syntax',
        'homebrewery-user-guide-v2/text-editor',
        'homebrewery-user-guide-v2/players-handbook-snippets',
        'homebrewery-user-guide-v2/images-tables-fonts-and-license',
        'homebrewery-user-guide-v2/editor-tools',
        'homebrewery-user-guide-v2/export-to-pdf',
        'homebrewery-user-guide-v2/quick-troubleshooting',
        'homebrewery-user-guide-v2/where-to-go-next',
      ],
    },
    'miniature-inventory-api-docs/minisvault-api-reference',
    'scribenode-engine-docs/scribenode-reference-manual',
  ],
};

export default sidebars;
