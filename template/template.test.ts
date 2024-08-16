import * as assert from "assert"
import { renderTemplate as brace } from "./brace"
import { renderTemplate as ejs } from "./ejs"

export function ejsTest() {
	assert.strictEqual(ejs("Hello <%= $.name %>!", { name: "World" }), "Hello World!")
}

export function braceTest() {
	assert.strictEqual(brace("Hello {{name}}!", { name: "World" }), "Hello World!")
	assert.strictEqual(brace("Hello {{$.name + '2'}}!", { name: "World" }), "Hello World2!")
}