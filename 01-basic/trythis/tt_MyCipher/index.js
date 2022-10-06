import { MyCipher } from "./mycipher.js";
import { MyCipherLecture } from "./lecture_mycipher.js";
import { argv } from "node:process";

const myCipher = new MyCipher();

const data = "@시코-시니어코딩";

const encryptedData = myCipher.encrypt(data);
// console.log("ENC>>", encryptedData);

const descryptedData = myCipher.decrypt(encryptedData);
// console.log("결과>>", descryptedData, descryptedData === data);
