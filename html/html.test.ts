import * as assert from "assert"
import * as html from "./html"

export function encodeHTMLTest() {
	assert.strictEqual(html.encodeHTML("<a>Hello</a>"), "&lt;a&gt;Hello&lt;/a&gt;")

	assert.strictEqual(html.encodeHTML("a & b & c"), "a &amp; b &amp; c")
	assert.strictEqual(html.encodeHTML(""), "")
	assert.strictEqual(html.encodeHTML("<>&'\""), "&lt;&gt;&amp;'\"")
}

export function decodeHTMLTest() {
	// @ts-ignore
	assert.strictEqual(html.decodeHTML("&lt;a&gt;Hello&lt;/a&gt;"), "<a>Hello</a>")

	// https://github.com/substack/node-ent/blob/master/test/codes.js
	assert.strictEqual(html.decodeHTML("a &#38; b &#38; c"), "a & b & c")
	assert.strictEqual(html.decodeHTML("&#8484;"), "\u2124")
	assert.strictEqual(html.decodeHTML("&#x2124;"), "\u2124")
	assert.strictEqual(html.decodeHTML("&#1337;"), String.fromCharCode(1337))
	assert.strictEqual(html.decodeHTML("&#119558;"), "𝌆")
	assert.strictEqual(html.decodeHTML("&#38;amp;"), "&amp;")
	assert.strictEqual(html.decodeHTML("&lt;&gt;\'\"&amp;"), "<>\'\"&")

	assert.strictEqual(html.decodeHTML("&amp;"), "&")
	assert.strictEqual(html.decodeHTML("&lt;"), "<")
	assert.strictEqual(html.decodeHTML("&gt;"), ">")
	assert.strictEqual(html.decodeHTML("&quot;"), "\"")
}

export function quoteHTMLAttributeTest() {
	assert.strictEqual(html.quoteHTMLAttribute("foo"), "foo")
	assert.strictEqual(html.quoteHTMLAttribute("foo'"), `"foo'"`)
	assert.strictEqual(html.quoteHTMLAttribute("foo\""), `'foo"'`)
	assert.strictEqual(html.quoteHTMLAttribute("foo\"\'"), `"foo&quot;'"`)

	assert.strictEqual(html.quoteHTMLAttribute("a & b & c"), "\"a &amp; b &amp; c\"")
	assert.strictEqual(html.quoteHTMLAttribute("="), "\"=\"")
	assert.strictEqual(html.quoteHTMLAttribute("val"), "val")
	assert.strictEqual(html.quoteHTMLAttribute("'"), "\"'\"")
	assert.strictEqual(html.quoteHTMLAttribute("\""), "'\"'")
	assert.strictEqual(html.quoteHTMLAttribute("<>&'\""), "\"<>&amp;'&quot;\"")
	assert.strictEqual(html.quoteHTMLAttribute(""), "\"\"")

	assert.strictEqual(html.quoteHTMLAttribute("\"", "'"), "'\"'")
	assert.strictEqual(html.quoteHTMLAttribute("\'", "'"), "'&apos;'")

	assert.strictEqual(html.quoteHTMLAttribute(" =\r\n<>", ""), `&#x20;&#x3d;&#xd;&#xa;&lt;&gt;`)
}

export function unquoteHTMLAttributeTest() {
	assert.strictEqual(html.unquoteHTMLAttribute("\"a &amp; b &amp; c\""), "a & b & c")

	assert.strictEqual(html.unquoteHTMLAttribute("'='"), "=")
	assert.strictEqual(html.unquoteHTMLAttribute("\"\""), "")
}