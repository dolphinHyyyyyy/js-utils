import * as assert from "assert"
import * as number from "./number"

export function isNumberTest() {
	assert.strictEqual(number.isNumber(7), true)
	assert.strictEqual(number.isNumber(1e5), true)
	assert.strictEqual(number.isNumber(0.0), true)
	assert.strictEqual(number.isNumber(-0.0), true)
	assert.strictEqual(number.isNumber(Infinity), true)
}

export function isIntegerTest() {
	assert.strictEqual(number.isInteger(7), true)
	assert.strictEqual(number.isInteger(7.6), false)
}

export function getDecimalLengthTest() {
	assert.strictEqual(number.getDecimalLength(0), 0)
	assert.strictEqual(number.getDecimalLength(0.1), 1)
	assert.strictEqual(number.getDecimalLength(0.01), 2)
	assert.strictEqual(number.getDecimalLength(0.0000000000000), 0)
}

export function getIntegerLengthTest() {
	assert.strictEqual(number.getIntegerLength(0), 1)
	assert.strictEqual(number.getIntegerLength(10), 2)
	assert.strictEqual(number.getIntegerLength(10.1), 2)
	assert.strictEqual(number.getIntegerLength(0o333), 3)
	assert.strictEqual(number.getIntegerLength(1212), 4)
}

export function randomTest() {
	assert.strictEqual(number.random(2, 3), 2)
}

