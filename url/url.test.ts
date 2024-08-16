import * as assert from "assert"
import * as url from "./url"

export function urlTest() {
	assert.strictEqual(url.formatURL(url.parseURL("http://tealui.com/index.html?from=parse")), "http://tealui.com/index.html?from=parse")
}

export function resolveURLTest() {
	assert.strictEqual(url.resolveURL("foo/", "goo"), "foo/goo")

	assert.strictEqual(url.resolveURL("foo", ""), "foo")
	assert.strictEqual(url.resolveURL("foo", "."), "")
	assert.strictEqual(url.resolveURL("foo", ".."), "..")
	assert.strictEqual(url.resolveURL("foo", "goo"), "goo")
	assert.strictEqual(url.resolveURL("foo", "goo/"), "goo/")
	assert.strictEqual(url.resolveURL("foo", "goo//"), "goo//")
	assert.strictEqual(url.resolveURL("foo", "./goo"), "goo")
	assert.strictEqual(url.resolveURL("foo", "../goo/goo"), "../goo/goo")
	assert.strictEqual(url.resolveURL("foo", "/goo"), "/goo")
	assert.strictEqual(url.resolveURL("foo", "//goo"), "//goo")
	assert.strictEqual(url.resolveURL("foo", "?goo=1"), "foo?goo=1")
	assert.strictEqual(url.resolveURL("foo", "#goo"), "foo#goo")
	assert.strictEqual(url.resolveURL("foo", "http://www.tealui.com"), "http://www.tealui.com/")
	assert.strictEqual(url.resolveURL("foo", "data:text/javascript;base64,foo,bar"), "data:text/javascript;base64,foo,bar")

	assert.strictEqual(url.resolveURL("foo/", ""), "foo/")
	assert.strictEqual(url.resolveURL("foo/", "."), "foo/")
	assert.strictEqual(url.resolveURL("foo/", ".."), "")
	assert.strictEqual(url.resolveURL("foo/", "goo/"), "foo/goo/")
	assert.strictEqual(url.resolveURL("foo/", "goo//"), "foo/goo//")
	assert.strictEqual(url.resolveURL("foo/", "./goo"), "foo/goo")
	assert.strictEqual(url.resolveURL("foo/", "../goo/goo"), "goo/goo")
	assert.strictEqual(url.resolveURL("foo/", "/goo"), "/goo")
	assert.strictEqual(url.resolveURL("foo/", "//goo"), "//goo")
	assert.strictEqual(url.resolveURL("foo/", "?goo=1"), "foo/?goo=1")
	assert.strictEqual(url.resolveURL("foo/", "#goo"), "foo/#goo")
	assert.strictEqual(url.resolveURL("foo/", "http://www.tealui.com"), "http://www.tealui.com/")
	assert.strictEqual(url.resolveURL("foo/", "data:text/javascript;base64,foo,bar"), "data:text/javascript;base64,foo,bar")

	assert.strictEqual(url.resolveURL("foo/goo", ""), "foo/goo")
	assert.strictEqual(url.resolveURL("foo/goo", "."), "foo/")
	assert.strictEqual(url.resolveURL("foo/goo", ".."), "")
	assert.strictEqual(url.resolveURL("foo/goo", "hoo"), "foo/hoo")
	assert.strictEqual(url.resolveURL("foo/goo", "hoo/"), "foo/hoo/")
	assert.strictEqual(url.resolveURL("foo/goo", "hoo//"), "foo/hoo//")
	assert.strictEqual(url.resolveURL("foo/goo", "./hoo"), "foo/hoo")
	assert.strictEqual(url.resolveURL("foo/goo", "../hoo/hoo"), "hoo/hoo")
	assert.strictEqual(url.resolveURL("foo/goo", "/hoo"), "/hoo")
	assert.strictEqual(url.resolveURL("foo/goo", "//hoo"), "//hoo")
	assert.strictEqual(url.resolveURL("foo/goo", "?hoo=1"), "foo/goo?hoo=1")
	assert.strictEqual(url.resolveURL("foo/goo", "#hoo"), "foo/goo#hoo")
	assert.strictEqual(url.resolveURL("foo/goo", "http://www.tealui.com"), "http://www.tealui.com/")
	assert.strictEqual(url.resolveURL("foo/goo", "data:text/javascript;base64,foo,bar"), "data:text/javascript;base64,foo,bar")

	assert.strictEqual(url.resolveURL("", ""), "")
	assert.strictEqual(url.resolveURL("", "."), "")
	assert.strictEqual(url.resolveURL("", ".."), "..")
	assert.strictEqual(url.resolveURL("", "goo"), "goo")
	assert.strictEqual(url.resolveURL("", "goo/"), "goo/")
	assert.strictEqual(url.resolveURL("", "goo//"), "goo//")
	assert.strictEqual(url.resolveURL("", "./goo"), "goo")
	assert.strictEqual(url.resolveURL("", "../goo/goo"), "../goo/goo")
	assert.strictEqual(url.resolveURL("", "/goo"), "/goo")
	assert.strictEqual(url.resolveURL("", "//goo"), "//goo")
	assert.strictEqual(url.resolveURL("", "?goo=1"), "?goo=1")
	assert.strictEqual(url.resolveURL("", "#goo"), "#goo")
	assert.strictEqual(url.resolveURL("", "http://www.tealui.com"), "http://www.tealui.com/")
	assert.strictEqual(url.resolveURL("", "data:text/javascript;base64,foo,bar"), "data:text/javascript;base64,foo,bar")

	assert.strictEqual(url.resolveURL("//www.tealui.com", ""), "//www.tealui.com")
	assert.strictEqual(url.resolveURL("//www.tealui.com", "."), "//www.tealui.com/")
	assert.strictEqual(url.resolveURL("//www.tealui.com", ".."), "//www.tealui.com/")
	assert.strictEqual(url.resolveURL("//www.tealui.com", "goo"), "//www.tealui.com/goo")
	assert.strictEqual(url.resolveURL("//www.tealui.com", "goo/"), "//www.tealui.com/goo/")
	assert.strictEqual(url.resolveURL("//www.tealui.com", "goo//"), "//www.tealui.com/goo//")
	assert.strictEqual(url.resolveURL("//www.tealui.com", "./goo"), "//www.tealui.com/goo")
	assert.strictEqual(url.resolveURL("//www.tealui.com", "../goo/goo"), "//www.tealui.com/goo/goo")
	assert.strictEqual(url.resolveURL("//www.tealui.com", "/goo"), "//www.tealui.com/goo")
	assert.strictEqual(url.resolveURL("//www.tealui.com", "//goo"), "//goo")
	assert.strictEqual(url.resolveURL("//www.tealui.com", "?goo=1"), "//www.tealui.com?goo=1")
	assert.strictEqual(url.resolveURL("//www.tealui.com", "#goo"), "//www.tealui.com#goo")
	assert.strictEqual(url.resolveURL("//www.tealui.com", "http://www.tealui.com"), "http://www.tealui.com/")
	assert.strictEqual(url.resolveURL("//www.tealui.com", "data:text/javascript;base64,foo,bar"), "data:text/javascript;base64,foo,bar")

	assert.strictEqual(url.resolveURL("", "http://www.tealui.com"), "http://www.tealui.com/")
	assert.strictEqual(url.resolveURL(".", "http://www.tealui.com"), "http://www.tealui.com/")
	assert.strictEqual(url.resolveURL("", "data:text/javascript;base64,foo,bar"), "data:text/javascript;base64,foo,bar")
	assert.strictEqual(url.resolveURL(".", "data:text/javascript;base64,foo,bar"), "data:text/javascript;base64,foo,bar")

	assert.strictEqual(url.resolveURL("..//", "foo"), "..//foo")
	assert.strictEqual(url.resolveURL("..//", "foo/"), "..//foo/")
	assert.strictEqual(url.resolveURL("..//", "foo//"), "..//foo//")

	assert.strictEqual(url.resolveURL("..//", "..//"), "..//")
	assert.strictEqual(url.resolveURL("..//", "../foo/foo"), "../foo/foo")

	assert.strictEqual(url.resolveURL("..//", "."), "../")
	assert.strictEqual(url.resolveURL("..//", "./foo"), "..//foo")

	assert.strictEqual(url.resolveURL("..//", "http://www.tealui.com"), "http://www.tealui.com/")
	assert.strictEqual(url.resolveURL("..//", "data:text/javascript;base64,foo,bar"), "data:text/javascript;base64,foo,bar")

	assert.strictEqual(url.resolveURL("foo", "goo?hoo=1"), "goo?hoo=1")
	assert.strictEqual(url.resolveURL("foo/", ""), "foo/")
	assert.strictEqual(url.resolveURL("foo/", "."), "foo/")
	assert.strictEqual(url.resolveURL("foo//", ""), "foo//")
	assert.strictEqual(url.resolveURL("foo//", "."), "foo/")
	assert.strictEqual(url.resolveURL("/foo", ""), "/foo")
	assert.strictEqual(url.resolveURL("/foo", "."), "/")
	assert.strictEqual(url.resolveURL("", ""), "")
	assert.strictEqual(url.resolveURL(".", ""), ".")
	assert.strictEqual(url.resolveURL(".", "."), "")
	assert.strictEqual(url.resolveURL("..", ""), "..")
	assert.strictEqual(url.resolveURL("..", "."), "")
	assert.strictEqual(url.resolveURL("http://foo.org/goo", ""), "http://foo.org/goo")
	assert.strictEqual(url.resolveURL("http://foo.org/goo", "."), "http://foo.org/")
	assert.strictEqual(url.resolveURL("http://foo.org/goo/", ""), "http://foo.org/goo/")
	assert.strictEqual(url.resolveURL("http://foo.org/goo/", "."), "http://foo.org/goo/")
	assert.strictEqual(url.resolveURL("http://foo.org/goo//", ""), "http://foo.org/goo//")
	assert.strictEqual(url.resolveURL("http://foo.org/goo//", "."), "http://foo.org/goo/")
	assert.strictEqual(url.resolveURL("http://foo.org", ""), "http://foo.org/")
	assert.strictEqual(url.resolveURL("http://foo.org", "."), "http://foo.org/")
	assert.strictEqual(url.resolveURL("http://foo.org/", ""), "http://foo.org/")
	assert.strictEqual(url.resolveURL("http://foo.org/", "."), "http://foo.org/")
	assert.strictEqual(url.resolveURL("http://foo.org//", ""), "http://foo.org//")
	assert.strictEqual(url.resolveURL("http://foo.org//", "."), "http://foo.org/")
	assert.strictEqual(url.resolveURL("//www.tealui.com", ""), "//www.tealui.com")
	assert.strictEqual(url.resolveURL("//www.tealui.com", "."), "//www.tealui.com/")

	assert.strictEqual(url.resolveURL("http://foo.org/goo", "hoo"), "http://foo.org/hoo")
	assert.strictEqual(url.resolveURL("http://foo.org/goo/", "hoo"), "http://foo.org/goo/hoo")
	assert.strictEqual(url.resolveURL("http://foo.org/goo//", "hoo"), "http://foo.org/goo//hoo")
	assert.strictEqual(url.resolveURL("http://foo.org/goo", "hoo/"), "http://foo.org/hoo/")
	assert.strictEqual(url.resolveURL("http://foo.org/goo", "hoo//"), "http://foo.org/hoo//")
	assert.strictEqual(url.resolveURL("http://foo.org/goo/", "/hoo"), "http://foo.org/hoo")
	assert.strictEqual(url.resolveURL("http://foo.org/goo//", "//hoo"), "http://hoo/")

	assert.strictEqual(url.resolveURL("http://foo.org/goo", ".."), "http://foo.org/")
	assert.strictEqual(url.resolveURL("http://foo.org/goo", "../goo/goo"), "http://foo.org/goo/goo")
	assert.strictEqual(url.resolveURL("http://foo.org/goo/goo", "../hoo/hoo"), "http://foo.org/hoo/hoo")

	assert.strictEqual(url.resolveURL("http://foo.org/goo", "."), "http://foo.org/")
	assert.strictEqual(url.resolveURL("http://foo.org/goo", "./goo"), "http://foo.org/goo")
	assert.strictEqual(url.resolveURL("http://foo.org/goo/goo", "./hoo"), "http://foo.org/goo/hoo")

	assert.strictEqual(url.resolveURL("http://foo.org/goo", "http://www.tealui.com"), "http://www.tealui.com/")
	assert.strictEqual(url.resolveURL("http://foo.org/goo", "data:text/javascript;base64,foo,bar"), "data:text/javascript;base64,foo,bar")

	assert.strictEqual(url.resolveURL("http://foo.org", "goo"), "http://foo.org/goo")
	assert.strictEqual(url.resolveURL("http://foo.org/", "goo"), "http://foo.org/goo")
	assert.strictEqual(url.resolveURL("http://foo.org//", "goo"), "http://foo.org//goo")
	assert.strictEqual(url.resolveURL("http://foo.org", "/goo"), "http://foo.org/goo")
	assert.strictEqual(url.resolveURL("http://foo.org/", "/goo"), "http://foo.org/goo")
	assert.strictEqual(url.resolveURL("http://foo.org//", "/goo"), "http://foo.org/goo")

	assert.strictEqual(url.resolveURL("http://", "//www.tealui.com"), "http://www.tealui.com/")
	assert.strictEqual(url.resolveURL("file:///", "///www.tealui.com"), "file:///www.tealui.com")
	assert.strictEqual(url.resolveURL("http://", "ftp://tealui.com"), "ftp://tealui.com/")

	assert.strictEqual(url.resolveURL("http://www.tealui.com", "//foo.org/bar"), "http://foo.org/bar")
	assert.strictEqual(url.resolveURL("//www.tealui.com", "//foo.org/bar"), "//foo.org/bar")
	assert.strictEqual(url.resolveURL("E:\\foo\\goo", "hoo?a=1"), "e:/foo/hoo?a=1")
	assert.strictEqual(url.resolveURL("E:/foo/goo.html", "hoo.jpg"), "e:/foo/hoo.jpg")
	assert.strictEqual(url.resolveURL("E:/foo/goo.html", "./hoo.jpg?a=1"), "e:/foo/hoo.jpg?a=1")
	assert.strictEqual(url.resolveURL("E:/foo/goo.html", "../hoo.jpg?a=1"), "e:/hoo.jpg?a=1")
	assert.strictEqual(url.resolveURL("E:/foo/goo.html", "goo/hoo.jpg?a=1#hash"), "e:/foo/goo/hoo.jpg?a=1#hash")
}

