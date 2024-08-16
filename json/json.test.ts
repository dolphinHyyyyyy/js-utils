import * as assert from "assert"
import * as json from "./json"

export function parseJSONTest() {
	assert.deepStrictEqual(json.parseJSON(`{a: 1}`), { a: 1 })
	assert.deepStrictEqual(json.parseJSON(`{a: 1 // \n}`), { a: 1 })
}

export function formatJSONTest() {
	assert.deepStrictEqual(JSON.parse(json.formatJSON({ a: 1 })), { a: 1 })
}

export function normalizeJSONTest() {
	assert.deepStrictEqual(JSON.parse(json.normalizeJSON(`{"a": 1 // \n}`)), { a: 1 })
}