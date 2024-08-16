import * as assert from "assert"
import * as array from "./array"

export function rangeTest() {
	assert.deepStrictEqual(array.range(0, 6), [0, 1, 2, 3, 4, 5])
	assert.deepStrictEqual(array.range(2, 11, 3), [2, 5, 8])
	assert.deepStrictEqual(array.range(6, 0), [1, 2, 3, 4, 5, 6])
	assert.deepStrictEqual(array.range(6, 0, -1), [6, 5, 4, 3, 2, 1])
	assert.deepStrictEqual(array.range(0, 6, -1), [5, 4, 3, 2, 1, 0])
}

export function pushIfNotExistsTest() {
	const foo = [1, 9, 0]
	array.pushIfNotExists(foo, 1)
	assert.deepStrictEqual(foo, [1, 9, 0])
	array.pushIfNotExists(foo, 2)
	assert.deepStrictEqual(foo, [1, 9, 0, 2])
}

export function insertTest() {
	const foo = ["I", "you"]
	array.insert(foo, 1, "love")
	assert.deepStrictEqual(foo, ["I", "love", "you"])
}

export function insertSortedTest() {
	const foo = [1, 3]
	array.insertSorted(foo, 0)
	assert.deepStrictEqual(foo, [0, 1, 3])
	array.insertSorted(foo, 1)
	assert.deepStrictEqual(foo, [0, 1, 1, 3])
	array.insertSorted(foo, 2)
	assert.deepStrictEqual(foo, [0, 1, 1, 2, 3])
	array.insertSorted(foo, 4)
	assert.deepStrictEqual(foo, [0, 1, 1, 2, 3, 4])
}

export function insertSortedIfNotExistsTest() {
	const foo = [1, 3]
	array.insertSortedIfNotExists(foo, 0)
	assert.deepStrictEqual(foo, [0, 1, 3])
	array.insertSortedIfNotExists(foo, 1)
	assert.deepStrictEqual(foo, [0, 1, 3])
	array.insertSortedIfNotExists(foo, 2)
	assert.deepStrictEqual(foo, [0, 1, 2, 3])
	array.insertSortedIfNotExists(foo, 4)
	assert.deepStrictEqual(foo, [0, 1, 2, 3, 4])
}

export function removeAtTest() {
	var arr = [1, 3]
	array.removeAt(arr, 0)
	assert.deepStrictEqual(arr, [3])
}

export function removeTest() {
	const foo = [1, 9, 9, 0]
	assert.strictEqual(array.remove(foo, 9), 1)
	assert.deepStrictEqual(foo, [1, 9, 0])
	assert.strictEqual(array.remove(foo, 9), 1)
	assert.deepStrictEqual(foo, [1, 0])
	assert.strictEqual(array.remove(foo, 9), -1)
	assert.deepStrictEqual(foo, [1, 0])
}

export function removeAllTest() {
	const foo = [1, 9, 9, 0]
	array.removeAll(foo, 9)
	assert.deepStrictEqual(foo, [1, 0])
}

export function removeSortedTest() {
	const foo = [1, 3]
	assert.strictEqual(array.removeSorted(foo, 0) >= 0, false)
	assert.deepStrictEqual(foo, [1, 3])
	assert.strictEqual(array.removeSorted(foo, 1) >= 0, true)
	assert.deepStrictEqual(foo, [3])
	assert.strictEqual(array.removeSorted(foo, 3) >= 0, true)
	assert.deepStrictEqual(foo, [])
}

export function cleanTest() {
	const foo = ["", false, 0, undefined, null, {}]
	array.clean(foo)
	assert.deepStrictEqual(foo, ["", false, 0, {}])
}

export function uniqueTest() {
	assert.deepStrictEqual(array.unique([1, 9, 9, 0]), [1, 9, 0])
}

export function filterNonUniqueTest() {
	assert.deepStrictEqual(array.filterNonUnique([1, 2, 2, 3, 4, 4, 5]), [1, 3, 5])
}

