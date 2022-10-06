import { Buffer } from "node:buffer";

const str = "AZaz123";

const buf = Buffer.from(str);
console.log(buf.toString());

const buf2 = Buffer.from(str, "utf8");
console.log(buf2.toString());

const buf3 = Buffer.from("Adzzda31🚀", "utf8");
console.log(buf3.toString());
console.log(buf3);

console.log(Buffer.alloc(8, 1));
console.log(Buffer.concat([buf, buf2, buf3]));
