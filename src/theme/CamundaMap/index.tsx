import {useEffect, useState, type ReactNode} from 'react';
import {useLocation} from '@docusaurus/router';

import styles from './styles.module.css';

const CAMUNDA_GUIDE = /\/docs\/docker-quickstart(?:\/|$)/;

const MAP = `graph TD
    A[Client Application / Workflow] -->|1. Grpc Requests| B(Zeebe Engine)
    B -->|2. Export State Logs| C(Elasticsearch Database)
    D(Camunda Operate / Tasklist) -->|3. Query Operational Data| C

    style A fill:#f6c431,stroke:#1a120c,stroke-width:3px,color:#1a120c
    style B fill:#3ec6e8,stroke:#1a120c,stroke-width:3px,color:#1a120c
    style D fill:#7dce4a,stroke:#1a120c,stroke-width:3px,color:#1a120c
    style C fill:#e23d3d,stroke:#1a120c,stroke-width:3px,color:#1a120c`;

function isMapShortcut(event: KeyboardEvent): boolean {
  return (
    event.ctrlKey &&
    !event.metaKey &&
    !event.altKey &&
    !event.shiftKey &&
    event.code === 'KeyM'
  );
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  const tag = target.tagName;
  return (
    tag === 'INPUT' ||
    tag === 'TEXTAREA' ||
    tag === 'SELECT' ||
    target.isContentEditable
  );
}

export default function CamundaMap(): ReactNode {
  const {pathname} = useLocation();
  const onGuide = CAMUNDA_GUIDE.test(pathname);
  const [open, setOpen] = useState(false);
  const [svg, setSvg] = useState('');

  useEffect(() => {
    if (!onGuide) {
      setOpen(false);
      return undefined;
    }

    const show = () => setOpen(true);
    const hide = () => setOpen(false);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        hide();
        return;
      }
      if (!isMapShortcut(event) || isTypingTarget(event.target)) {
        return;
      }
      event.preventDefault();
      if (!event.repeat) {
        show();
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      if (
        event.key === 'Escape' ||
        event.key === 'Control' ||
        event.code === 'KeyM'
      ) {
        hide();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', hide);

    return () => {
      hide();
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', hide);
    };
  }, [onGuide]);

  useEffect(() => {
    if (!open) {
      setSvg('');
      return undefined;
    }
    let cancelled = false;
    const id = `camunda-map-${Math.round(Math.random() * 1_000_000_000)}`;

    (async () => {
      const mermaid = (await import('mermaid')).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        fontFamily: 'Nunito, "Segoe UI", sans-serif',
        themeVariables: {
          fontFamily: 'Nunito, "Segoe UI", sans-serif',
          fontSize: '16px',
          darkMode: false,
          background: 'transparent',
          primaryColor: '#f6c431',
          primaryTextColor: '#1a120c',
          primaryBorderColor: '#1a120c',
          lineColor: '#1a120c',
          textColor: '#1a120c',
          mainBkg: '#f6c431',
          nodeTextColor: '#1a120c',
          edgeLabelBackground: '#fff8e4',
        },
      });
      const rendered = await mermaid.render(id, MAP);
      if (!cancelled) {
        setSvg(rendered.svg);
      }
    })().catch(() => {
      if (!cancelled) {
        setSvg('');
      }
    });

    return () => {
      cancelled = true;
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className={styles.backdrop} role="presentation">
      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Camunda map">
        <div
          className="docusaurus-mermaid-container"
          dangerouslySetInnerHTML={{__html: svg}}
        />
      </div>
    </div>
  );
}
