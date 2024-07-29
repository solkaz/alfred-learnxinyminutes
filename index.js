import alfy from 'alfy';
import { parseRows } from './parser.js';

const data = await alfy.fetch('https://learnxinyminutes.com', {
  json: false,
  transform: parseRows,
  maxAge: 3600000,
});

const items = alfy
  .inputMatches(data, (item, input) => {
    return item.name?.toLowerCase().includes(input.toLowerCase());
  })
  .map((row) => {
    const link = `https://learnxinyminutes.com/docs/${row.link}`;
    return {
      title: row.name,
      subtitle: link,
      arg: link,
      valid: true,
    };
  });

alfy.output(items);
