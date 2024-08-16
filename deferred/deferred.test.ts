import * as assert from "assert"
import * as deferred from "./deferred"

export async function deferredTest() {
	const q = new deferred.Deferred()
	await q

	let value = 1
	q.reject()
	q.reject()
	q.resolve()
	setTimeout(() => {
		q.resolve()
		assert.strictEqual(++value, 3)
	}, 1)
	assert.strictEqual(++value, 2)

	await q
	assert.strictEqual(++value, 4)
}

export async function errorTest() {
	const q = new deferred.Deferred()
	let value = 1
	q.reject()
	q.then(() => {
		throw "error"
	})
	q.then(() => {
		value = 3
	})
	setTimeout(() => {
		value = 2
		q.resolve()
	}, 10)
	try {
		await q
		value = 4
		assert.fail()
	} catch (e) {
		assert.strictEqual(e.toString(), "error")
	}
	q.reject()
	q.resolve()
	assert.strictEqual(value, 2)
}

export async function errorTest2() {
	const q = new deferred.Deferred()
	let value = 1
	q.reject()
	q.then(() => {
		throw "error"
	})
	try {
		value = 2
		q.resolve()
		await q
		value = 4
	} catch (e) {
		assert.strictEqual(e.toString(), "error")
	}
	q.then(() => {
		value = 3
	})
	q.reject()
	q.resolve()
	assert.strictEqual(value, 2)
}