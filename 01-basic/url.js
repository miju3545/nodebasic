import url from "url";
const sampleUrl =
  "https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash";
const parsedUrl = url.parse(sampleUrl);
console.log(parsedUrl); // Url type (urlObject)

// function URL(url) {
//   const format = (paresUrl, options) => {};
// }

const surl = new URL(sampleUrl); // url.parse 와 유사
const sp = surl.searchParams;
console.log(surl);
sp.append("content", "this is a test.");
sp.append("content", "this is a test2.");
console.log(sp.getAll("content"));
sp.forEach((v, k) => console.log(k, ":", v));