export function relativeURLTest() {
	assert.strictEqual(url.relativeURL("foo/", "foo/goo"), "goo")

	assert.strictEqual(url.relativeURL("foo", ""), ".")
	assert.strictEqual(url.relativeURL("foo", "."), ".")
	assert.strictEqual(url.relativeURL("foo", ".."), "..")
	assert.strictEqual(url.relativeURL("foo", "foo2"), "foo2")
	assert.strictEqual(url.relativeURL("foo", "foo/goo"), "foo/goo")
	assert.strictEqual(url.relativeURL("foo", "foo/goo?hoo=1"), "foo/goo?hoo=1")
	assert.strictEqual(url.relativeURL("foo", "../foo/goo"), "../foo/goo")
	assert.strictEqual(url.relativeURL("foo", "/foo2"), "/foo2")
	assert.strictEqual(url.relativeURL("foo", "http://the"), "http://the/")

	assert.strictEqual(url.relativeURL("foo/", ""), "../")
	assert.strictEqual(url.relativeURL("foo/", "."), "../")
	assert.strictEqual(url.relativeURL("foo/", ".."), "../..")
	assert.strictEqual(url.relativeURL("foo/", "foo2"), "../foo2")
	assert.strictEqual(url.relativeURL("foo/", "foo/goo?hoo=1"), "goo?hoo=1")
	assert.strictEqual(url.relativeURL("foo/", "../foo/goo"), "../../foo/goo")
	assert.strictEqual(url.relativeURL("foo/", "/foo2"), "/foo2")
	assert.strictEqual(url.relativeURL("foo/", "http://the"), "http://the/")

	assert.strictEqual(url.relativeURL("/the/root", "/the/root/one.js"), "root/one.js")
	assert.strictEqual(url.relativeURL("/the/root/", "/the/root/"), "./")
	assert.strictEqual(url.relativeURL("http://the", "http://the"), ".")
	assert.strictEqual(url.relativeURL("http://the", "http://the/foo"), "/foo")
	assert.strictEqual(url.relativeURL("http://the/foo", "http://the"), ".")
	assert.strictEqual(url.relativeURL("http://the/", "http://the/"), ".")
	assert.strictEqual(url.relativeURL("http://the/root/", "http://the/root/one.js"), "one.js")
	assert.strictEqual(url.relativeURL("/the/root", "/the/rootone.js"), "rootone.js")
	assert.strictEqual(url.relativeURL("http://the/root/", "http://the/rootone.js"), "../rootone.js")
	assert.strictEqual(url.relativeURL("/the/root", "/therootone.js"), "../therootone.js")
	assert.strictEqual(url.relativeURL("http://the/root", "/therootone.js"), "/therootone.js")

	assert.strictEqual(url.relativeURL("", "/the/root/one.js"), "/the/root/one.js")
	assert.strictEqual(url.relativeURL(".", "/the/root/one.js"), "/the/root/one.js")
	assert.strictEqual(url.relativeURL("", "the/root/one.js"), "the/root/one.js")
	assert.strictEqual(url.relativeURL(".", "the/root/one.js"), "the/root/one.js")

	assert.strictEqual(url.relativeURL("foo2", "foo"), "foo")
	assert.strictEqual(url.relativeURL("/", "/"), ".")

	assert.strictEqual(url.relativeURL("/", "//the/root/one.js"), "//the/root/one.js")
	assert.strictEqual(url.relativeURL("/", "/the/root/one.js"), "/the/root/one.js")
	assert.strictEqual(url.relativeURL("/", "the/root/one.js"), "the/root/one.js")
	assert.strictEqual(url.relativeURL("http://the", "http://foo"), "//foo/")
	assert.strictEqual(url.relativeURL("foo", "data:text/javascript;base64,foo,bar"), "data:text/javascript;base64,foo,bar")

	assert.strictEqual(url.relativeURL("http://a/a.jpg", "http://b/a.jpg"), "//b/a.jpg")
	assert.strictEqual(url.relativeURL("http://a/a.jpg", "http:b/a.jpg"), "http:b/a.jpg")
	assert.strictEqual(url.relativeURL("my-protocol://a/a.jpg", "my-protocol:/b/a.jpg"), "my-protocol:/b/a.jpg")
	assert.strictEqual(url.relativeURL("http:a/a.jpg", "http://b/a.jpg"), "//b/a.jpg")

	assert.strictEqual(url.relativeURL("http://tealui.com/dir/to/path.js", "http://tealui.com/root/foo.js"), "../../root/foo.js")

	assert.strictEqual(url.relativeURL("E:\\foo\\goo", "e:/foo/hoo?a=1"), "e:/foo/hoo?a=1")
	assert.strictEqual(url.relativeURL("E:/foo/goo.html", "e:/foo/hoo.jpg"), "e:/foo/hoo.jpg")
	assert.strictEqual(url.relativeURL("E:/foo/goo.html", "e:/foo/hoo.jpg?a=1"), "e:/foo/hoo.jpg?a=1")
	assert.strictEqual(url.relativeURL("E:/foo/goo.html", "e:/hoo.jpg?a=1"), "e:/hoo.jpg?a=1")
	assert.strictEqual(url.relativeURL("E:/foo/goo.html", "e:/foo/goo/hoo.jpg?a=1#hash"), "e:/foo/goo/hoo.jpg?a=1#hash")
}

