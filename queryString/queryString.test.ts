import * as assert from "assert"
import * as queryString from "./queryString"

export function parseQueryStringTest() {
	assert.deepStrictEqual(queryString.parseQueryString(""), {})
	assert.deepStrictEqual(queryString.parseQueryString("foo=1"), { foo: "1" })
	assert.deepStrictEqual(queryString.parseQueryString("foo=1&"), { foo: "1", "": "" })
	assert.deepStrictEqual(queryString.parseQueryString("&"), { "": ["", ""] })
	assert.deepStrictEqual(queryString.parseQueryString("foo=1&goo=2&goo=3"), { foo: "1", goo: ["2", "3"] })
}

export function formatQueryStringTest() {
	assert.strictEqual(queryString.formatQueryString({ a: "2", c: "4" }), "a=2&c=4")
	assert.strictEqual(queryString.formatQueryString({ a: [2, 4] }), "a=2&a=4")
}

export function getQueryStringTest() {
	assert.strictEqual(queryString.getQueryString("foo=1", "foo"), "1")
	assert.strictEqual(queryString.getQueryString("foo=1", "goo"), undefined)
	assert.strictEqual(queryString.getQueryString("foo=1=1", "foo"), "1=1")
}

export function setQueryStringTest() {
	assert.strictEqual(queryString.setQueryString("", "foo", "1",), "foo=1")
	assert.strictEqual(queryString.setQueryString("foo=1", "foo", "2",), "foo=2")
	assert.strictEqual(queryString.setQueryString("foo=1", "goo", "2",), "foo=1&goo=2")
	assert.strictEqual(queryString.setQueryString("foo=1&goo=1", "goo", "2",), "foo=1&goo=2")
	assert.strictEqual(queryString.setQueryString("foo=1&hoo=3", "goo", "2",), "foo=1&hoo=3&goo=2")
	assert.strictEqual(queryString.setQueryString("", "foo", undefined), "")
	assert.strictEqual(queryString.setQueryString("foo=1", "foo", undefined), "")
	assert.strictEqual(queryString.setQueryString("foo=1&goo=2", "foo", undefined), "goo=2")
	assert.strictEqual(queryString.setQueryString("goo=2&foo=1", "foo", undefined), "goo=2")
	assert.strictEqual(queryString.setQueryString("goo=2&foo=1&hoo=3", "foo", undefined), "goo=2&hoo=3")
}

export function addQueryStringTest() {
	assert.strictEqual(queryString.addQueryString("page.html", "foo=1"), "page.html?foo=1")
}