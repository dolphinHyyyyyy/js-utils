import * as assert from "assert"
import * as currency from "./currency"

export function addTest() {
	assert.strictEqual(currency.add(86.24, 0.1), 86.34)
}

export function subtractTest() {
	assert.strictEqual(currency.subtract(7, 0.8), 6.2)
}

export function multiplyTest() {
	assert.strictEqual(currency.multiply(7, 0.8), 5.6)
}

export function divideTest() {
	assert.strictEqual(currency.divide(7, 0.8), 8.75)
}

export function roundTest() {
	assert.strictEqual(currency.round(86.245), 86.25)
}

export function formatCurrencyTest() {
	assert.strictEqual(currency.formatCurrency(86234.245), "86,234.25")
}

export function formatCurrencyToTranditionalChineseTest() {
	assert.strictEqual(currency.formatCurrencyToTranditionalChinese(10000000), "壹仟万元")
}