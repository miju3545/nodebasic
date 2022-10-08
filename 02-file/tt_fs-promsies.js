import { mkdir } from "fs/promises";
import { readFile, writeFile, readdir, rm } from "fs/promises";
import path from "node:path";
import { fileURLToPath } from "url";

const kingsFolder = new URL("./kings", import.meta.url);
const kingsDir = await mkdir(kingsFolder, { recursive: true });
const sejongFolder = await mkdir(new URL("./kings/sejong", import.meta.url), {
  recursive: true,
});

const kingNames = await writeFile("./kings/king-names.txt", "세종대왕");
const sejongAssets = await writeFile("./kings/sejong/sejong.txt", "훈민정음");

const rootFiles = await readdir("../");

console.log("nodebasic");
const dir = path.dirname(fileURLToPath(import.meta.url));

recur(rootFiles);

const kingsTxt = await readFile("./kings/king-names.txt", { encoding: "utf8" });
const sejongTxt = await readFile("./kings/sejong/sejong.txt", {
  encoding: "utf8",
});

console.log("king-names.txt>>>", kingsTxt);
console.log("sejong.txt>>>", sejongTxt);

rm("./kings", { recursive: true, force: true });
