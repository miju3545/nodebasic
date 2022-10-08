import { readFile, readFileSync } from "node:fs";
import util from "util";
import path from "path";

// const file = path.json(__dirname, ".././package.json");
const hfile = new URL(".././package.json", import.meta.url); // import.meta.url === __dirname
const usePromise = true;

// const { signal } = controller; // === eventEmitter(controller.abort())

// app.get("/download", (req, res ) => {
//    data = await readFile({signal});
//    res.write(data)
// })
// app.get("/abort", (req, res ) => {
//    controller.abort();
// })

// readFile({ signal });

if (usePromise) {
  const { readFile, writeFile, appendFile } = fs.promises;
  await writeFile("세종대왕");
  await appendFile("광개토대왕");
  const data = await readFile(hfile, { encoding: "utf8", flag: "w+" }); // data.toString()
  console.log("data", data);
} else {
  readFile(hfile, (err, data) => {
    if (err) throw err;
    console.log("data>>", data.length, data instanceof Buffer);
    console.log("data>>", data.toString(), data instanceof Buffer);
  });
}

// utils.promisify (...args, (err, result) => {..})
// await보단 then을 먼저 고려할 것.

const data = await util.promisify(readFile)("./package.json");
console.log(";;>>", data.toString("utf8"));

const data2 = readFileSync("./package.json");
console.log(";;>>", data2.toString("utf8"));


const projectFolder = new URL('./test/project/', import.meta.url);
const createDir = await mkdir(projectFolder, { recursive: true });


rm(new URL('./test', import.meta.url), { recursive: true, force: true });
rm('./test', { recursive: true, force: true });  // rmdir's recursive is deprecated!!

const files = await readdir('.', { withFileTypes: true });
for (const file of files) console.log('f=', file.name, file.isDirectory());

const sss = await readlink('./sss');
console.log('sss>>', sss);
