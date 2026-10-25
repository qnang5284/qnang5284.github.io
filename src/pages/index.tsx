import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const GITHUB_URL = 'https://github.com/qnang5284';
const LINKEDIN_URL =
  'https://www.linkedin.com/in/javier-garc%C3%ADa-miranda-a5430a1ab/';

function GithubIcon(): ReactNode {
  return (
    <svg className={styles.profileIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.28-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12c0-6.63-5.37-12-12-12z"
      />
    </svg>
  );
}

function LinkedinIcon(): ReactNode {
  return (
    <svg className={styles.profileIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z"
      />
    </svg>
  );
}

type PortfolioDoc = {
  href: string;
  title: ReactNode;
  summary: ReactNode;
  ink: 'red' | 'cyan' | 'yellow' | 'green' | 'orange' | 'blue';
};

const portfolioDocs: PortfolioDoc[] = [
  {
    ink: 'red',
    href: '/docs/docker-quickstart',
    title: (
      <Translate
        id="homepage.doc.camunda.title"
        description="Portfolio document title">
        Camunda 8 Setup
      </Translate>
    ),
    summary: (
      <Translate
        id="homepage.doc.camunda.summary"
        description="Portfolio document summary">
        Quickstart for running a local Camunda 8 cluster with Docker Compose.
      </Translate>
    ),
  },
  {
    ink: 'cyan',
    href: '/docs/grafana-loki-quickstart',
    title: (
      <Translate
        id="homepage.doc.grafana.title"
        description="Portfolio document title">
        Grafana Loki
      </Translate>
    ),
    summary: (
      <Translate
        id="homepage.doc.grafana.summary"
        description="Portfolio document summary">
        Quickstart for aggregating and querying local logs with Grafana Loki and Promtail.
      </Translate>
    ),
  },
  {
    ink: 'yellow',
    href: '/docs/case-study',
    title: (
      <Translate
        id="homepage.doc.casestudy.title"
        description="Portfolio document title">
        Case Study
      </Translate>
    ),
    summary: (
      <Translate
        id="homepage.doc.casestudy.summary"
        description="Portfolio document summary">
        Case study of a Camunda 8 Onboarding setup and a Loki Flow Architecture.
      </Translate>
    ),
  },
  {
    ink: 'green',
    href: '/docs/homebrewery-user-guide-v2',
    title: (
      <Translate
        id="homepage.doc.homebrewery.title"
        description="Portfolio document title">
        Homebrewery User Guide
      </Translate>
    ),
    summary: (
      <Translate
        id="homepage.doc.homebrewery.summary"
        description="Portfolio document summary">
        User guide for authors writing pages in The Homebrewery.
      </Translate>
    ),
  },
  {
    ink: 'orange',
    href: '/docs/minisvault-api-reference',
    title: (
      <Translate
        id="homepage.doc.minisvault.title"
        description="Portfolio document title">
        Minis Vault
      </Translate>
    ),
    summary: (
      <Translate
        id="homepage.doc.minisvault.summary"
        description="Portfolio document summary">
        API reference for a collector's paints and miniatures.
      </Translate>
    ),
  },
  {
    ink: 'blue',
    href: '/docs/scribenode-api-reference',
    title: (
      <Translate
        id="homepage.doc.scribenode.title"
        description="Portfolio document title">
        Scribenode API Reference
      </Translate>
    ),
    summary: (
      <Translate
        id="homepage.doc.scribenode.summary"
        description="Portfolio document summary">
        Reference manual for the ScribeNode dialogue engine API.
      </Translate>
    ),
  },
];

function HomepageHeader() {
  return (
    <header className={styles.splash}>
      <div className={styles.splashInner}>
        <div className={styles.issueBar}>
          <span>
            <Translate id="homepage.issue" description="Comic issue number on the homepage">
              No. 01
            </Translate>
          </span>
          <span>
            <Translate id="homepage.practice" description="Docs-as-Code credit on the homepage issue bar">
              Docs-as-Code
            </Translate>
          </span>
        </div>
        <div className={styles.splashBody}>
        <div className={styles.heroCopy}>
        <p className={styles.kicker}>
          <Translate id="homepage.kicker" description="Role label above the homepage title">
            Technical Writer
          </Translate>
        </p>
        <Heading as="h1" className={styles.title}>
          <span>
            <Translate id="homepage.title.given" description="First line of the homepage name">
              Javier García-
            </Translate>
          </span>
          <span>
            <Translate id="homepage.title.family" description="Second line of the homepage name">
              Miranda
            </Translate>
          </span>
        </Heading>
        <p className={styles.caption}>
          <Translate id="homepage.tagline" description="The homepage subtitle">
            Technical Writing & Software Documentation Portfolio
          </Translate>
        </p>
        </div>
        <div className={styles.heroSide}>
        <div className={styles.balloon}>
          <p className={styles.welcome}>
            <Translate id="homepage.welcome" description="Short welcome on the homepage">
              Welcome. I am a former software engineer and comic artist specializing
              in Docs-as-Code methodologies.
            </Translate>
          </p>
        </div>
        <div className={styles.profiles}>
          <a
            className={styles.profile}
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer">
            <GithubIcon />
            <span>
              <span className={styles.profileName}>GitHub</span>
              <span className={styles.profileHint}>
                <Translate
                  id="homepage.profile.github"
                  description="Short description of the GitHub profile link">
                  Documentation repositories
                </Translate>
              </span>
            </span>
          </a>
          <a
            className={`${styles.profile} ${styles.profileLinkedin}`}
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer">
            <LinkedinIcon />
            <span>
              <span className={styles.profileName}>LinkedIn</span>
              <span className={styles.profileHint}>
                <Translate
                  id="homepage.profile.linkedin"
                  description="Short description of the LinkedIn profile link">
                  Experience and background
                </Translate>
              </span>
            </span>
          </a>
        </div>
        </div>
        </div>
      </div>
    </header>
  );
}

function PortfolioDocs(): ReactNode {
  return (
    <section className={styles.portfolio}>
      <Heading as="h2" className={styles.sectionTitle}>
        <Translate id="homepage.docs.heading" description="Heading for the document list">
          Documentation
        </Translate>
      </Heading>
      <ul className={styles.grid}>
        {portfolioDocs.map((doc, index) => (
          <li key={doc.href}>
            <Link className={styles.panel} data-ink={doc.ink} to={doc.href}>
              <span className={styles.panelHead}>
                <span className={styles.panelNo}>{String(index + 1).padStart(2, '0')}</span>
                <Heading as="h3">{doc.title}</Heading>
              </span>
              <p>{doc.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title={translate({
        id: 'homepage.metaTitle',
        message: 'Technical Writing Portfolio',
        description: 'The homepage HTML title',
      })}
      description={translate({
        id: 'homepage.metaDescription',
        message:
          'Portfolio of Javier García-Miranda, a former software engineer and comic artist specializing in Docs-as-Code methodologies.',
        description: 'The homepage meta description',
      })}>
      <div className={styles.page}>
        <HomepageHeader />
        <main>
          <PortfolioDocs />
        </main>
      </div>
    </Layout>
  );
}
