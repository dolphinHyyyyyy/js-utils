import * as assert from "assert"
import * as string from "./string"

export function isStringTest() {
	assert.strictEqual(string.isString(""), true)
	assert.strictEqual(string.isString(new String()), true)
}

export function countTest() {
	assert.strictEqual(string.count("xyz", "x"), 1)
	assert.strictEqual(string.count("xyz", "xy"), 1)
	assert.strictEqual(string.count("xyz", ""), 3)
}

export function byteLengthTest() {
	assert.strictEqual(string.byteLength("a中文"), 5)
}

export function containsWordTest() {
	assert.strictEqual(string.containsWord("abc ab", "ab"), true)
	assert.strictEqual(string.containsWord("abc ab", ""), false)
}

export function wordsTest() {
	assert.deepStrictEqual(string.words("fontSize"), ["fontSize"])
}

export function isLowerCaseTest() {
	assert.deepStrictEqual(string.isLowerCase("qwert"), true)
}

export function isUpperCaseTest() {
	assert.deepStrictEqual(string.isUpperCase("qwert"), false)
}

export function capitalizeTest() {
	assert.strictEqual(string.capitalize("qwert"), "Qwert")
}

export function uncapitalizeTest() {
	assert.strictEqual(string.uncapitalize("Qwert"), "qwert")
}

export function capitalizeWordsTest() {
	assert.strictEqual(string.capitalizeWords("hi go"), "Hi Go")
}

export function toCamelCaseTest() {
	assert.strictEqual(string.toCamelCase("font-size"), "fontSize")
	assert.strictEqual(string.toCamelCase("foo-bar"), "fooBar")
	assert.strictEqual(string.toCamelCase("foo-bar-baz"), "fooBarBaz")
	assert.strictEqual(string.toCamelCase("girl-u-want"), "girlUWant")
	assert.strictEqual(string.toCamelCase("the-4th-dimension"), "the4thDimension")
	assert.strictEqual(string.toCamelCase("-o-tannenbaum"), "OTannenbaum")
	assert.strictEqual(string.toCamelCase("-moz-illa"), "MozIlla")
}

export function toKebabCaseTest() {
	assert.strictEqual(string.toKebabCase("fontSize"), "font-size")
	assert.strictEqual(string.toKebabCase("fooBar"), "foo-bar")
	assert.strictEqual(string.toKebabCase("fooBarBaz"), "foo-bar-baz")
	assert.strictEqual(string.toKebabCase("girlUWant"), "girl-u-want")
	assert.strictEqual(string.toKebabCase("OTannenbaum"), "-o-tannenbaum")
	assert.strictEqual(string.toKebabCase("MozIlla"), "-moz-illa")
}

export function splitTest() {
	assert.deepStrictEqual(string.split("abc abc abc", " "), ["abc", "abc", "abc"])
	assert.deepStrictEqual(string.split("abc abc abc", " ", 2), ["abc", "abc abc"])
	assert.deepStrictEqual(string.split("abc abc abc", /\s/), ["abc", "abc", "abc"])
	assert.deepStrictEqual(string.split("abc abc abc", /\s/, 2), ["abc", "abc abc"])
}

export function splitLinesTest() {
	assert.deepStrictEqual(string.splitLines("x\ny"), ["x", "y"])
}

export function splitByLengthTest() {
	assert.deepStrictEqual(string.splitByLength("abc abc abc", 4), ["abc ", "abc ", "abc"])
}

export function leftTest() {
	assert.strictEqual(string.start("abcde", 3), "abc")
}

export function rightTest() {
	assert.strictEqual(string.end("abcde", 3), "cde")
}

export function truncateTest() {
	assert.strictEqual(string.truncate("1234567", 6), "123...")
	assert.strictEqual(string.truncate("1234567", 9), "1234567")
	assert.strictEqual(string.truncate("nihao", 1, "！"), "！")
}

export function truncateByWordTest() {
	assert.strictEqual(string.truncateByWord("abc def", 6), "abc...")
	assert.strictEqual(string.truncateByWord("hi hi hi", 6), "hi...")
}

export function compactWhitespaceTest() {
	assert.strictEqual(string.compactWhitespace("x \n y"), "x y")
}

export function unindentTest() {
	assert.strictEqual(string.unindent("      a\n      s     sss "), "a\ns     sss ")
	assert.strictEqual(string.unindent("  a"), "a")
}

export function removeNonASCIITest() {
	assert.strictEqual(string.removeNonASCII("xyz中文"), "xyz")
}

export function maskTest() {
	assert.strictEqual(string.mask("1234567890", 1, 2), "1*******90")
}

export function reverseTest() {
	assert.strictEqual(string.reverse("foobar"), "raboof")
}

export function formatTest() {
	assert.strictEqual(string.formatString("{{}} {0}", 1), "{} 1", "格式化的字符串内有 { 和  }")
}

export function cleanTest() {
	assert.strictEqual(string.clean(" a b   "), "ab")
}

export function uniqueTest() {
	assert.strictEqual(string.unique("aabbdscc"), "abdsc")
}

export function randomStringTest() {
	assert.deepStrictEqual(string.getRandomString(8).length, 8)
	assert.deepStrictEqual(string.getRandomString(100).length, 100)
	assert.deepStrictEqual(string.getRandomString(0), "")
}