export function formatTest() {
	assert.strictEqual(number.formatNumber(0, "#"), "0")
	assert.strictEqual(number.formatNumber(0, "##"), "0")
	assert.strictEqual(number.formatNumber(0, "###"), "0")
	assert.strictEqual(number.formatNumber(0, "#,###"), "0")

	assert.strictEqual(number.formatNumber(0, "0"), "0")
	assert.strictEqual(number.formatNumber(0, "00"), "00")
	assert.strictEqual(number.formatNumber(0, "000"), "000")
	assert.strictEqual(number.formatNumber(0, "0,000"), "0,000")

	assert.strictEqual(number.formatNumber(1, "#"), "1")
	assert.strictEqual(number.formatNumber(1, "##"), "1")
	assert.strictEqual(number.formatNumber(1, "###"), "1")
	assert.strictEqual(number.formatNumber(1, "#,###"), "1")

	assert.strictEqual(number.formatNumber(1, "0"), "1")
	assert.strictEqual(number.formatNumber(1, "00"), "01")
	assert.strictEqual(number.formatNumber(1, "000"), "001")
	assert.strictEqual(number.formatNumber(1, "0,000"), "0,001")

	assert.strictEqual(number.formatNumber(-1, "#"), "-1")
	assert.strictEqual(number.formatNumber(-1, "##"), "-1")
	assert.strictEqual(number.formatNumber(-1, "###"), "-1")
	assert.strictEqual(number.formatNumber(-1, "#,###"), "-1")

	assert.strictEqual(number.formatNumber(-1, "0"), "-1")
	assert.strictEqual(number.formatNumber(-1, "00"), "-01")
	assert.strictEqual(number.formatNumber(-1, "000"), "-001")
	assert.strictEqual(number.formatNumber(-1, "0,000"), "-0,001")

	assert.strictEqual(number.formatNumber(1, "+#"), "+1")
	assert.strictEqual(number.formatNumber(1, "+##"), "+1")
	assert.strictEqual(number.formatNumber(1, "+###"), "+1")
	assert.strictEqual(number.formatNumber(1, "+#,###"), "+1")

	assert.strictEqual(number.formatNumber(-1, "+#"), "-1")
	assert.strictEqual(number.formatNumber(-1, "+##"), "-1")
	assert.strictEqual(number.formatNumber(-1, "+###"), "-1")
	assert.strictEqual(number.formatNumber(-1, "+#,###"), "-1")

	assert.strictEqual(number.formatNumber(1, "###,###"), "1")
	assert.strictEqual(number.formatNumber(10, "###,###"), "10")
	assert.strictEqual(number.formatNumber(100, "###,###"), "100")
	assert.strictEqual(number.formatNumber(1000, "###,###"), "1,000")
	assert.strictEqual(number.formatNumber(10000, "###,###"), "10,000")

	assert.strictEqual(number.formatNumber(1, "0##,###"), "1")
	assert.strictEqual(number.formatNumber(10, "0##,###"), "10")
	assert.strictEqual(number.formatNumber(100, "0##,###"), "100")
	assert.strictEqual(number.formatNumber(1000, "0##,###"), "1,000")
	assert.strictEqual(number.formatNumber(10000, "0##,###"), "010,000")

	assert.strictEqual(number.formatNumber(1.1, "#"), "1.1")
	assert.strictEqual(number.formatNumber(1.1, "#."), "1")
	assert.strictEqual(number.formatNumber(1.1, "#.#"), "1.1")
	assert.strictEqual(number.formatNumber(1.1, "#.##"), "1.1")

	assert.strictEqual(number.formatNumber(1.1, "0"), "1.1")
	assert.strictEqual(number.formatNumber(1.1, "0."), "1")
	assert.strictEqual(number.formatNumber(1.1, "0.0"), "1.1")
	assert.strictEqual(number.formatNumber(1.1, "0.00"), "1.10")

	assert.strictEqual(number.formatNumber(1.9, "#"), "1.9")
	assert.strictEqual(number.formatNumber(1.9, "#."), "2")
	assert.strictEqual(number.formatNumber(1.9, "#.#"), "1.9")
	assert.strictEqual(number.formatNumber(1.9, "#.##"), "1.9")

	assert.strictEqual(number.formatNumber(1.9, "0"), "1.9")
	assert.strictEqual(number.formatNumber(1.9, "0."), "2")
	assert.strictEqual(number.formatNumber(1.9, "0.0"), "1.9")
	assert.strictEqual(number.formatNumber(1.9, "0.00"), "1.90")

	assert.strictEqual(number.formatNumber(10100, "xxx"), "xxx")
	assert.strictEqual(number.formatNumber(101, "xxxxx"), "xxxxx")
	assert.strictEqual(number.formatNumber(-101, "##xxxx"), "-101xxxx")
	assert.strictEqual(number.formatNumber(101, "+##"), "+101")
	assert.strictEqual(number.formatNumber(-101, "+##"), "-101")
	assert.strictEqual(number.formatNumber(101, "-####"), "-101")
	assert.strictEqual(number.formatNumber(101, "-##xxxx"), "-101xxxx")
	assert.strictEqual(number.formatNumber(101, "##.xxxx"), "101xxxx")
	assert.strictEqual(number.formatNumber(101, ".##"), "")
	assert.strictEqual(number.formatNumber(101.01, ".##"), ".01")
	assert.strictEqual(number.formatNumber(101.008, ".##"), ".01")
	assert.strictEqual(number.formatNumber(-0.101, "##.xxxx"), "-0xxxx")
	assert.strictEqual(number.formatNumber(0.101, "-##.xxxx"), "-0xxxx")
	assert.strictEqual(number.formatNumber(0.10109, "-##.xxxx"), "-0xxxx")
	assert.strictEqual(number.formatNumber(0.10104, "-##.####"), "-0.101")
	assert.strictEqual(number.formatNumber(0.10104, "-##.###"), "-0.101")
	assert.strictEqual(number.formatNumber(0.101, "-##xxxx.xxxx"), "-0.101xxxx.xxxx")
	assert.strictEqual(number.formatNumber(1.212313131, "x###.####"), "x1.2123")
	assert.strictEqual(number.formatNumber(1.235, "#.##"), "1.24")
	assert.strictEqual(number.formatNumber(1.21, "+#.##"), "+1.21")
	assert.strictEqual(number.formatNumber(1.2, "-#.##"), "-1.2")
	assert.strictEqual(number.formatNumber(1235, "###,###"), "1,235")
	assert.strictEqual(number.formatNumber(-1235, "###,###"), "-1,235")
	assert.strictEqual(number.formatNumber(123, "###,###"), "123")
	assert.strictEqual(number.formatNumber(-123, "###,###"), "-123")
	assert.strictEqual(number.formatNumber(-123, "00#,###"), "-123")
}