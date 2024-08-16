import * as assert from "assert"
import * as object from "./object"

export function isObjectTest() {
	assert.strictEqual(object.isObject({}), true)
	assert.strictEqual(object.isObject(true), false)
	assert.strictEqual(object.isObject(null), false)
}

export function isPlainObjectTest() {
	assert.strictEqual(object.isPlainObject({ x: 1 }), true)
	assert.strictEqual(object.isPlainObject([]), false)
}

export function typeTest() {
	assert.strictEqual(object.type(null), "Null")
	assert.strictEqual(object.type(undefined), "Undefined")
	assert.strictEqual(object.type(new Function()), "Function")
	assert.strictEqual(object.type(+"x"), "Number")
	assert.strictEqual(object.type(/x/), "RegExp")
	assert.strictEqual(object.type([]), "Array")

	assert.strictEqual(object.type(true), "Boolean")
	assert.strictEqual(object.type(false), "Boolean")
	assert.strictEqual(object.type(Boolean(true)), "Boolean")
	assert.strictEqual(object.type(0), "Number")
	assert.strictEqual(object.type(1), "Number")
	assert.strictEqual(object.type(Number(1)), "Number")
	assert.strictEqual(object.type(""), "String")
	assert.strictEqual(object.type("x"), "String")
	assert.strictEqual(object.type(String("x")), "String")
	assert.strictEqual(object.type({}), "Object")
	assert.strictEqual(object.type(/foo/), "RegExp")
	assert.strictEqual(object.type(new RegExp("asdf")), "RegExp")
	assert.strictEqual(object.type([1]), "Array")
	assert.strictEqual(object.type(new Date()), "Date")
	assert.strictEqual(object.type(new Function("return;")), "Function")
	assert.strictEqual(object.type(function () { }), "Function")
	assert.strictEqual(object.type(window), "Window")
	assert.strictEqual(object.type(document), "HTMLDocument")
	assert.strictEqual(object.type(document.createElement("div")), "HTMLDivElement")
	assert.strictEqual(object.type(document.createTextNode("foo")), "Text")

	assert.strictEqual(object.type(document.getElementsByTagName("*")), "HTMLCollection") // !Safari
}

export function isEmptyTest() {
	assert.strictEqual(object.isEmpty(null), true)
	assert.strictEqual(object.isEmpty(undefined), true)
	assert.strictEqual(object.isEmpty(""), true)
	assert.strictEqual(object.isEmpty(" "), false)
	assert.strictEqual(object.isEmpty([]), true)
	assert.strictEqual(object.isEmpty({}), true)
}

export function sizeTest() {
	assert.strictEqual(object.size({ x: 1, y: 2 }), 2)
	assert.strictEqual(object.size([0, 1]), 2)
}

export function includesTest() {
	assert.strictEqual(object.includes([1, 2, 3], 3), true)
	assert.strictEqual(object.includes([1, 2, 3], 4), false)
	assert.strictEqual(object.includes({ x: 1, y: 2, z: 3 }, 3), true)
	assert.strictEqual(object.includes({ x: 1, y: 2, z: 3 }, 4), false)
}

export function keyOfTest() {
	assert.strictEqual(object.keyOf({ x: 1, y: 1 }, 1), "x")
}

export function pickTest() {
	assert.deepStrictEqual(object.pick({ x: 1, y: 2 }, ["x"]), { x: 1 })
}

export function omitTest() {
	assert.deepStrictEqual(object.omit({ x: 1, y: 2 }, ["y"]), { x: 1 })
	assert.deepStrictEqual(object.omit({ x: 1, y: 2, z: 3 }, ["y", "s" as any]), { x: 1, z: 3 })
}

export function invertTest() {
	assert.deepStrictEqual(object.invert({ x: 1, y: 2, z: 3 }), { 1: "x", 2: "y", 3: "z" })
}

export function cloneTest() {
	assert.deepStrictEqual(object.clone({ x: 3, y: [5] }), { x: 3, y: [5] })
}

export function deepCloneTest() {
	assert.deepStrictEqual(object.deepClone({ x: 3, y: [5] }), { x: 3, y: [5] })

	const arr: any[] = []
	arr[0] = arr
	const cloned = object.deepClone(arr)
	assert.strictEqual(cloned[0], cloned[0][0])

	assert.strictEqual(object.deepClone(new Date(2019, 9, 8)).getTime(), new Date(2019, 9, 8).getTime())
}

export function deepEqualsTest() {
	assert.strictEqual(object.deepEquals([], []), true)
	assert.strictEqual(object.deepEquals([], [0]), false)

	const arr1: any[] = []
	arr1[0] = arr1
	const arr2: any[] = []
	arr2[0] = arr2
	assert.strictEqual(object.deepEquals(arr1, arr2), true)
}

