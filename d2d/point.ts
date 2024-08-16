/** 表示一个坐标 */
export interface Point {
	/** 相对于屏幕左上角的水平距离（单位为像素）*/
	x: number
	/** 相对于屏幕左上角的垂直距离（单位为像素）*/
	y: number
}

/** 表示一个矩形区域 */
export interface Rect extends Point {
	/** 宽度（单位为像素）*/
	width: number
	/** 高度（单位为像素）*/
	height: number
}

/**
 * 计算两个点的距离
 * @param x0 第一个点的水平坐标
 * @param y0 第一个点的水平坐标
 * @param x1 第二个点的水平坐标
 * @param y1 第二个点的水平坐标
 */
export function distance(x0: number, y0: number, x1: number, y1: number) {
	return Math.hypot(x1 - x0, y1 - y0)
}

/**
 * 判断一个点是否在指定的矩形区域（含边框）内
 * @param rect 矩形区域
 * @param point 要判断的点
 * @example inRect({x: 0, y: 0, width: 10, height: 10}, {x: 20, y: 20}) // false
 * @example inRect({x: 0, y: 0, width: 10, height: 10}, {x: 5, y: 5}) // true
 * @example inRect({x: 0, y: 0, width: 10, height: 10}, {x: 0, y: 0}) // true
 */
export function inRect(rect: Rect, point: Point) {
	return point.x >= rect.x && point.x <= rect.x + rect.width && point.y >= rect.y && point.y <= rect.y + rect.height
}

/**
 * 判断一个点是否在指定的矩形区域的边框上
 * @param rect 矩形区域
 * @param point 要判断的点
 * @example onRect({x: 0, y: 0, width: 10, height: 10}, {x: 20,y: 20}) // false
 * @example onRect({x: 0, y: 0, width: 10, height: 10}, {x: 5, y: 5}) // false
 * @example onRect({x: 0, y: 0, width: 10, height: 10}, {x: 0, y: 0}) // true
 * @example onRect({x: 0, y: 0, width: 10, height: 10}, {x: 0, y: 3}) // true
 */
export function onRect(rect: Rect, point: Point) {
	return point.y >= rect.y && point.y <= rect.y + rect.height && (point.x === rect.x || point.x === rect.x + rect.width) || point.x >= rect.x && point.x <= rect.x + rect.width && (point.y === rect.y || point.y === rect.y + rect.height)
}

/** 表示一个正圆区域 */
export interface Circle extends Point {
	/** 圆型的半径（单位：像素）*/
	r: number
}

/**
 * 判断一个点是否在指定的正圆区域（含边框）内
 * @param circle 要判断的正圆区域
 * @param point 要判断的点
 * @example inCircle({x: 2, y: 2, r: 1}, {x: 2, y: 2}) // true
 * @example inCircle({x: 2, y: 2, r: 1}, {x: 3, y: 2}) // true
 * @example inCircle({x: 2, y: 2, r: 1}, {x: 4, y: 2}) // false
 * @example inCircle({x: 2, y: 2, r: 1}, {x: 3, y: 3}) // false
 */
export function inCircle(circle: Circle, point: Point) {
	return (circle.x - point.x) ** 2 + (circle.y - point.y) ** 2 <= circle.r ** 2
}

/**
 * 判断一个点是否在指定的正圆区域边框上
 * @param circle 要判断的正圆区域
 * @param point 要判断的点
 * @example onCircle({x: 2, y: 2, r: 1}, {x: 3, y: 2}) // true
 * @example onCircle({x: 2, y: 2, r: 1}, {x: 2, y: 2}) // false
 * @example onCircle({x: 2, y: 2, r: 1}, {x: 4, y: 2}) // false
 * @example onCircle({x: 2, y: 2, r: 1}, {x: 3, y: 3}) // false
 */
export function onCircle(circle: Circle, point: Point) {
	return (circle.x - point.x) ** 2 + (circle.y - point.y) ** 2 === circle.r ** 2
}