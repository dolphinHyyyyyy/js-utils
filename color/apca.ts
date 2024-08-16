import { Color, toRGB } from "./parse"

/**
 * 计算颜色的 APCA 对比度
 * @param color 文本色
 * @param backgroundColor 背景色
 */
export function apca(color: Color, backgroundColor: Color) {
	let textLuminance = luminance(color)
	let backgroundLuminance = luminance(backgroundColor)
	// 如果颜色非常接近黑色，增加亮度
	if (textLuminance <= 0.022) {
		textLuminance += (0.022 - textLuminance) ** 1.414
	}
	if (backgroundLuminance <= 0.022) {
		backgroundLuminance += (0.022 - backgroundLuminance) ** 1.414
	}
	// 如果颜色非常接近，返回 0
	if (Math.abs(backgroundLuminance - textLuminance) < 0.0005) {
		return 0
	}
	// 一般为白底黑字
	const bow = textLuminance < backgroundLuminance
	const sapc = (bow ? backgroundLuminance ** 0.56 - textLuminance ** 0.57 : backgroundLuminance ** 0.65 - textLuminance ** 0.62) * 1.14
	const sapcAbs = Math.abs(sapc);
	return sapcAbs < 0.001 ? 0 : sapcAbs < 0.035991 ? sapc - sapc * 27.7847239587675 * 0.027 : sapc + (bow ? -0.027 : 0.027)
}

/**
 * 获取颜色的光亮度
 * @param color 要处理的颜色
 * @returns 返回亮度，值越大亮度越高（越接近白色），范围为 0 到 1（含）
 * @example luminance("#666") // 0.13286832155381795
 */
export function luminance(color: Color) {
	color = toRGB(color)
	return (color.r / 255) ** 2.4 * 0.2126729 + (color.g / 255) ** 2.4 * 0.7151522 + (color.b / 255) ** 2.4 * 0.072175
}