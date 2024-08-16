import * as assert from "assert"
import * as func from "./function"

export function emptyTest() {
	assert.ok(func.empty)
}

export function selfTest() {
	assert.strictEqual(func.self(1), 1)
}

export function fromTest() {
	assert.strictEqual(func.from(false)(), false)
}

export function concatTest() {
	assert.ok(func.concat(function () { }, function () { }))
}

export function repeatTest() {
	let i = 0
	const fn = func.repeat(() => {
		i++
	}, 2)
	fn()
	fn()
	assert.strictEqual(i, 4)
}

export function onceTest() {
	let i = 0
	const fn = func.once(() => i++)
	fn()
	fn()
	assert.strictEqual(i, 1)
}

export function limitTest() {
	let i = 0
	const fn = func.limit(() => i++, 2)
	fn()
	fn()
	fn()
	assert.strictEqual(i, 2)
}

export function beforeTest() {
	let i = 0
	const fn = func.before(() => i++, 2)
	fn()
	assert.strictEqual(i, 1)
	fn()
	assert.strictEqual(i, 2)
	fn()
	assert.strictEqual(i, 2)
}

export function afterTest() {
	let i = 0
	const fn = func.after(() => i++, 2)
	fn()
	assert.strictEqual(i, 0)
	fn()
	assert.strictEqual(i, 0)
	fn()
	assert.strictEqual(i, 1)
	fn()
	assert.strictEqual(i, 2)
}

export function cacheTest() {
	let i = 0
	const fn = func.memorized(() => i++)
	fn()
	fn()
	assert.strictEqual(i, 1)
}

export function delayTest() {
	return new Promise<void>(resolve => {
		func.delay(() => {
			assert.ok(true)
			resolve()
		}, 1)()
	})
}

export function deferTest() {
	return new Promise<void>(resolve => {
		func.delay(() => {
			assert.ok(true)
			resolve()
		}, 1)()
	})
}

export async function throttleTest() {
	let value = 0
	await new Promise<void>(resolve => {
		const fn = func.throttle(() => {
			value++
			if (value === 2) {
				resolve()
			}
		}, 2)
		fn()
		assert.strictEqual(value, 1)
		fn()
		assert.strictEqual(value, 1)
	})
}

export function intervalTest() {
	return new Promise<void>(resolve => {
		func.interval(count => {
			assert.strictEqual(count, 0)
			resolve()
			return false
		}, 1, 1)
	})
}

export function getParametersTest() {
	assert.deepStrictEqual(func.getParameters(function (x: any) { return x; }), ["x"])
	assert.deepStrictEqual(func.getParameters(function (x: any, y = 2) { return x; }), ["x", "y"])
	assert.deepStrictEqual(func.getParameters((x: any) => x), ["x"])
}

export function getSourceTest() {
	assert.strictEqual(func.getSource(function (x: any) { return x; }).trim(), "return x;")
}