export function matchesTest() {
	assert.strictEqual(object.matches({ x: 0, y: 1 }, { x: 0 }), true)
	assert.strictEqual(object.matches({ x: 0, y: 1 }, { x: 0, z: 0 }), false)

	const o1: any = { v: 1 }
	o1.rec = o1
	assert.strictEqual(object.matches(o1, { v: 1 }), true)
}

export function compareTest() {
	assert.deepStrictEqual(object.compare({ x: 1, z: 1 }, { y: 1, z: 2 }), { left: ["x"], right: ["y"], both: ["z"] })
}

export function deepCompareTest() {
	assert.deepStrictEqual(object.deepCompare({ x: 1, z: 1 }, { y: 1, z: 2 }), { left: ["x"], right: ["y"], both: ["z"] })
	assert.deepStrictEqual(object.deepCompare({ x: 1, y: 1, z: { a: 1, b: 1 } }, { y: 2, z: { a: 2 } }), { left: ["x", "z.b"], right: [], both: ["y", "z.a"] })
}

export function getPropertyDescriptorTest() {
	assert.deepStrictEqual(object.getPropertyDescriptor({ x: 1 }, "x")!.value, 1)
}

export function eachTest() {
	let sum = 0
	object.each({ x: 1, y: 2 }, v => { sum += v })
	assert.strictEqual(sum, 3)

	let all = ""
	object.each(["x", "y"], v => { all += v })
	assert.strictEqual(all, "xy")

	let all2 = ""
	object.each(["x", "y"], v => { all2 += v; return false })
	assert.strictEqual(all2, "x")

	object.each([0, 1, 2], (n, i) => {
		assert.strictEqual(i, n.toString(), "Check array iteration")
	})

	object.each({ name: "name", lang: "lang" }, (n, i) => {
		assert.strictEqual(i, n, "Check object iteration")
	})

	var total = 0
	object.each([1, 2, 3], (v) => { total += v })
	assert.strictEqual(total, 6, "Looping over an array")

	total = 0
	object.each([1, 2, 3], (v, i) => { total += v; if (i === "1") return false })
	assert.strictEqual(total, 3, "Looping over an array, with break")

	total = 0
	object.each({ "x": 1, "y": 2, "z": 3 }, (v, i) => { total += v })
	assert.strictEqual(total, 6, "Looping over an object")

	total = 0
	object.each({ "x": 3, "y": 3, "z": 3 }, (v, i) => { total += v; return false })
	assert.strictEqual(total, 3, "Looping over an object, with break")

	var stylesheetCount = 0
	object.each(document.styleSheets, (i) => {
		stylesheetCount++
	})
	assert.ok(stylesheetCount, "should not throw an error in IE while looping over document.styleSheets and return proper amount")

}

export function eachRightTest() {
	let sum = 0
	object.eachRight({ x: 1, y: 2 }, v => { sum += v })
	assert.strictEqual(sum, 3)

	let all = ""
	object.eachRight(["x", "y"], v => { all += v })
	assert.strictEqual(all, "yx")

	let all2 = ""
	object.eachRight(["x", "y"], v => { all2 += v; return false })
	assert.strictEqual(all2, "y")

	object.eachRight([0, 1, 2], (n, i) => {
		assert.strictEqual(i, n.toString(), "Check array iteration")
	})

	object.eachRight({ name: "name", lang: "lang" }, (n, i) => {
		assert.strictEqual(i, n, "Check object iteration")
	})
}

export function forEachTest() {
	let sum = 0
	object.forEach({ x: 1, y: 2 }, v => { sum += v })
	assert.strictEqual(sum, 3)

	let all = ""
	object.forEach(["x", "y"], v => { all += v })
	assert.strictEqual(all, "xy")
}

export function forEachRightTest() {
	let sum = 0
	object.forEachRight({ x: 1, y: 2 }, v => { sum += v })
	assert.strictEqual(sum, 3)

	let all = ""
	object.forEachRight(["x", "y"], v => { all += v })
	assert.strictEqual(all, "yx")
}

export function filterTest() {
	assert.deepStrictEqual(object.filter({ x: 1, y: 2 }, item => item > 1), { y: 2 })
}

export function mapTest() {
	assert.deepStrictEqual(object.map({ x: "x", y: "y" }, item => item + item), { x: "xx", y: "yy" })
}

export function everyTest() {
	assert.strictEqual(object.every([1, 2], item => item > 0), true)
	assert.strictEqual(object.every([1, 2], item => item > 1), false)
	assert.strictEqual(object.every([1, 2], item => item > 2), false)
	assert.strictEqual(object.every({ x: 1, y: 2 }, item => item > 0), true)
	assert.strictEqual(object.every({ x: 1, y: 2 }, item => item > 1), false)
	assert.strictEqual(object.every({ x: 1, y: 2 }, item => item > 2), false)
}

