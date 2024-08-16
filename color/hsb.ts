import { RGB } from "./rgb"

/** 表示一个 HSB 格式的颜色 */
export interface HSB {
	/** 色调（Hue），范围为 0 到 359（含）*/
	h: number
	/** 饱和度（Saturation），范围为 0 到 1（含）*/
	s: number
	/** 明度（Brightness），范围为 0 到 1（含）*/
	b: number
	/** 透明度（Alpha），范围为 0 到 1（含）*/
	a?: number
}

/**
 * 将 RGB 格式的颜色转换成 HSB 格式
 * @param red 红值，范围为 0 到 255（含）
 * @param green 绿值，范围为 0 到 255（含）
 * @param blue 蓝值，范围为 0 到 255（含）
 */
export function rgbToHSB(red: number, green: number, blue: number): HSB {
	red /= 255
	green /= 255
	blue /= 255
	const max = Math.max(red, green, blue)
	const min = Math.min(red, green, blue)
	const delta = max - min
	let h: number
	if (max == min) {
		h = 0
	} else {
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
	return { h, s: max === 0 ? 0 : delta / max, b: max }
}

/**
 * 将 HSB 格式的颜色转换成 RGB 格式
 * @param hue 色调，范围为 0 到 359（含）
 * @param saturation 饱和度，范围为 0 到 1（含）
 * @param brightness 明度，范围为 0 到 1（含）
 */
export function hsbToRGB(hue: number, saturation: number, brightness: number): RGB {
	hue /= 360
	const index = Math.floor(hue * 6)
	const f = hue * 6 - index
	const p = brightness * (1 - saturation)
	const q = brightness * (1 - f * saturation)
	const t = brightness * (1 - (1 - f) * saturation)
	let r!: number
	let g!: number
	let b!: number
	switch (index % 6) {
		case 0:
			r = brightness
			g = t
			b = p
			break
		case 1:
			r = q
			g = brightness
			b = p
			break
		case 2:
			r = p
			g = brightness
			b = t
			break
		case 3:
			r = p
			g = q
			b = brightness
			break
		case 4:
			r = t
			g = p
			b = brightness
			break
		case 5:
			r = brightness
			g = p
			b = q
			break
	}
	return {
		r: r * 255,
		g: g * 255,
		b: b * 255
	}
}