export function normalizeURLTest() {
	assert.strictEqual(url.normalizeURL("/foo/../hoo/"), "/hoo/")

	assert.strictEqual(url.normalizeURL(""), "")
	assert.strictEqual(url.normalizeURL("foo"), "foo")
	assert.strictEqual(url.normalizeURL("foo/goo"), "foo/goo")
	assert.strictEqual(url.normalizeURL("foo/goo/hoo"), "foo/goo/hoo")
	assert.strictEqual(url.normalizeURL("//foo/goo/hoo"), "//foo/goo/hoo")
	assert.strictEqual(url.normalizeURL("//foo/./hoo"), "//foo/hoo")
	assert.strictEqual(url.normalizeURL("//foo/../hoo/hoo"), "//foo/hoo/hoo")
	assert.strictEqual(url.normalizeURL("//foo/../hoo/"), "//foo/hoo/")
	assert.strictEqual(url.normalizeURL("/foo/../hoo/hoo"), "/hoo/hoo")
	assert.strictEqual(url.normalizeURL("javascript:alert(0),alert(1)"), "javascript:alert(0),alert(1)")
	assert.strictEqual(url.normalizeURL("my-protocol:alert(0),alert(1)"), "my-protocol:alert(0),alert(1)")

	assert.strictEqual(url.normalizeURL("/.."), "/")
	assert.strictEqual(url.normalizeURL("/..//"), "/")
	assert.strictEqual(url.normalizeURL("/../../../.."), "/")
	assert.strictEqual(url.normalizeURL("/../../../../foo/goo/hoo"), "/foo/goo/hoo")
	assert.strictEqual(url.normalizeURL("/foo/goo/hoo/../../../d/../../e/e"), "/e/e")

	assert.strictEqual(url.normalizeURL(".."), "..")
	assert.strictEqual(url.normalizeURL("..//"), "../")
	assert.strictEqual(url.normalizeURL("../../foo/"), "../../foo/")
	assert.strictEqual(url.normalizeURL("foo/.."), ".")
	assert.strictEqual(url.normalizeURL("foo/../../.."), "../..")

	assert.strictEqual(url.normalizeURL("/."), "/")
	assert.strictEqual(url.normalizeURL("/./"), "/")
	assert.strictEqual(url.normalizeURL("/./././."), "/")
	assert.strictEqual(url.normalizeURL("/././././foo/goo/hoo"), "/foo/goo/hoo")
	assert.strictEqual(url.normalizeURL("/foo/goo/hoo/./././d/././e"), "/foo/goo/hoo/d/e")

	assert.strictEqual(url.normalizeURL(""), "")
	assert.strictEqual(url.normalizeURL("."), ".")
	assert.strictEqual(url.normalizeURL("./"), "./")
	assert.strictEqual(url.normalizeURL("././foo"), "foo")
	assert.strictEqual(url.normalizeURL("foo/./"), "foo/")
	assert.strictEqual(url.normalizeURL("foo/././."), "foo")

	assert.strictEqual(url.normalizeURL("/foo/goo//hoo////d/////"), "/foo/goo/hoo/d/")
	assert.strictEqual(url.normalizeURL("///foo/goo//hoo////d/////"), "///foo/goo/hoo/d/")
	assert.strictEqual(url.normalizeURL("foo/goo//hoo////d"), "foo/goo/hoo/d")

	assert.strictEqual(url.normalizeURL(".///.././../foo/goo//./.."), "../../foo")

	assert.strictEqual(url.normalizeURL("my-protocol://www.tealui.com"), "my-protocol://www.tealui.com")
	assert.strictEqual(url.normalizeURL("my-protocol:/www.tealui.com"), "my-protocol:/www.tealui.com")
	assert.strictEqual(url.normalizeURL("http://www.tealui.com"), "http://www.tealui.com/")
	assert.strictEqual(url.normalizeURL("http://www.tealui.com/path?foo=1"), "http://www.tealui.com/path?foo=1")
	assert.strictEqual(url.normalizeURL("http://www.tealui.com/"), "http://www.tealui.com/")
	assert.strictEqual(url.normalizeURL("http://www.tealui.com/./..//foo/goo/hoo/.././d//"), "http://www.tealui.com/foo/goo/d/")
	assert.strictEqual(url.normalizeURL("data:text/javascript;base64,foo,bar"), "data:text/javascript;base64,foo,bar")
}

