import * as assert from "assert"
import { SortedArray } from "./sortedArray"

export function sortedArrayTest() {
	const array = new SortedArray()
	array.add(1)
	array.add(2)
	array.add(-1)
	assert.strictEqual(array.binarySearch(1), 1)
	array.remove(1)
	assert.ok(array.binarySearch(1) < 0)
	assert.ok(array.binarySearch(2) >= 0)
	array.addIfNotExists(1)
	array.addIfNotExists(3)
	assert.ok(array.binarySearch(1) >= 0)
	assert.ok(array.binarySearch(3) >= 0)
}