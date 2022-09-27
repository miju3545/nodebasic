import { dirname, sep } from "path";
import { fileURLToPath } from "url";
import path from "path";
import os from "os";

// console.log(import.meta.url);
// console.log("sep>>>", sep);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// console.log(__filename);
// console.log(__dirname);

// console.log(global);
const filepath = path.join(__dirname, "hello_node.js");
console.log(filepath);
console.log(path.isAbsolute(filepath));

// format(합) - parse(분리)
const x = path.format({
  root: "/",
  dir: "/Users/miju/sesac/nodebasic/00-intro/",
  base: "hello_node.js",
  ext: ".js",
  name: "hello_node",
});
// console.log(path.basename(x), path.parse(x));

// console.log(os.cpus().length);
// console.log(os.type());
// console.log(os.version());
// const m = 1024 * 1024;
// console.log(os.freemem() / m, "/", os.totalmem() / m);
// console.log(os.hostname());

process.on("exit", (...args) => console.log("exit>>", args));
process.on("uncaughtException", (err) => {
  console.error("uncaughtException", err);
  process.exit(1);
});

// export { __filename, __dirname };
