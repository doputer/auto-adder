import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';

import { findAndReplace } from 'hast-util-find-and-replace';
import { fromHtml } from 'hast-util-from-html';
import { toHtml } from 'hast-util-to-html';

const __dirname = path.resolve();

const createAST = (filePath) => {
  const html = fs.readFileSync(path.resolve(__dirname, filePath), {
    encoding: 'utf-8',
  });
  const ast = fromHtml(html, {
    fragment: true,
  });

  return ast;
};

const createArray = (filePath) => {
  const tsv = fs.readFileSync(path.resolve(__dirname, filePath), {
    encoding: 'utf-8',
  });
  const array = tsv
    .split(/\n|\r/)
    .filter(Boolean)
    .map((row) => row.split(/\t/));

  return array;
};

const transposeArray = (array) => array[0].map((_, i) => array.map((row) => row[i]));

const createHTML = async (ast, data) => {
  const filename = data[0];
  const regexp = data.slice(1).map((el, index) => [new RegExp(index), el]);
  const obj = JSON.parse(JSON.stringify(ast));

  findAndReplace(obj, regexp);

  fs.writeFileSync(path.resolve(__dirname, `dist/${filename}.html`), toHtml(obj));
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

  array.forEach((data) => {
    if (!selected.includes(data[0])) return;
    createHTML(ast, data);
  });
};

prompt();
