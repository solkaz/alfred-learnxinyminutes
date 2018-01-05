'use strict';
const alfy = require('alfy');

const { parseRows } = require('./parser');

alfy.fetch('https://learnxinyminutes.com', {
	json: false,
	transform: parseRows,
	maxAge: 3600000
}).then((rows) => {
	const lowerCasedInput = alfy.input.toLowerCase();
	const items = rows.filter((row) => row.name.toLowerCase().includes(lowerCasedInput))
		.map((row) => ({
			title: row.name,
			arg: `https://learnxinyminutes.com/docs/${row.link}`
		}));

	alfy.output(items);
});

