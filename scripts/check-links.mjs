import {readFile} from 'node:fs/promises';
import {LinkChecker} from 'linkinator';

const config = JSON.parse(
  await readFile(new URL('../linkinator.config.json', import.meta.url), 'utf8'),
);

const targets =
  process.argv.length > 2
    ? process.argv.slice(2)
    : ['http://127.0.0.1:4173', 'http://127.0.0.1:4173/es'];

// Keep the process alive until the crawl settles. On Node 20 the linkinator
// CLI can exit while requests are still in flight.
const keepAlive = setInterval(() => {}, 1000);
const checker = new LinkChecker();
const broken = [];

checker.on('link', (link) => {
  if (link.state === 'BROKEN') {
    broken.push(link);
  }
});

let result;
try {
  result = await checker.check({
    path: targets,
    recurse: config.recurse,
    timeout: config.timeout,
    concurrency: config.concurrency,
    retry: config.retry,
    retryErrors: config.retryErrors,
    retryErrorsCount: config.retryErrorsCount,
    retryErrorsJitter: config.retryErrorsJitter,
    linksToSkip: config.skip,
    urlRewriteExpressions: [
      {
        pattern: new RegExp(config.urlRewriteSearch),
        replacement: config.urlRewriteReplace,
      },
    ],
  });
} finally {
  clearInterval(keepAlive);
}

if (!result.passed) {
  for (const link of broken) {
    const parent = link.parent ? ` (from ${link.parent})` : '';
    console.error(`[${link.status}] ${link.url}${parent}`);
  }
  console.error(`Detected ${broken.length} broken links.`);
  process.exit(1);
}

const checked = result.links.filter((link) => link.state !== 'SKIPPED').length;
console.log(`Checked ${checked} links.`);
