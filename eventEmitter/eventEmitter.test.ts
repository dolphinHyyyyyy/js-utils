import * as assert from "assert"
import { EventEmitter } from "./eventEmitter"

export function eventEmitterTest() {
	const ee = new EventEmitter()
	const func = (arg1: any, arg2: any) => {
		assert.strictEqual(arg1, "arg1")
		assert.strictEqual(arg2, "arg2")
	}
	ee.on("foo", func)
	ee.emit("foo", "arg1", "arg2")
	ee.off("foo", func)
	ee.emit("foo", "arg1-error", "arg2-error")

	ee.once("goo", func)
	ee.emit("goo", "arg1", "arg2")
	ee.emit("goo")
	ee.off("goo")
	ee.off()
}