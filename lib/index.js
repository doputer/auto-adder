import fs from "fs/promises";
import path from "path";

import { findAndReplace } from "hast-util-find-and-replace";
import { fromHtml } from "hast-util-from-html";
import { toHtml } from "hast-util-to-html";

const __dirname = path.resolve();

const getDatas = async () => {
  const tsv = await fs.readFile(path.resolve(__dirname, "data/data.tsv"), {
    encoding: "utf-8",
  });
  const array = tsv
    .split(/\n|\r/)
    .filter(Boolean)
    .map((row) => row.split(/\t/));
  const transposeArray = array[0].map((_, i) => array.map((row) => row[i]));

  return transposeArray;
};

const getAST = async () => {
  const html = await fs.readFile(path.resolve(__dirname, 'data/template.html'), {
    encoding: 'utf-8',
  });
  const ast = fromHtml(html, { fragment: true });

  return ast;
};

const createFile = async (ast, data) => {
  const filename = process.argv[2] ? `${process.argv[2]}_${data[0]}` : data[0];
  const regexp = data.slice(1).map((el, index) => [new RegExp(index), el]);
  const obj = JSON.parse(JSON.stringify(ast));

  findAndReplace(obj, regexp);

  fs.writeFile(path.resolve(__dirname, `dist/${filename}.html`), toHtml(obj));
};

const main = async () => {
  const ast = await getAST();
  const datas = await getDatas();

  Promise.all(datas.map((data) => createFile(ast, data)));
};

main();
