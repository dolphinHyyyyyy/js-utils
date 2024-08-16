import { RGB } from "./rgb"

/** 表示一个 HSL 格式的颜色 */
export interface HSL {
	/** 色调（Hue），范围为 0 到 359（含）*/
	h: number
	/** 饱和度（Saturation），范围为 0 到 1（含）*/
	s: number
	/** 亮度（Lightness），范围为 0 到 1（含）*/
	l: number
	/** 透明度（Alpha），范围为 0 到 1（含）*/
	a?: number
}

/**
 * 将 RGB 格式的颜色转换成 HSL 格式
 * @param red 红值，范围为 0 到 255（含）
 * @param green 绿值，范围为 0 到 255（含）
 * @param blue 蓝值，范围为 0 到 255（含）
 */
export function rgbToHSL(red: number, green: number, blue: number): HSL {
	red /= 255
	green /= 255
	blue /= 255
	const max = Math.max(red, green, blue)
	const min = Math.min(red, green, blue)
	let h: number
	let s: number
	const l = (max + min) / 2
	if (max == min) {
		h = s = 0
	} else {
		const delta = max - min
		s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)
		switch (max) {
			case red:
				h = (green - blue) / delta + (green < blue ? 6 : 0)
				break
			case green:
				h = (blue - red) / delta + 2
				break
			default:
				h = (red - green) / delta + 4
				break
		}
		h *= 60
	}
	return { h, s, l }
}

/**
 * 将 HSB 格式的颜色转换成 RGB 格式
 * @param hue 色调，范围为 0 到 359（含）
 * @param saturation 饱和度，范围为 0 到 1（含）
 * @param lightness 亮度，范围为 0 到 1（含）
 */
export function hslToRGB(hue: number, saturation: number, lightness: number): RGB {
	let r: number
	let g: number
	let b: number
	if (saturation === 0) {
		r = g = b = lightness
	} else {
		const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation
		const p = 2 * lightness - q
		hue /= 360
		r = hueToRGB(p, q, hue + 1 / 3)
		g = hueToRGB(p, q, hue)
		b = hueToRGB(p, q, hue - 1 / 3)
	}
	return {
		r: r * 255,
		g: g * 255,
		b: b * 255
	}
}

function hueToRGB(p: number, q: number, t: number) {
	if (t < 0) t++
	if (t > 1) t--
	if (t * 6 < 1) return p + (q - p) * 6 * t
	if (t * 2 < 1) return q
	if (t * 3 < 2) return p + (q - p) * (2 / 3 - t) * 6
	return p
}