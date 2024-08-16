import * as assert from "assert"
import { Queue } from "./queue"

export function enqueueTest() {
	const q = new Queue<number>()
	assert.strictEqual(q.size, 0)
	q.enqueue(1)
	assert.strictEqual(q.size, 1)
	q.enqueue(2)
	assert.strictEqual(q.size, 2)
}

export function dequeueTest() {
	const q = new Queue<number>()
	assert.strictEqual(q.dequeue(), undefined)
	q.enqueue(1)
	q.enqueue(2)
	q.enqueue(3)
	assert.strictEqual(q.dequeue(), 1)
	assert.strictEqual(q.dequeue(), 2)
	assert.strictEqual(q.dequeue(), 3)
	assert.strictEqual(q.dequeue(), undefined)
}

export function topTest() {
	const q = new Queue<number>()
	assert.strictEqual(q.top, undefined)
	q.enqueue(1)
	assert.strictEqual(q.top, 1)
	q.enqueue(2)
	assert.strictEqual(q.top, 1)
	q.dequeue()
	assert.strictEqual(q.top, 2)
}

export function emptyTest() {
	const q = new Queue<number>()
	assert.strictEqual(q.empty, true)
	q.enqueue(1)
	assert.strictEqual(q.empty, false)
	q.enqueue(2)
	assert.strictEqual(q.empty, false)
	q.dequeue()
	assert.strictEqual(q.empty, false)
	q.dequeue()
	assert.strictEqual(q.empty, true)
	q.dequeue()
	assert.strictEqual(q.empty, true)
}

export function toArrayTest() {
	assert.deepStrictEqual(new Queue<number>().toArray(), [])
	const q = new Queue<number>()
	q.enqueue(1)
	q.enqueue(2)
	q.enqueue(3)
	assert.deepStrictEqual(q.toArray(), [1, 2, 3])
	assert.deepStrictEqual(q.toString(), [1, 2, 3].toString())
}