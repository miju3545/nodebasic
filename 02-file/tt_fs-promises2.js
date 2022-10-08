import { mkdir } from "fs/promises";
import { readFile, writeFile, readdir, mkdir, rm } from "fs/promises";
import { join } from "node:path";
import { existsSync } from "fs";
import { basename } from "path";

const { pathname: curr } = new URL(".", import.meta.url);

const kingFld = join(curr, "kings");
const sejongFld = join(kingFld, "sejong");
const kingNameFld = join(kingFld, "king-names.txt");
const sejongFile = join(kingFld, "sejong.txt");

try {
  // 1.
  if (!existsSync(sejongFld)) {
    await mkdir(sejongFld, { recursive: true });
  }
  if (!existsSync(kingNameFld)) {
    await writeFile(kingNameFld, "세종대왕");
  }
  if (!existsSync(sejongFile)) {
    await writeFile(sejongFile, "훈민정음");
  }

  // 2.
  const ls = async (fld, depth = 0) => {
    const bname = basename(fld);
    console.log(" ".repeat(depth), fld);
    const files = await readdir(fld, { withFileTypes: true });

    for (const file of files) {
      if (
        !file.isDirectory() ||
        file.name.startsWith(".") ||
        file.name === "node_modules"
      ) {
        continue;
      }

      await ls(join(fld, file.name), depth + 1);
    }
  };

  ls(curr);

  // 3.

  [kingNameFile, sejongFile].forEach((f) => {
    readFile(f, "utf-8").then((data) => {
      console.log("kingNameFile", "\n", data);
      console.log("--------", basename(f));
    });
  });

  rm(kingFld, { recursive: true, force: true });
} catch (error) {}
