// hellonode.js
import { __dirname, __filename } from "./nodeutils.js";
// import { __ } from "./nodeutils.js";
// cf. const { __dirname, __filename } = require('./nodeutils');
// const { __dirname, __filename } = __(import.meta.url);

console.log(__dirname);
console.log(__filename);

// 출력 결과
// /Users/miju/sesac/nodebasic/00-intro
// /Users/miju/sesac/nodebasic/00-intro/nodeutils.js
