import { inRect, Point, Rect } from "./point"

/**
 * 判断两个矩形是否存在公共区域
 * @param from 要判断的第一个矩形
 * @param to 要判断的第二个矩形
 */
export function hasIntersectRect(from: Rect, to: Rect) {
	if (from.x + from.width <= to.x || from.x >= to.x + to.width) {
		return false
	}
	if (from.y + from.height <= to.y || from.y >= to.y + to.height) {
		return false
	}
	return true
}

/**
 * 判断第一个矩形是否完全包含第二个矩形
 * @param parent 要判断的第一个矩形
 * @param child 要判断的第二个矩形
 */
export function containsRect(parent: Rect, child: Rect) {
	if (parent.x > child.x || parent.x + parent.width < child.x + child.width) {
		return false
	}
	if (parent.y > child.y || parent.y + parent.height < child.y + child.height) {
		return false
	}
	return true
}

/**
 * 计算两个区域的并集部分
 * @param left 要计算的第一个区域
 * @param right 要计算的第二个区域
 * @returns 返回并集区域。如果区域无交集则返回长宽为 0 的区域
 * @example unionRect({x: 0, y: 0, width: 10, height: 10}, {x: 5, y: 5, width: 10, height: 10}) // {x: 0, y: 0, width: 15, height: 15}
 * @example unionRect({x: 0, y: 0, width: 10, height: 10}, {x: 5, y: 5, width: 2, height: 2}) // {x: 0, y: 0, width: 10, height: 10}
 * @example unionRect({x: 0, y: 0, width: 10, height: 10}, {x: 15, y: 15, width: 10, height: 10}) // {x: 0, y: 0, width: 25, height: 25}
 */
export function unionRect(left: Rect, right: Rect) {
	const result = {
		x: left.x < right.x ? left.x : right.x,
		y: left.y < right.y ? left.y : right.y
	} as Rect
	result.width = Math.max(left.x + left.width, right.x + right.width) - result.x
	result.height = Math.max(left.y + left.height, right.y + right.height) - result.y
	return result
}

/**
 * 计算两个区域的交集部分，如果区域无交集则返回长宽为 0 的区域
 * @param left 要计算的左值
 * @param right 要计算的右值
 * @example intersectRect({x: 0, y: 0, width: 10, height: 10}, {x: 5, y: 5, width: 10, height: 10}) // {x: 5, y: 5, width: 5, height: 5}
 * @example intersectRect({x: 0, y: 0, width: 10, height: 10}, {x: 11, y: 11, width: 10, height: 10}) // {x: 0, y: 0, width: 0, height: 0}
 */
export function intersectRect(left: Rect, right: Rect): Rect {
	if (inRect(right, left)) {
		const t = left
		left = right
		right = t
	}
	if (inRect(left, right)) {
		return {
			x: right.x,
			y: right.y,
			width: Math.min(left.x + left.width, right.x + right.width) - right.x,
			height: Math.min(left.y + left.height, right.y + right.height) - right.y
		}
	}
	return {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	}
}

/**
 * 从第一个区域减去第二个区域的部分
 * @param parent 要计算的第一个区域
 * @param child 要计算的第二个区域
 * @returns 返回新区域
 */
export function subtractRect(parent: Rect, child: Rect) {
	const left = Math.max(parent.x, child.x + child.width)
	const right = Math.min(parent.x + parent.width, child.x)
	const top = Math.max(parent.y, child.y + child.height)
	const bottom = Math.min(parent.y + parent.height, child.y)
	return {
		x: left,
		y: top,
		width: Math.max(right - left, 0),
		height: Math.max(bottom - top, 0)
	} as Rect
}

/**
 * 计算区域偏移指定距离后的新区域
 * @param rect 区域
 * @param offset 要偏移的距离
 * @example translateRect({x: 0, y: 0, width: 10, height: 10}, {x: 10, y: 20}) // {x: 10, y: 20, width: 10, height: 10}
 */
export function translateRect(rect: Rect, offset: Point) {
	rect.x += offset.x
	rect.y += offset.y
	return rect
}