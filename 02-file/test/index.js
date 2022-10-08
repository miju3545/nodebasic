import { mkdir } from "fs/promises";
import { readdir } from "fs/promises";
import path from "node:path";
import { fileURLToPath } from "url";

const rootFiles = await readdir("./");

let __dirname = path.dirname(fileURLToPath(import.meta.url));
const dept = [];
let level = 0;

const showFiles = async (curPath, files) => {
  if (!files.length) level--;
  dept.push(" ");

  for (let file of files) {
    if (file.startsWith(".")) continue;
    console.log(dept.join("") + "˲", file);

    if (!path.extname(file)) {
      const p = curPath + `/${file}`;
      console.log(p);
      const sub = await readdir(p);
      showFiles(p, sub);
    }
  }

  level++;
  dept.length = level;
};

console.log("test");
showFiles(path.join(__dirname), rootFiles);
