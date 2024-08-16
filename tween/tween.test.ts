import * as assert from "assert"
import { Tween } from "./tween"

export async function tweenTest() {
	await new Promise<void>(resolve => {
		const tween = new Tween()
		let c = 0
		tween.set = (e) => { c = e; }
		tween.end = () => {
			assert.strictEqual(c, 1)
			resolve()
		}
		tween.reset()
		tween.start()
	})
}