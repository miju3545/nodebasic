import crypto from "crypto";
import util from "util";
const data = "세종대왕 훈민정음";

const salt = crypto.randomBytes(64).toString("base64");

crypto.pbkdf2(data, salt, 100000, 128, "sha512", (err, derivedKey) => {
  if (err) throw err;
  console.log("dk1>>", derivedKey.toString("base64")); // length: 256
});

const pb = util.promisify(crypto.pbkdf2);

const pdata = await pb(data, salt, 10000, 128, "sha512");
console.log(pdata.toString("base64"));

const dk2 = crypto.pbkdf2Sync(data, salt, 100000, 128, "sha512");
console.log("dk2>>", dk2.toString("base64"));
