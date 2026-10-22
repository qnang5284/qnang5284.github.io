import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  portfolioSidebar: [
    'homebrewery-user-guide-v2/homebrewery-user-guide-v2',
    'miniature-inventory-api-docs/minisvault-api-reference',
    'scribenode-engine-docs/scribenode-reference-manual',
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
  ],
};

export default sidebars;
