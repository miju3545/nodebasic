import crypto from "crypto";

// 1. 다음과 같이 pbkdf2함수로 Password를 암호화하는 비동기(Promise) 함수를 작성하시오.
// (단, 16384회 key-stretching, 길이 128, 알고리즘 sha512 해싱)

const salt = crypto.randomBytes(64).toString("base64");

const data = "ThisIsATest!@##";

const encryptPassword = (data, salting = salt, hashCnt = 16384) =>
  new Promise((resolve, reject) => {
    crypto.pbkdf2(data, salting, hashCnt, 123, "sha512", (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey.toString("base64"));
    });
  });

const encryptedPassword = await encryptPassword(data, salt, 100000);
console.log("암호화된 Password>>", encryptedPassword);

// 2) 다음과 같이 위에 작성한 encryptPassword 와 scryptSync 함수의 속도를 비교해 보시오.
console.time("PBKDF2");
console.log("PBKDF2", await encryptPassword(data, salt)); // 16384
console.timeEnd("PBKDF2");

console.time("SCRYPT");
console.log(
  "SCRYPT",
  crypto.scryptSync(data, salt, 128, { N: 16384 }).toString("base64")
);
console.timeEnd("SCRYPT");

// 위시켓, 숨고,
