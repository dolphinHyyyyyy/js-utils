import * as assert from "assert"
import { clearMemoizedCache, memoized } from "./memoized"

export function parameter0Test() {
	let count = 0
	class Foo {
		// @ts-ignore
		@memoized fn() {
			count++
			return 0
		}
	}
	const foo = new Foo()
	assert.strictEqual(foo.fn(), 0)
	assert.strictEqual(count, 1)
	assert.strictEqual(foo.fn(), 0)
	assert.strictEqual(count, 1)
}

export function parameter1Test() {
	let count = 0
	class Foo {
		// @ts-ignore
		@memoized fn(x: number) {
			count++
			return x
		}
	}
	const foo = new Foo()
	assert.strictEqual(foo.fn(1), 1)
	assert.strictEqual(count, 1)
	assert.strictEqual(foo.fn(1), 1)
	assert.strictEqual(count, 1)
	assert.strictEqual(foo.fn(0), 0)
	assert.strictEqual(count, 2)
	assert.strictEqual(foo.fn(0), 0)
	assert.strictEqual(count, 2)
}

export function parameter2Test() {
	let count = 0
	class Foo {
		// @ts-ignore
		@memoized fn(x: number, y: string) {
			count++
			return x + y
		}
	}
	const foo = new Foo()
	assert.strictEqual(foo.fn(1, "1"), "11")
	assert.strictEqual(count, 1)
	assert.strictEqual(foo.fn(1, "1"), "11")
	assert.strictEqual(count, 1)
	assert.strictEqual(foo.fn(0, "1"), "01")
	assert.strictEqual(count, 2)
	assert.strictEqual(foo.fn(0, "1"), "01")
	assert.strictEqual(count, 2)
}

export function clearMemoizedCacheTest() {
	let count = 0
	class Foo {
		// @ts-ignore
		@memoized fn() {
			count++
			return 0
		}
	}
	const foo = new Foo()
	assert.strictEqual(foo.fn(), 0)
	assert.strictEqual(count, 1)
	clearMemoizedCache(foo)
	assert.strictEqual(foo.fn(), 0)
	assert.strictEqual(count, 2)
}