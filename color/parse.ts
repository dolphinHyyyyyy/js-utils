import { HSB, hsbToRGB, rgbToHSB } from "./hsb"
import { HSL, hslToRGB, rgbToHSL } from "./hsl"
import { intToRGB, RGB } from "./rgb"

/**
 * 解析一个颜色字符串，返回一个对象
 * @param color 颜色字符串，支持以下格式：
 * - `"#26f"`
 * - `"#2676ff"`
 * - `"#2676ffff"`
 * - `"rgb(38, 118, 255)"`
 * - `"rgba(38, 118, 255, 100%)"`
 * - `"rgb(38 118 255 / 100%)"`
 * - `"hsl(217.9, 100%, 57.5%)"`
 * - `"hsla(217.9, 100%, 57.5%, 100%)"`
 * - `"hsl(217.9 100% 57.5% / 100%)"`
 */
export function parseColor(color: string) {
	if (color.charCodeAt(0) === 35 /* # */) {
		if (color.length <= 5) {
			color = color.replace(/^#(.)(.)(.)(.?)$/, "#$1$1$2$2$3$3$4$4")
		}
		const num = parseInt(color.slice(1), 16)
		if (color.length === 9) {
			const result = intToRGB(num >>> 8)
			result.a = (num & 0xff) / 255
			return result
		}
		return intToRGB(num)
	}
	const match = /^(\w+)\D(\d+(?:\.\d*)?|\.\d+)(%?)\D+(\d+(?:\.\d*)?|\.\d+)(%?)\D+(\d+(?:\.\d*)?|\.\d+)(%?)(?:\D+(\d+(?:\.\d*)?|\.\d+)(%?))?/.exec(color)
	if (!match) {
		return null
	}
	let v1 = parseFloat(match[2])
	let v2 = parseFloat(match[4])
	let v3 = parseFloat(match[6])
	let v4 = match[8] ? parseFloat(match[8]) : undefined
	if (match[3]) v1 /= 100
	if (match[5]) v2 /= 100
	if (match[7]) v3 /= 100
	if (match[9] && v4 !== undefined) v4 /= 100
	const format = match[1].toLowerCase()
	return { [format[0]]: v1, [format[1]]: v2, [format[2]]: v3, a: v4 }
}

/**
 * 表示一个颜色，颜色可以是以下格式之一：
 * - `"#26f"`
 * - `"#2676ff"`
 * - `"#2676ffff"`
 * - `"rgb(38, 118, 255)"`
 * - `"rgba(38, 118, 255, 100%)"`
 * - `"rgb(38 118 255 / 100%)"`
 * - `"hsl(217.9, 100%, 57.5%)"`
 * - `"hsla(217.9, 100%, 57.5%, 100%)"`
 * - `"hsl(217.9 100% 57.5% / 100%)"`
 * - `{r: 38, g: 118, b: 255, a: 1}`
 * - `{h: 217.9, s: 1, l: 0.575, a: 1}`
 * - `{h: 217.9, s: 0.851, b: 1, a: 1}`
 * - 0x000000
 */
export type Color = string | RGB | HSL | HSB | number

/**
 * 格式化颜色为字符串
 * @param color 要处理的颜色
 * @param format 颜色的格式，可以使用以下值之一：
 * - `hex3`：`#26f` 或 `#2676ff` 或 `rgba(0, 0, 0, 1)` 取最短的格式
 * - `hex6`(默认)：`#2676ff` 或 `rgba(0, 0, 0, 1)` 取最短的格式
 * - `hex4`：`#26ff` 或 `#2676ffff` 取最短的格式
 * - `hex8`：`#2676ffff`
 * - `rgb`：`rgb(0, 0, 0)` 或 `rgba(0, 0, 0, 1)` 取最短的格式
 * - `rgba`：`rgba(0, 0, 0, 1)`
 * - `hsl`：`hsl(0, 0%, 0%)` 或 `hsla(0, 0, 0, 1)` 取最短的格式
 * - `hsla`：`hsla(0, 0%, 0%, 1)`
 * @example format("rgb(0, 0, 0)") // "#000000"
 */
export function formatColor(color: Color, format: "hex3" | "hex6" | "hex4" | "hex8" | "rgb" | "rgba" | "hsl" | "hsla" = "hex6") {
	if (format === "hsl" || format === "hsla") {
		color = toHSL(color)
		const hslString = `${Math.round(Math.min(Math.max(color.h, 0), 360))}, ${Math.round(Math.min(Math.max(color.s * 100, 0), 100))}%, ${Math.round(Math.min(Math.max(color.l * 100, 0), 100))}%`
		return color.a! < 1 || format === "hsla" ? `hsla(${hslString}, ${color.a == undefined ? 100 : Math.round(Math.min(Math.max(color.a * 100, 0), 100))}%)` : `hsl(${hslString})`
	}
	color = toRGB(color)
	const r = Math.round(color.r)
	const g = Math.round(color.g)
	const b = Math.round(color.b)
	if (color.a! < 1 && format !== "hex4" && format !== "hex8" || format === "rgba") {
		return `rgba(${r}, ${g}, ${b}, ${color.a == undefined ? 100 : Math.round(Math.min(Math.max(color.a * 100, 0), 100))}%)`
	}
	if (format === "rgb") {
		return `rgb(${r}, ${g}, ${b})`
	}
	let result = `#${hex(r)}${hex(g)}${hex(b)}`
	if (color.a! < 1) {
		result += hex(color.a! * 255)
	}
	if (format === "hex3") {
		result = result.replace(/^#(.)\1(.)\2(.)\3$/, "#$1$2$3")
	} else if (format === "hex4") {
		result = result.replace(/^#(.)\1(.)\2(.)\3(.)\4$/, "#$1$2$3$4")
	}
	return result
}

function hex(num: number) {
	if (num <= 0) return "00"
	if (num > 255) return "ff"
	const str = Math.round(num).toString(16)
	return str.length < 2 ? "0" + str : str
}

/**
 * 将其他格式的颜色转为 RGB 格式
 * @param color 要转换的颜色
 * @example toRGB("#000") // {r: 0, g: 0, b: 0}
 */
export function toRGB(color: Color) {
	if (typeof color === "string") {
		color = parseColor(color) as RGB | HSL | HSB ?? { r: 0, g: 0, b: 0 } as RGB
	} else if (typeof color === "number") {
		return intToRGB(color)
	}
	if (typeof (color as HSL).l === "number") {
		const result = hslToRGB(Math.min(Math.max((color as HSL).h, 0), 360), Math.min(Math.max((color as HSL).s, 0), 1), Math.min(Math.max((color as HSL).l, 0), 1))
		result.a = (color as HSL).a
		return result
	}
	if (typeof (color as HSB).s === "number") {
		const result = hsbToRGB(Math.min(Math.max((color as HSB).h, 0), 360), Math.min(Math.max((color as HSB).s, 0), 1), Math.min(Math.max((color as HSB).b, 0), 1))
		result.a = (color as HSB).a
		return result
	}
	return color as RGB
}

/**
 * 将任意颜色格式转为 HSL 对象格式，如果原对象已经是 HSL 格式则返回原对象
 * @param color 要转换的颜色
 * @example toHSL("hsl(0, 0, 0)") // {h: 0, s: 0, l: 0}
 */
export function toHSL(color: Color) {
	if (typeof color === "string") {
		color = parseColor(color) as RGB | HSL | HSB ?? { h: 0, s: 0, l: 0 } as HSL
	}
	if (typeof color !== "number" && typeof (color as HSL).l === "number") {
		return color as HSL
	}
	color = toRGB(color)
	const result = rgbToHSL(color.r, color.g, color.b)
	result.a = color.a
	return result
}

/**
 * 将任意颜色格式转为 HSB 对象格式
 * @param color 要转换的颜色
 * @example toHSB("hsb(0, 0, 0)") // {h: 0, s: 0, b: 0}
 */
export function toHSB(color: Color): HSB {
	if (typeof color === "string") {
		color = parseColor(color) as RGB | HSL | HSB ?? { h: 0, s: 0, b: 0 } as HSB
	}
	if (typeof color !== "number" && typeof (color as HSB).h === "number" && typeof (color as HSB).b === "number") {
		return color as HSB
	}
	color = toRGB(color)
	const result = rgbToHSB(color.r, color.g, color.b)
	result.a = color.a
	return result
}