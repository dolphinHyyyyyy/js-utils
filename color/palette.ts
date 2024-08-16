import { apca } from "./apca"
import { convert, mix } from "./compute"
import { Color, toHSB } from "./parse"

/**
 * 计算更深的颜色
 * @param color 原颜色
 * @param amount 变化的幅度（-1 - 1）
 */
export function shade<T extends Color>(color: T, amount = 0.1) {
	const hsb = toHSB(color)
	// 灰色按线性渐变
	if (hsb.s <= 0.15 || hsb.b <= 0.3) {
		return mix(color, { r: 0, g: 0, b: 0 }, 1 - amount)
	}
	amount /= 0.1
	// 60deg - 240deg 是冷色调，冷色调变深为更冷，暖色调变深为更暖
	const hueStep = 60 <= hsb.h && hsb.h <= 240 ? 2 : -2
	const saturationStep = amount <= 1 ? 0.05 : (1 - hsb.s) / 4
	const brightnessStep = amount <= 1 ? 0.15 : (hsb.b - 0.3) / 4
	return convert({
		h: (hsb.h + hueStep * amount + 360) % 360,
		s: Math.min(hsb.s + saturationStep * amount, 1),
		b: Math.max(hsb.b - brightnessStep * amount, 0)
	}, color)
}

/**
 * 计算更浅的颜色
 * @param color 原颜色
 * @param amount 变化的幅度（-1 - 1）
 */
export function tint(color: Color, amount = 0.1) {
	const hsb = toHSB(color)
	// 灰色按线性渐变
	if (hsb.s <= 0.15 || hsb.b <= 0.3) {
		return mix(color, { r: 255, g: 255, b: 255 }, 1 - amount)
	}
	amount /= 0.1

	// 60deg - 240deg 是冷色调，冷色调变浅为更暖，暖色调变浅为更冷
	const hueStep = 60 <= hsb.h && hsb.h <= 240 ? -2 : 2
	const saturationStep = amount <= 1 ? 0.15 : (hsb.s - 0.1) / 4
	const brightnessStep = amount <= 1 ? 0.05 : (1 - hsb.b) / 4
	return convert({
		h: (hsb.h + hueStep * amount + 360) % 360,
		s: Math.max(hsb.s - saturationStep * amount, 0),
		b: Math.min(hsb.b + brightnessStep * amount, 1)
	}, color)
}

/**
 * 计算和指定颜色对比度最大的颜色
 * @param backgroundColor 背景色
 * @param darkColor 要使用的深色
 * @param lightColor 要使用的浅色
 * @param threshold 对比度阀值，值越大越容易选中浅色
 * @returns 返回给定两个颜色中的其中一个
 * @example contrast("#666", "#000", "#fff") // "#fff"
 */
export function contrast<T extends Color, U extends Color = T>(backgroundColor: Color, darkColor: T, lightColor: U, threshold = -0.5) {
	return Math.abs(apca(lightColor, backgroundColor)) - Math.abs(apca(darkColor, backgroundColor)) > threshold ? lightColor : darkColor
}