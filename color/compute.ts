import { HSB } from "./hsb"
import { HSL } from "./hsl"
import { Color, formatColor, toHSB, toHSL, toRGB } from "./parse"

/**
 * 叠加两个颜色并返回新颜色
 * @param color1 要处理的第一个颜色
 * @param color2 要处理的第二个颜色
 * @param weight 第二个颜色的透明度
 * @returns 返回新颜色，格式同第一个颜色
 * @example mix("#0f0", "#f00") // "#808000"
 */
export function mix<T extends Color>(color1: T, color2: Color, weight = 0.5) {
	const rgb1 = toRGB(color1)
	const rgb2 = toRGB(color2)
	const alpha1 = rgb1.a ?? 1
	const alpha2 = rgb2.a ?? 1
	const a = alpha1 - alpha2
	const w = weight * 2 - 1
	const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2
	const w2 = 1 - w1
	return convert({
		r: rgb1.r * w1 + rgb2.r * w2,
		g: rgb1.g * w1 + rgb2.g * w2,
		b: rgb1.b * w1 + rgb2.b * w2,
		a: alpha1 * weight + alpha2 * (1 - weight)
	}, color1)
}

/**
 * 减少颜色的亮度
 * @param color 要处理的颜色
 * @param value 要减少的亮度，范围为 0 到 1
 * @returns 返回新颜色，格式同原颜色
 * @example darken("#666", 0.5) // "#000000"
 */
export function darken<T extends Color>(color: T, value: number) {
	return mix("#000", color, value)
}

/**
 * 增加颜色的亮度
 * @param color 要处理的颜色
 * @param value 要增加的亮度，范围为 0 到 1
 * @returns 返回新颜色，格式同原颜色
 * @example lighten("#666", 0.5) // "#e6e6e6"
 */
export function lighten<T extends Color>(color: T, value: number) {
	return mix("#fff", color, value)
}

/**
 * 调整颜色的色相
 * @param color 要处理的颜色
 * @param value 要增加的色相值，范围为 -359 到 359
 * @returns 返回新颜色，格式同原颜色
 * @example spin("#666", 50) // "#666666"
 */
export function spin<T extends Color>(color: T, value: number) {
	const hsl = toHSL(color)
	hsl.h += value
	return convert(hsl, color)
}

/**
 * 调整颜色的饱和度
 * @param color 要处理的颜色
 * @param value 要增加的饱和度，范围为 -1 到 1
 * @returns 返回新颜色，格式同原颜色
 * @example saturate("#666", 0.5) // "#993333"
 */
export function saturate<T extends Color>(color: T, value: number) {
	const hsl = toHSL(color)
	hsl.s += value
	return convert(hsl, color)
}

/**
 * 调整颜色的透明度
 * @param color 要处理的颜色
 * @param value 要增加的透明度，范围为 -1 到 1
 * @returns 返回新颜色，格式同原颜色
 * @example fade("#666", 0.5) // "rgba(102,102,102,0.5)"
 */
export function fade<T extends Color>(color: T, value: number) {
	const hsl = toHSL(color)
	hsl.a = (hsl.a == undefined ? 1 : 0) - value
	return convert(hsl, color)
}

/**
 * 设置颜色的透明度
 * @param color 要处理的颜色
 * @param value 要设置的透明度，范围为 -1 到 1
 * @returns 返回新颜色，格式同原颜色
 * @example alpha("#666", 0.5) // "rgba(102,102,102,0.5)"
 */
export function alpha<T extends Color>(color: T, value: number) {
	const rgb = toRGB(color)
	rgb.a = value
	return convert(rgb, color)
}

/**
 * 获取颜色的反色
 * @param color 要处理的颜色
 * @returns 返回新颜色，格式同原颜色
 * @example invert("#666") // "#999999"
 */
export function invert<T extends Color>(color: T) {
	const rgb = toRGB(color)
	return convert({
		r: 255 - rgb.r,
		g: 255 - rgb.g,
		b: 255 - rgb.b,
		a: rgb.a
	}, color)
}

/**
 * 将一个 HSL 或 RGB 颜色对象转为和指定颜色格式相同的格式
 * @param color HSL 或 RGB 颜色对象
 * @param type 目标颜色格式
 * @returns 返回指定格式的颜色
 */
export function convert<T extends Color>(color: Color, type: T) {
	if (typeof type === "string") {
		return formatColor(color, type.startsWith("hsl") ? "hsl" : type.startsWith("rgb") ? "rgb" : "hex6") as T
	}
	if (typeof (type as HSL).l === "number") {
		return toHSL(color) as T
	}
	if (typeof (type as HSB).s === "number") {
		return toHSB(color) as T
	}
	return toRGB(color) as T
}