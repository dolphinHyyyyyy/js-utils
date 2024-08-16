import * as assert from "assert"
import * as flags from "./flags"

enum Colors {
	red = 1 << 0,
	yellow = 1 << 1,
	blue = 1 << 2,
}

export function hasFlagTest() {
	assert.strictEqual(flags.hasFlag(Colors.red | Colors.yellow, Colors.red), true)
	assert.strictEqual(flags.hasFlag(Colors.red | Colors.yellow, Colors.blue), false)
}

export function setFlagTest() {
	assert.strictEqual(flags.setFlag(Colors.red, Colors.yellow, true), Colors.red | Colors.yellow)
	assert.strictEqual(flags.setFlag(Colors.red, Colors.yellow, false), Colors.red)
	assert.strictEqual(flags.setFlag(Colors.red | Colors.yellow, Colors.yellow, true), Colors.red | Colors.yellow)
	assert.strictEqual(flags.setFlag(Colors.red | Colors.yellow, Colors.yellow, false), Colors.red)
}

export function parseFlagsTest() {
	assert.strictEqual(flags.parseFlags(Colors, "red"), Colors.red)
	assert.strictEqual(flags.parseFlags(Colors, "red|yellow"), Colors.red | Colors.yellow)
	assert.strictEqual(flags.parseFlags(Colors, "red | yellow"), Colors.red | Colors.yellow)
	assert.strictEqual(flags.parseFlags(Colors, "red,yellow"), Colors.red | Colors.yellow)
}

export function formatFlagsTest() {
	assert.strictEqual(flags.formatFlags(Colors, Colors.red), "red")
	assert.strictEqual(flags.formatFlags(Colors, Colors.red | Colors.yellow), "red|yellow")
}

export function getFlagNamesTest() {
	assert.deepStrictEqual(flags.getFlagNames(Colors), ["red", "yellow", "blue"])
}