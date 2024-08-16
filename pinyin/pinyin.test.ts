import * as assert from "assert"
import { matchPinYin } from "./match"
import { getPinYinsOfChar, toPinYin } from "./pinyin"

export function getPinYinOfCharTest() {
	assert.deepStrictEqual(getPinYinsOfChar("啊".charCodeAt(0)), ["a"])
}

export function toPinYinTest() {
	assert.strictEqual(toPinYin("重庆1990"), "chongqing1990")
}

export function matchPinYinYinest() {
	assert.deepStrictEqual(matchPinYin("一二", "y"), [0])
}