export function someTest() {
	assert.strictEqual(object.some([1, 2], item => item > 0), true)
	assert.strictEqual(object.some([1, 2], item => item > 1), true)
	assert.strictEqual(object.some([1, 2], item => item > 2), false)
	assert.strictEqual(object.some({ x: 1, y: 2 }, item => item > 1), true)
	assert.strictEqual(object.some({ x: 1, y: 2 }, item => item > 1), true)
	assert.strictEqual(object.some({ x: 1, y: 2 }, item => item > 2), false)
}

export function findTest() {
	assert.strictEqual(object.find([1, 2], item => item > 1), 2)
	assert.strictEqual(object.find({ x: 1, y: 2 }, item => item > 1), 2)
}

export function findKeyTest() {
	assert.strictEqual(object.findKey([1, 2], item => item > 1), "1")
	assert.strictEqual(object.findKey([1, 2], item => item > 2), undefined)
	assert.strictEqual(object.findKey({ x: 1, y: 2 }, item => item > 1), "y")
	assert.strictEqual(object.findKey({ x: 1, y: 2 }, item => item > 2), undefined)
}

export function findLastKeyTest() {
	assert.strictEqual(object.findLastKey([1, 2], item => item > 1), "1")
	assert.strictEqual(object.findLastKey([1, 2], item => item > 2), undefined)
	assert.strictEqual(object.findLastKey({ x: 1, y: 2 }, item => item > 1), "y")
	assert.strictEqual(object.findLastKey({ x: 1, y: 2 }, item => item > 2), undefined)
}

export function reduceTest() {
	assert.strictEqual(object.reduce([1, 2], (x: number, y: number) => x + y), 3)
	assert.strictEqual(object.reduce([1, 2], (x: number, y: number) => x + y, 10), 13)
	assert.strictEqual(object.reduce({ x: 1, y: 2 }, (x: number, y: number) => x + y), 3)
	assert.strictEqual(object.reduce({ x: 1, y: 2 }, (x: number, y: number) => x + y, 10), 13)
}

export function reduceRightTest() {
	assert.strictEqual(object.reduceRight([1, 2], (x: number, y: number) => x + y), 3)
	assert.strictEqual(object.reduceRight([1, 2], (x: number, y: number) => x + y, 10), 13)
	assert.strictEqual(object.reduceRight({ x: 1, y: 2 }, (x: number, y: number) => x + y), 3)
	assert.strictEqual(object.reduceRight({ x: 1, y: 2 }, (x: number, y: number) => x + y, 10), 13)
}

export function getTest() {
	assert.strictEqual(object.get({ x: { y: 1 } }, "x.y"), 1)
}

export function setTest() {
	const foo = {}
	object.set(foo, "x[1].y", 2)
	assert.deepStrictEqual(foo, { x: [undefined, { y: 2 }] })
}

// export function mergeTest() {

// }

export function setPropertyTest() {
	class A {
		get prop() { return 1 }
		set prop(value) { object.setProperty(this, "prop", value) }
	}
	const x = new A()
	assert.strictEqual(x.prop, 1)
	x.prop++
	assert.strictEqual(x.prop, 2)
	x.prop++
	assert.strictEqual(x.prop, 3)
}

export function assignIfNotExistsTest() {
	assert.deepStrictEqual(object.assignIfNotExists({ x: 1 }, { y: 2 }), { x: 1, y: 2 })
}

export function insertBeforeTest() {
	const x = { x: 1 }
	object.insertBefore(x, "y", 2, "x")
	assert.deepStrictEqual(x, { y: 2, x: 1 })
}

export function clearTest() {
	assert.deepStrictEqual(object.clear({ x: undefined, y: null, z: 3 }), {})
}

export function cleanTest() {
	assert.deepStrictEqual(object.clean({ x: undefined, y: null, z: 3 }), { z: 3 })
}

export function addCallbackTest() {
	class A {
		func = null as any
	}
	let z = 0
	const x = new A()
	object.addCallback(x, "func", () => {
		assert.strictEqual(++z, 1)
	})
	object.addCallback(x, "func", () => {
		assert.strictEqual(++z, 2)
		return false
	})
	object.addCallback(x, "func", () => {
		assert.strictEqual(++z, 3)
	})
	assert.strictEqual(x.func(), false)
}

export function addSetCallback() {
	class A {
		func = 0
	}
	let z = 0
	const x = new A()
	object.addSetCallback(x, "func", () => z++)
	x.func = 2
	assert.strictEqual(z, 1)
	object.addSetCallback(x, "func", () => z++)
	x.func = 3
	assert.strictEqual(z, 3)
}