import * as assert from "assert"
import * as regexp from "./regexp"

export function parseTest() {
	assert.strictEqual(regexp.parseRegExp("\\s").source, /\\s/.source)
}

export function joinTest() {
	assert.strictEqual(regexp.join(/a/, /b/).source, /a|b/.source)
}

export function globToRegExpTest() {
	assert.strictEqual(regexp.globToRegExp("a*b").test("ab"), true)
	assert.strictEqual(regexp.globToRegExp("a*b").test("acb"), true)
	assert.strictEqual(regexp.globToRegExp("a*b").test("acbd"), false)
}