export function swapTest() {
	const item = ["a", "b"]
	array.swap(item, 0, 1)
	assert.deepStrictEqual(item, ["b", "a"])
}

export function updateTest() {
	assert.deepStrictEqual(array.update([1, 9, 9, 0], x => x), [1, 9, 9, 0])
}

export function selectTest() {
	assert.deepStrictEqual(array.select([
		{ "user": "fred", "age": 48 },
		{ "user": "barney", "age": 36 },
		{ "user": "fred", "age": 40 },
		{ "user": "barney", "age": 34 }
	], item => item.user), ["fred", "barney", "fred", "barney"])
	assert.deepStrictEqual(array.select([
		{ "user": "fred", "age": 48 },
		{ "user": "barney", "age": 36 },
		{ "user": "fred", "age": 40 },
		{ "user": "barney", "age": 34 }
	], "user"), ["fred", "barney", "fred", "barney"])
}

export function randomGetTest() {
	const item = array.randomGet([1, 2, 3])
	assert.ok(item === 1 || item === 2 || item === 3)
}

export function binarySearchTest() {
	assert.strictEqual(array.binarySearch([1, 2, 3, 4, 5], 3), 2)
}

export function findLastIndexTest() {
	assert.strictEqual(array.findLastIndex([1, 2, 3, 3, 5], item => item === 3), 3)
	assert.strictEqual(array.findLastIndex([1, 2, 3, 3, 5], item => item === 4), -1)
}

export function findLastTest() {
	assert.strictEqual(array.findLast([1, 2, 3, 3, 5], item => item === 3), 3)
	assert.strictEqual(array.findLast([1, 2, 3, 3, 5], item => item === 4), undefined)
}

export function isUniqueTest() {
	assert.strictEqual(array.isUnique([1, 9, 0]), true)
	assert.strictEqual(array.isUnique([1, 9, 9, 0]), false)
}

export function sortByTest() {
	const arr = [
		{ "user": "fred", "age": 48 },
		{ "user": "barney", "age": 36 },
		{ "user": "fred", "age": 40 },
		{ "user": "barney", "age": 34 }
	]

	array.sortBy(arr, item => item.user, item => item.age)
	assert.deepStrictEqual(arr, [
		{ "user": "barney", "age": 34 },
		{ "user": "barney", "age": 36 },
		{ "user": "fred", "age": 40 },
		{ "user": "fred", "age": 48 },
	])

	array.sortBy(arr, "user", "age")
	assert.deepStrictEqual(arr, [
		{ "user": "barney", "age": 34 },
		{ "user": "barney", "age": 36 },
		{ "user": "fred", "age": 40 },
		{ "user": "fred", "age": 48 },
	])

	array.sortBy(arr, "user", item => -item.age)
	assert.deepStrictEqual(arr, [
		{ "user": "barney", "age": 36 },
		{ "user": "barney", "age": 34 },
		{ "user": "fred", "age": 48 },
		{ "user": "fred", "age": 40 },
	])
}

export function sortByDescTest() {
	const arr = [
		{ "user": "fred", "age": 48 },
		{ "user": "barney", "age": 36 },
		{ "user": "fred", "age": 40 },
		{ "user": "barney", "age": 34 }
	]

	array.sortByDesc(arr, item => item.user, item => item.age)
	assert.deepStrictEqual(arr, [
		{ "user": "fred", "age": 48 },
		{ "user": "fred", "age": 40 },
		{ "user": "barney", "age": 36 },
		{ "user": "barney", "age": 34 },
	])

	array.sortByDesc(arr, "user", "age")
	assert.deepStrictEqual(arr, [
		{ "user": "fred", "age": 48 },
		{ "user": "fred", "age": 40 },
		{ "user": "barney", "age": 36 },
		{ "user": "barney", "age": 34 },
	])

	array.sortByDesc(arr, "user", item => -item.age)
	assert.deepStrictEqual(arr, [
		{ "user": "fred", "age": 40 },
		{ "user": "fred", "age": 48 },
		{ "user": "barney", "age": 34 },
		{ "user": "barney", "age": 36 },
	])
}

