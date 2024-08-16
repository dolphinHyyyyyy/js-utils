import * as assert from "assert"
import * as traditionalChinese from "./traditionalChinese"

export function toSimpleChineseTest() {
	assert.strictEqual(traditionalChinese.toSimpleChinese("简體"), "简体")
}

export function toTraditionalChineseTest() {
	assert.strictEqual(traditionalChinese.toTraditionalChinese("简体"), "簡體")
}