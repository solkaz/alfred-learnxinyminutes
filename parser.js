'use strict';
const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const virtualConsole = new jsdom.VirtualConsole();
const defaultJsdomOptions = { virtualConsole };

const linkStartIndex = '/docs/'.length;

const parseRows = html => {
  const { window: { document } } = new JSDOM(html, defaultJsdomOptions);

  // Learnxinyminutes has multiple topics (not just programming languages!),
  // each of which are separated into their own <table>
  const tables = Array.from(document.querySelectorAll('table'));

  // Collect all of the pages from within each topic group
  return tables.reduce((pages, table) => {
    return pages.concat(
      Array.from(table.querySelectorAll('tr'))
        // Exclude the first <tr> element as it is the <thead>;
        .slice(1)
        .map(row => {
          // Get the page name
          const link = row.querySelector('.name').firstElementChild;
          return {
            // Unfortunately JSDOM doesn't define innerText, so we need to use
            // textContent and then trim whitespaces/newlines
            name: (link.textContent || '').trim(),
            // Extract the URL param for this page, then remove the trailing '/'
            link: link.href.slice(linkStartIndex).split('/')[0],
          };
        })
    );
  }, []);
};

module.exports = {
  parseRows,
};
