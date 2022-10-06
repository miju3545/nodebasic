import { toUnicode } from "punycode";

const sampleUrl =
  "https://jade:1234케잌@도메인.com:8080/p/a/한글/h?query=string&city=서울#hash";

// const myurl = new URL(sampleUrl) 또는 new MyURL(sampleUrl)

class MyURL extends URL {
  format = (preString) => {
    return decodeURIComponent(preString);
  };

  toString = ({
    fragment = true,
    auth = true,
    search = true,
    unicode = false,
  }) => {
    const { protocol, username, password, host, pathname, searchParams, hash } =
      this;
    const result = `${protocol}//${
      auth ? `${username}:${password}@` : ""
    }${host}${`${pathname}`}${search ? `?${searchParams}` : ""}${
      fragment ? `${hash}` : ""
    }`;
    return unicode ? this.format(toUnicode(result)) : result;
  };
}

const myurl = new MyURL(sampleUrl);

console.log(
  myurl.toString({ fragment: true, auth: true, search: true, unicode: false })
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
