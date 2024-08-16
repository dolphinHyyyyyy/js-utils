import * as assert from "assert"
import * as encryptString from "./encryptString"

export function encryptStringTest() {
	assert.strictEqual(encryptString.encryptString("abc", 123), "``e")
}

export function decryptStringTest() {
	assert.strictEqual(encryptString.decryptString("abc", 123), "cce")
}