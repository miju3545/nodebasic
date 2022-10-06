import { toUnicode } from "punycode";

const sampleUrl =
  "https://jade:1234케잌@도메인.com:8080/p/a/한글/h?query=string&city=서울#hash";
// const myurl = new URL(sampleUrl) 또는 new MyURL(sampleUrl)

const xxFn = function toString({
  fragment = true,
  auth = true,
  search = true,
  unicode = false,
} = {}) {
  const isMyUrl = this instanceof MyURL;
  if (isMyUrl && fragment && auth && search && !unicode) return this.toString();

  const rets = [];
  rets.push(this.protocol);
  rets.push("//");

  if (auth) {
    rets.push(this.username);
    rets.push(":");
    rets.push(this.password);
    rets.push("@");
  }
  rets.push(unicode ? toUnicode(this.host) : this.host);
  rets.push(this.pathname);
  if (search) rets.push(this.search);
  if (fragment) rets.push(this.hash);

  if (unicode) return decodeURI(rets.join(""));
  return rets.join("");
};

URL.prototype.toString = xxFn;

class MyURL extends URL {
  toString = xxFn;
}

const myurl = new MyURL(sampleUrl);
const _url = new URL(sampleUrl);

console.log(
  myurl.toString({ fragment: true, auth: true, search: true, unicode: false })
); // all default
// ⇒ https://jade:1234%EC%BC%80%EC%9E%8C@xn--5u5b99k.com:8080/p/a/%ED%95%9C%EA%B8%80/h?query=string&city=%EC%84%9C%EC%9A%B8#hash

console.log(
  _url.toString({ fragment: true, auth: true, search: true, unicode: false })
); // all default
// ⇒ https://jade:1234%EC%BC%80%EC%9E%8C@xn--5u5b99k.com:8080/p/a/%ED%95%9C%EA%B8%80/h?query=string&city=%EC%84%9C%EC%9A%B8#hash

console.log(
  myurl.toString({ fragment: false, auth: true, search: true, unicode: false })
);
// ⇒ https://jade:1234%EC%BC%80%EC%9E%8C@xn--5u5b99k.com:8080/p/a/%ED%95%9C%EA%B8%80/h?query=string&city=%EC%84%9C%EC%9A%B8

console.log(
  myurl.toString({ fragment: false, auth: true, search: true, unicode: true })
);
// ⇒ https://jade:1234케잌@도메인.com:8080/p/a/한글/h?query=string&city=서울

console.log(
  myurl.toString({ fragment: false, auth: false, search: true, unicode: true })
);
// ⇒ https://도메인.com:8080/p/a/한글/h?query=string&city=서울

console.log(myurl.toString({ fragment: false, auth: false, search: false }));
// ⇒ https://xn--5u5b99k.com:8080/p/a/%ED%95%9C%EA%B8%80/h

console.log(
  myurl.toString({ fragment: false, auth: false, search: false, unicode: true })
);
// ⇒ https://도메인.com:8080/p/a/한글/h
