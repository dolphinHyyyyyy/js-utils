import * as assert from "assert"
import { event } from "./eventDecorator"

export function eventTest() {
	let count = 0

	class A {
		// @ts-ignore
		@event onClick: any
	}

	var a = new A()
	a.onClick += handleClick as any
	a.onClick(1)
	assert.strictEqual(count, 1)

	a.onClick += handleClick as any
	a.onClick(2)
	assert.strictEqual(count, 5)

	a.onClick -= handleClick as any
	a.onClick(3)
	assert.strictEqual(count, 8)

	a.onClick -= handleClick as any
	a.onClick(4)
	assert.strictEqual(count, 8)

	function handleClick(e: any) {
		count += e
	}
}