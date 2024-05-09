import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';

import { findAndReplace } from 'hast-util-find-and-replace';
import { fromHtml } from 'hast-util-from-html';
import { toHtml } from 'hast-util-to-html';

const __dirname = path.resolve();

const createAST = (filePath) => {
  const html = fs.readFileSync(path.resolve(__dirname, filePath), { encoding: 'utf-8' });
  const ast = fromHtml(html, { fragment: true });

  return ast;
};

const createArray = (filePath, delimiter = /\t/) => {
  const tsv = fs.readFileSync(path.resolve(__dirname, filePath), { encoding: 'utf-8' });
  const array = tsv
    .split(/\n|\r/)
    .filter(Boolean)
    .map((row) => row.split(delimiter));

  return array;
};

const transposeArray = (array) => array[0].map((_, i) => array.map((row) => row[i]));

const createHTML = (ast, filename, row) => {
  const regexp = row.map((col, index) => [new RegExp(`\\[${index}\\]`), col]);

  findAndReplace(ast, regexp);

  fs.writeFileSync(path.resolve(__dirname, `dist/${filename}.html`), toHtml(ast));
};

const prompt = async () => {
  const { htmlPath, tsvPath, isTransposed } = await inquirer.prompt([
    {
      type: 'input',
      name: 'htmlPath',
      message: 'Please enter the HTML file name:',
      default: 'index.html',
      validate: (input) =>
        fs.existsSync(input) || 'The file does not exist. Please enter a valid HTML file name.',
    },
    {
      type: 'input',
      name: 'tsvPath',
      message: 'Please enter the TSV file name:',
      default: 'index.tsv',
      validate: (input) =>
        fs.existsSync(input) || 'The file does not exist. Please enter a valid TSV file name.',
    },
    {
      type: 'confirm',
      name: 'isTransposed',
      message: 'Do you want to transpose the array?',
    },
  ]);

  const ast = createAST(htmlPath);
  const array = isTransposed ? transposeArray(createArray(tsvPath)) : createArray(tsvPath);

  const { selected } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selected',
      message: 'Please select the type of file you want to create.',
      choices: array.map((row) => row[0]),
    },
  ]);

  array.forEach((row) => {
    const [filename, ...rest] = row;

    if (!selected.includes(filename)) return;
    createHTML(JSON.parse(JSON.stringify(ast)), filename, rest);
  });
};

prompt();