export function isSortedTest() {
	assert.deepStrictEqual(array.isSorted([1, 2, 3, 4, 5]), true)
	assert.deepStrictEqual(array.isSorted([]), true)
	assert.deepStrictEqual(array.isSorted([1]), true)
	assert.deepStrictEqual(array.isSorted([2, 1]), false)
	assert.deepStrictEqual(array.isSorted([2, 1], (x, y) => y - x), true)
}

export function permuteTest() {
	assert.deepStrictEqual(array.permute([1, 2, 3]), [
		[1, 2, 3],
		[1, 3, 2],
		[2, 1, 3],
		[2, 3, 1],
		[3, 1, 2],
		[3, 2, 1]
	])
}

export function shuffleTest() {
	const foo = [1, 2]
	array.shuffle(foo)
	assert.strictEqual(foo[0] + foo[1], 3)
}

export function splitTest() {
	assert.deepStrictEqual(array.split([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]])
}

export function deepFlatTest() {
	assert.deepStrictEqual(array.deepFlat([[1, 2], [[[3]]]]), [1, 2, 3])
}

export function associateTest() {
	assert.deepStrictEqual(array.associate(["x", "y"], [1, 2]), { x: 1, y: 2 })
}

export function nthTest() {
	assert.deepStrictEqual(array.nth([1, 2, 3, 4, 5, 6], 2), [2, 4, 6])
}

export function intersectTest() {
	assert.deepStrictEqual(array.intersect([1, 2, 3], [101, 2, 1, 10], [2, 1]), [1, 2])
}

export function unionTest() {
	assert.deepStrictEqual(array.union([1, 2], [1]), [1, 2])
}

export function excludeTest() {
	assert.deepStrictEqual(array.exclude([1, 2], [1]), [2])
}

export function partitionTest() {
	assert.deepStrictEqual(array.partition([1, 2, 2, 3, 4, 4, 5], x => x % 2 == 1), [[1, 3, 5], [2, 2, 4, 4]])
}

export function groupByTest() {
	assert.deepStrictEqual(array.groupBy([{ a: 1 }, { a: 1 }, { a: 2 }], "a"), { 1: [{ a: 1 }, { a: 1 }], 2: [{ a: 2 }] })
	assert.deepStrictEqual(array.groupBy([{ a: 1 }, { a: 1 }, { a: 2 }], (item) => item.a % 2), { "0": [{ "a": 2 }], "1": [{ "a": 1 }, { "a": 1 }] })
	assert.deepStrictEqual(array.groupBy([], (item, i) => i), {})
}

export function groupByToMapTest() {
	assert.deepStrictEqual(Array.from(array.groupByToMap([{ a: 1 }, { a: 1 }, { a: 2 }], "a").entries()), [[1, [{ "a": 1 }, { "a": 1 }]], [2, [{ "a": 2 }]]])
	assert.deepStrictEqual(Array.from(array.groupByToMap([{ a: 1 }, { a: 1 }, { a: 2 }], (item) => item.a % 2).entries()), [[1, [{ "a": 1 }, { "a": 1 }]], [0, [{ "a": 2 }]]])
	assert.deepStrictEqual(Array.from(array.groupByToMap([], (item, i) => i).entries()), [])
}

export function countTest() {
	assert.strictEqual(array.count(["a", "b"], "a"), 1)
}

export function countByTest() {
	assert.deepStrictEqual(array.countBy([{ a: 1 }, { a: 1 }, { a: 2 }], "a"), { 1: 2, 2: 1 })
}

export function sumTest() {
	assert.strictEqual(array.sum([1, 2]), 3)
}

export function avgTest() {
	assert.strictEqual(array.avg([1, 2]), 1.5)
}