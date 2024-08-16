import * as assert from "assert"
import * as path from "./path"

export function relativeTest() {
	assert.strictEqual(path.relativePath("", ""), "")
	assert.strictEqual(path.relativePath("", "."), "")
	assert.strictEqual(path.relativePath("", ".."), "..")
	assert.strictEqual(path.relativePath("", ".foo"), ".foo")
	assert.strictEqual(path.relativePath("", "foo"), "foo")
	assert.strictEqual(path.relativePath("", "../foo/goo.txt"), "../foo/goo.txt")

	assert.strictEqual(path.relativePath(".", ""), "")
	assert.strictEqual(path.relativePath(".", "."), "")
	assert.strictEqual(path.relativePath(".", ".."), "..")
	assert.strictEqual(path.relativePath(".", ".foo"), ".foo")
	assert.strictEqual(path.relativePath(".", "foo"), "foo")
	assert.strictEqual(path.relativePath(".", "../foo/goo.txt"), "../foo/goo.txt")

	assert.strictEqual(path.relativePath(".", ""), "")
	assert.strictEqual(path.relativePath(".", "./"), "./")
	assert.strictEqual(path.relativePath(".", "..//"), "../")
	assert.strictEqual(path.relativePath(".", ".foo/"), ".foo/")
	assert.strictEqual(path.relativePath(".", "foo/"), "foo/")
	assert.strictEqual(path.relativePath(".", "../foo/goo.txt/"), "../foo/goo.txt/")

	assert.strictEqual(path.relativePath("./", ""), "")
	assert.strictEqual(path.relativePath("./", "./"), "./")
	assert.strictEqual(path.relativePath("./", "..//"), "../")
	assert.strictEqual(path.relativePath("./", ".foo/"), ".foo/")
	assert.strictEqual(path.relativePath("./", "foo/"), "foo/")
	assert.strictEqual(path.relativePath("./", "../foo/goo.txt/"), "../foo/goo.txt/")

	assert.strictEqual(path.relativePath("foo", "foo"), "")
	assert.strictEqual(path.relativePath("foo", "foo2"), "../foo2")
	assert.strictEqual(path.relativePath("foo", "../foo/goo"), "../../foo/goo")
	assert.strictEqual(path.relativePath("foo/goo", "foo/goo"), "")
	assert.strictEqual(path.relativePath("foo/goo", "foo/goo/hoo/koo.txt"), "hoo/koo.txt")

	assert.strictEqual(path.relativePath("foo/", "foo"), "")
	assert.strictEqual(path.relativePath("foo/", "foo2"), "../foo2")
	assert.strictEqual(path.relativePath("foo/", "../foo/goo"), "../../foo/goo")
	assert.strictEqual(path.relativePath("foo/goo/", "foo/goo"), "")
	assert.strictEqual(path.relativePath("foo/goo/", "foo/goo/hoo/koo.txt"), "hoo/koo.txt")

	assert.strictEqual(path.relativePath("foo/", "foo/"), "./")
	assert.strictEqual(path.relativePath("foo/", "foo2/"), "../foo2/")
	assert.strictEqual(path.relativePath("foo/", "../foo/goo/"), "../../foo/goo/")
	assert.strictEqual(path.relativePath("foo/goo/", "foo/goo/"), "./")
	assert.strictEqual(path.relativePath("foo/goo/", "foo/goo/hoo/koo.txt/"), "hoo/koo.txt/")
}

export function normalizeTest() {
	assert.strictEqual(path.normalizePath(""), "")
	assert.strictEqual(path.normalizePath("."), "")
	assert.strictEqual(path.normalizePath("./"), "./")
	assert.strictEqual(path.normalizePath(".foo"), ".foo")
	assert.strictEqual(path.normalizePath(".."), "..")
	assert.strictEqual(path.normalizePath("..//"), "../")
	assert.strictEqual(path.normalizePath("foo.js"), "foo.js")
	assert.strictEqual(path.normalizePath("./foo.js"), "foo.js")
	assert.strictEqual(path.normalizePath("/foo.js"), "/foo.js")
	assert.strictEqual(path.normalizePath("foo/../goo.js"), "goo.js")
	assert.strictEqual(path.normalizePath("/foo/../goo.js"), "/goo.js")
	assert.strictEqual(path.normalizePath("**/*.js"), "**/*.js")
	assert.strictEqual(path.normalizePath("./**/*.js"), "**/*.js")
	assert.strictEqual(path.normalizePath("./fixtures///d/../b/c.js"), "fixtures/b/c.js")
	assert.strictEqual(path.normalizePath("/foo/../../../bar/bar"), "../../bar/bar")
	assert.strictEqual(path.normalizePath("foo//goo//../koo/koo"), "foo/koo/koo")
	assert.strictEqual(path.normalizePath("foo//goo//./koo"), "foo/goo/koo")
	assert.strictEqual(path.normalizePath("foo//goo//."), "foo/goo")
	assert.strictEqual(path.normalizePath("foo//goo//.//"), "foo/goo/")
	assert.strictEqual(path.normalizePath("/a/b/c/../../../x/y/z"), "/x/y/z")
	assert.strictEqual(path.normalizePath("a/b/c/../../../x/y/z"), "x/y/z")
}

export function getDirTest() {
	assert.strictEqual(path.getDir("."), "")
	assert.strictEqual(path.getDir("foo.txt"), "")
	assert.strictEqual(path.getDir(".foo"), "")
	assert.strictEqual(path.getDir(".foo/"), "")
	assert.strictEqual(path.getDir("foo/goo.txt"), "foo")
	assert.strictEqual(path.getDir("../goo.txt"), "..")
	assert.strictEqual(path.getDir("/user/root/foo.txt"), "/user/root")
	assert.strictEqual(path.getDir("/user/root/foo"), "/user/root")
	assert.strictEqual(path.getDir("/user/root/foo/"), "/user/root")
}

export function getNameTest() {
	assert.strictEqual(path.getName("/user/root/foo.txt"), "foo.txt")
	assert.strictEqual(path.getName("/user/root/foo.min.js"), "foo.min.js")
	assert.strictEqual(path.getName("/user/root/foo"), "foo")
	assert.strictEqual(path.getName("/user/root/foo/"), "foo")
	assert.strictEqual(path.getName(""), "")
	assert.strictEqual(path.getName("."), ".")
	assert.strictEqual(path.getName(".."), "..")
	assert.strictEqual(path.getName(".foo"), ".foo")
}

export function getExtTest() {
	assert.strictEqual(path.getExt("/user/root/foo"), "")
	assert.strictEqual(path.getExt("/user/root/foo.txt"), ".txt")
	assert.strictEqual(path.getExt("/user/root/foo.min.js"), ".js")
	assert.strictEqual(path.getExt("/user/root/.foo"), "")
	assert.strictEqual(path.getExt("/user/root/.foo/"), "")
}