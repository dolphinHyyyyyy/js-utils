import * as assert from "assert"
import * as check from "./checking"

export function isLetterTest() {
	assert.strictEqual(check.isLetter("abc"), true)
	assert.strictEqual(check.isLetter("ab0"), false)
}

export function isDigitTest() {
	assert.strictEqual(check.isDigit("1"), true)
	assert.strictEqual(check.isDigit("a"), false)
}

export function isLetterOrDigitTest() {
	assert.strictEqual(check.isLetterOrDigit("x09"), true)
	assert.strictEqual(check.isLetterOrDigit("1.2f"), false)
}

export function isIntegerTest() {
	assert.strictEqual(check.isInteger("-45"), true)
	assert.strictEqual(check.isInteger("-45.0"), false)
}

export function isNumberTest() {
	assert.strictEqual(check.isNumber("-45.35"), true)
	assert.strictEqual(check.isNumber("0x00"), false)
}

export function isDateTest() {
	assert.strictEqual(check.isDate("2014/1/1"), true)
	assert.strictEqual(check.isDate("hello"), false)
	assert.strictEqual(check.isDate("2014年1月1日"), false)
}

export function isTimeTest() {
	assert.strictEqual(check.isTime("10:00:00"), true)
	assert.strictEqual(check.isTime(""), false)
}

export function isEmailTest() {
	assert.strictEqual(check.isEmail("bug@tealui.com"), true)
	assert.strictEqual(check.isEmail("bug@@tealui.com"), false)
}

export function isIpTest() {
	assert.strictEqual(check.isIPv4("127.0.0.1"), true)
}

export function isUrlTest() {
	assert.strictEqual(check.isURL("http://tealui.com/"), true)
}

export function isIndentifierTest() {
	assert.strictEqual(check.isIdentifier("x09"), true)
}

export function isCurrencyTest() {
	assert.strictEqual(check.isCurrency("0"), false)
	assert.strictEqual(check.isCurrency("0.01"), true)
	assert.strictEqual(check.isCurrency("1"), true)
	assert.strictEqual(check.isCurrency("1.25"), true)
	assert.strictEqual(check.isCurrency("1.250"), false)
}

export function isPhoneTest() {
	assert.strictEqual(check.isPhone("+8613211111111"), true)
}

export function isTelephoneTest() {
	assert.strictEqual(check.isTelephone("010-86000000"), true)
}

export function isEnglishTest() {
	assert.strictEqual(check.isEnglish("Hello"), true)
}

export function isPostCodeTest() {
	assert.strictEqual(check.isChinesePostCode("310000"), true)
}

export function isChineseTest() {
	assert.strictEqual(check.isChinese("你好"), true)
}

export function isChineseIdTest() {
	assert.strictEqual(check.isChineseID("152500198909267865"), true)
}

export function checkPasswordTest() {
	assert.strictEqual(check.getComplexityOfPassword("123456"), -1)
}