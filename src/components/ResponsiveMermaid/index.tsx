import {useSyncExternalStore, type ReactNode} from 'react';
import Mermaid from '@theme/Mermaid';

// Same breakpoint Infima uses to collapse the navbar.
const DESKTOP_QUERY = '(min-width: 996px)';

function subscribe(onChange: () => void): () => void {
  const media = window.matchMedia(DESKTOP_QUERY);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

function getSnapshot(): boolean | null {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

function getServerSnapshot(): boolean | null {
  return null;
}

type Props = {
  /** One graph. Direction is chosen for the viewport: LR on desktop, TB on mobile. */
  chart?: string;
  /** Full diagram, including its flowchart direction, shown at desktop width. */
  wide?: string;
  /** Full diagram, including its flowchart direction, shown below desktop width. */
  narrow?: string;
};

function diagramSource(
  desktop: boolean,
  chart: string | undefined,
  wide: string | undefined,
  narrow: string | undefined,
): string | null {
  const chosen = desktop ? (wide ?? chart) : (narrow ?? chart);
  if (!chosen?.trim()) {
    return null;
  }
  if (/^\s*(flowchart|graph)\b/i.test(chosen)) {
    return chosen.trim();
  }
  return `flowchart ${desktop ? 'LR' : 'TB'}\n${chosen.trim()}`;
}

export default function ResponsiveMermaid({
  chart,
  wide,
  narrow,
}: Props): ReactNode {
  const desktop = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (desktop === null) {
    return null;
  }

  const value = diagramSource(desktop, chart, wide, narrow);
  if (!value) {
    return null;
  }

  return <Mermaid key={value} value={value} />;
}
