import crypto from "crypto";
import { argv } from "node:process";

const KEY = Buffer.from("seniorcoding!@#$".repeat(2));
const ALGORITHM = "aes-256-cbc";
const DIGEST = "base64";

class MyCipher {
  constructor() {
    this.iv = crypto.randomBytes(16);
  }

  encrypt(data) {
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, this.iv);
    const encUpdateBuffer = cipher.update(data);
    const encrypted = Buffer.concat([encUpdateBuffer, cipher.final()]).toString(
      DIGEST
    );

    return `${this.iv.toString("hex")}:${encrypted}`;
  }

  decrypt(enc) {
    const [iv, encData] = enc.split(":");
    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      KEY,
      Buffer.from(iv, "hex")
    );
    const decUpdateBuffer = decipher.update(enc.split(":")[1], DIGEST);
    const decrypted = Buffer.concat([
      decUpdateBuffer,
      decipher.final(),
    ]).toString();
    return decrypted;
  }
}

const mycipher = new MyCipher();

const argvLen = process.argv?.length;

if (argvLen > 2 && argvLen !== 4) {
  console.log("useage > node mycipher [-e|-enc] data");
  console.log("useage > node mycipher [-e|-dec] encryptedData");
  process.exit(1);
}

if (argvLen === 4) {
  const [flag, data] = process.argv.slice(2, 4);
  const mycipter = new MyCipher();

  if (flag?.startsWith("-e")) {
    console.log(mycipter.encrypt(data));
  } else {
    console.log(mycipter.decrypt(data));
  }
}

export { MyCipher };
