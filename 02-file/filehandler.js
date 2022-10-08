import { open } from "fs/promises";

const hfile = new URL("test.txt", import.meta.url);
import { writeFile } from "fs/promises";

let fh;

try {
  fh = await open(hfile, "a+");
  // console.log(await fh.stat());
  // fh.writeFile("훈민정음").then(async err=> {
  // console.log()
  // });

  const buf = Buffer.from("세종대왕\n");
  await fh.write(buf, 0, buf.length, 0);
} catch (error) {
  console.error("ERROR", error);
} finally {
  fh?.close();
}
