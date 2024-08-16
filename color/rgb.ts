/** 表示一个 RGB 格式的颜色 */
export interface RGB {
	/** 红值（Red），范围为 0 到 255（含）*/
	r: number
	/** 绿值（Green），范围为 0 到 255（含）*/
	g: number
	/** 蓝值（Blue），范围为 0 到 255（含）*/
	b: number
	/** 透明度（Alpha），范围为 0 到 1（含）*/
	a?: number
}

/**
 * 将整数转为 RGB 格式
 * @param color 要转换的整数
 */
export function intToRGB(color: number): RGB {
	return {
		r: color >> 16,
		g: (color >> 8) & 255,
		b: color & 255
	}
}

/**
 * 将 RGB 转为整数格式
 * @param red 红值，范围为 0 到 255（含）
 * @param green 绿值，范围为 0 到 255（含）
 * @param blue 蓝值，范围为 0 到 255（含）
 */
export function rgbToInt(red: number, green: number, blue: number) {
	return red << 16 | green << 8 | blue
}