import * as assert from "assert"
import * as color from "./color"

function clean(color: color.RGB | color.HSL | color.HSB) {
	if (color.a == undefined) {
		delete color.a
	}
	for (const key of ["r", "g", "b"]) {
		if (color[key] !== undefined) {
			color[key] = Math.round(color[key])
		}
	}
	return color
}

export function toRGBTest() {
	assert.deepStrictEqual(clean(color.toRGB("#000")), { r: 0, g: 0, b: 0 })
	assert.deepStrictEqual(clean(color.toRGB("#ff0000")), { r: 255, g: 0, b: 0 })
	assert.deepStrictEqual(clean(color.toRGB("#ff0000ff")), { r: 255, g: 0, b: 0, a: 1 })
	assert.deepStrictEqual(clean(color.toRGB("rgb(255,0,0)")), { r: 255, g: 0, b: 0 })
	assert.deepStrictEqual(clean(color.toRGB("rgba(255,0,0,0.9)")), { r: 255, g: 0, b: 0, a: 0.9 })
	assert.deepStrictEqual(clean(color.toRGB("hsl(255,0,0)")), { r: 0, g: 0, b: 0 })
	assert.deepStrictEqual(clean(color.toRGB("hsla(255,0,0,0.9)")), { r: 0, g: 0, b: 0, a: 0.9 })
	assert.deepStrictEqual(clean(color.toRGB({ h: 255, s: 0, l: 0 })), { r: 0, g: 0, b: 0 })
	assert.deepStrictEqual(clean(color.toRGB({ h: 255, s: 0, l: 0, a: 0 })), { r: 0, g: 0, b: 0, a: 0 })
	assert.deepStrictEqual(clean(color.toRGB({ h: 255, s: .5, b: .5, a: 0 })), { r: 80, g: 64, b: 128, a: 0 })
	assert.deepStrictEqual(clean(color.toRGB({ h: 201, s: .8, b: .6, a: .88 })), { r: 31, g: 110, b: 153, a: .88 })
	assert.deepStrictEqual(color.formatColor(color.toRGB(0xfbfbfb)), "#fbfbfb")
}

export function toHSLTest() {
	assert.deepStrictEqual(clean(color.toHSL("#000")), { h: 0, s: 0, l: 0 })
}

export function toHSBTest() {
	assert.deepStrictEqual(clean(color.toHSB("#000")), { h: 0, s: 0, b: 0 })
}

export function formatTest() {
	assert.strictEqual(color.formatColor("rgb(0, 0, 0)"), "#000000")
}

export function spinTest() {
	assert.strictEqual(color.spin("#666", 50), "#666666")
}

export function saturateTest() {
	assert.strictEqual(color.saturate("#666", 0.5), "#993333")
}

export function darkenTest() {
	assert.strictEqual(color.darken("#666", 0.5), "#333333")
}

export function lightenTest() {
	assert.strictEqual(color.lighten("#666", 0.5), "#b3b3b3")
}

export function fadeTest() {
	assert.strictEqual(color.fade("#666", 0.5), "rgba(102, 102, 102, 50%)")
}

export function alphaTest() {
	assert.strictEqual(color.alpha("#666", 0.5), "rgba(102, 102, 102, 50%)")
}

export function invertTest() {
	assert.strictEqual(color.invert("#666"), "#999999")
}

export function mixTest() {
	assert.strictEqual(color.mix("#0f0", "#f00"), "#808000")
}

export function contrastTest() {
	assert.strictEqual(color.contrast("#666", "#000", "#fff"), "#fff")
}