export function isAbsoluteURLTest() {
	assert.strictEqual(url.isAbsoluteURL("/"), true)

	assert.strictEqual(url.isAbsoluteURL("//"), true)
	assert.strictEqual(url.isAbsoluteURL("//server"), true)
	assert.strictEqual(url.isAbsoluteURL("//server/file"), true)
	assert.strictEqual(url.isAbsoluteURL("\\\\server\\file"), false)
	assert.strictEqual(url.isAbsoluteURL("\\\\server"), false)
	assert.strictEqual(url.isAbsoluteURL("\\\\"), false)
	assert.strictEqual(url.isAbsoluteURL("foo"), false)
	assert.strictEqual(url.isAbsoluteURL("foo:"), true)
	assert.strictEqual(url.isAbsoluteURL("foo:\\"), true)
	assert.strictEqual(url.isAbsoluteURL("foo:/"), true)
	assert.strictEqual(url.isAbsoluteURL("foo://"), true)
	assert.strictEqual(url.isAbsoluteURL("foo:/Users/"), true)
	assert.strictEqual(url.isAbsoluteURL("foo:\\Users\\"), true)
	assert.strictEqual(url.isAbsoluteURL("directory/directory"), false)
	assert.strictEqual(url.isAbsoluteURL("directory\\directory"), false)
	assert.strictEqual(url.isAbsoluteURL("/home/foo"), true)
	assert.strictEqual(url.isAbsoluteURL("/home/foo/.."), true)
	assert.strictEqual(url.isAbsoluteURL("bar/"), false)
	assert.strictEqual(url.isAbsoluteURL("./baz"), false)
	assert.strictEqual(url.isAbsoluteURL("http://tealui.com/"), true)
	assert.strictEqual(url.isAbsoluteURL("mailto:noreply@tealui.com"), true)
}

export function replaceURLTest() {
	assert.strictEqual(url.replaceURL("url: http://tealui.com/ is", ""), "url:  is")
	assert.strictEqual(url.replaceURL("url: https://中国.公司 is", ""), "url:  is")
	assert.strictEqual(url.replaceURL("url: www.google.com is", ""), "url:  is")
}