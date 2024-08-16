/**
 * 判断数值是否包含指定的标记位
 * @param value 要判断的数值
 * @param flag 要判断的标记位
 * @example
 * const Colors = {
 *     red: 1 << 1,
 *     yellow: 1 << 2,
 *     blue: 1 << 3,
 * }
 * const orange = Colors.red | Colors.yellow
 * hasFlag(orange, Colors.red) // true
 */
export function hasFlag(value: number, flag: number) {
	return (value & flag) === flag
}

/**
 * 设置一个标记位
 * @param value 要判断的数值
 * @param flag 要设置的标记位
 * @param set 如果为 `true` 则添加标记位，否则删除标记位
 * @returns 返回更新后的新数值
 * @example
 * const Colors = {
 *     red: 1 << 1,
 *     yellow: 1 << 2,
 *     blue: 1 << 3,
 * }
 * let color = Colors.red
 * color = setFlag(color, Colors.yellow, true) // Colors.red | Colors.yellow
 */
export function setFlag(value: number, flag: number, set: boolean) {
	return set ? value | flag : value & ~flag
}

/**
 * 根据数值返回对应的标记位名，如果数值是多个标记位的组合，则返回以“|”分割的所有标记名，如果找不到匹配的标记名则返回 `undefined`
 * @param flags 包含所有标记位的枚举对象
 * @param value 要计算的数值
 * @example
 * const Colors = {
 *     red: 1 << 1,
 *     yellow: 1 << 2,
 *     blue: 1 << 3,
 * }
 * formatFlags(Colors, Colors.yellow) // "yellow"
 * formatFlags(Colors, Colors.yellow | Colors.red) // "red|yellow"
 */
export function formatFlags(flags: { [key: string]: any }, value: number) {
	let result: string | undefined
	for (const key in flags) {
		if (hasFlag(value, flags[key])) {
			if (result) {
				result += "|"
			} else {
				result = ""
			}
			result += key
		}
	}
	return result
}

/**
 * 从枚举字符串获取枚举值
 * @param flags 包含所有标记位的枚举对象
 * @param value 要解析的字符串
 * @example
 * const Colors = {
 *     red: 1 << 1,
 *     yellow: 1 << 2,
 *     blue: 1 << 3,
 * }
 * parseFlags(Colors, "red|yellow") // Colors.red | Colors.yellow
 */
export function parseFlags(flags: { [key: string]: any }, value: string) {
	let result = 0
	for (const name of value.split(/\s*[\|,]\s*/)) {
		result |= flags[name]
	}
	return result
}

/**
 * 获取所有标记名
 * @param flags 包含所有标记位的枚举对象
 * @example
 * const Colors = {
 *     red: 1 << 1,
 *     yellow: 1 << 2,
 *     blue: 1 << 3,
 * }
 * getFlagNames(Colors) // ["red", "yellow", "blue"]
 */
export function getFlagNames(flags: { [key: string]: any }) {
	const result: string[] = []
	for (const key in flags) {
		if (typeof flags[key] === "number") {
			result.push(key)
		}
	}
	return result
}