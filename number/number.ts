/**
 * 判断指定的对象是否是数字（不含 `NaN`）
 * @param object 要判断的对象
 * @example isNumber(7) // true
*/
export function isNumber(object: any): object is number | Number {
	return (typeof object === "number" || object instanceof Number) && !isNaN(+object)
}

/**
 * 判断数字是否是整数
 * @param number 要判断的数字
 * @example isInteger(7) // true
 */
export function isInteger(number: number) {
	return Math.floor(number) === number
}

/**
 * 获取数字的整数位数
 * @param number 要处理的数字
 * @example getIntegerLength(0) // 1
 * @example getIntegerLength(100) // 3
 */
export function getIntegerLength(number: number) {
	return number === 0 ? 1 : Math.floor(Math.log(number) / Math.log(10)) + 1
}

/**
 * 获取数字的小数位数
 * @param number 要处理的数字
 * @example getDecimalLength(0) // 0
 * @example getDecimalLength(0.1) // 1
 * @example getDecimalLength(0.01) // 2
 */
export function getDecimalLength(number: number) {
	const s = number + ""
	const t = s.indexOf(".") + 1
	return !t ? 0 : s.length - t
}

/**
 * 返回指定范围内的随机整数值
 * @param min 最小的整数值（含）
 * @param max 最大的整数值（不含）
 * @example random(2, 6)
 */
export function random(min: number, max: number) {
	return Math.floor(Math.random() * (max - min) + min)
}

/**
 * 格式化数字为字符串
 * @param number 要处理的数字
 * @param format 格式字符串，其中以下内容会被替换：
 *
 * 元字符 | 意义      | 示例
 * ------|-----------|--------------------
 * 0     | 补0       | 000:012, 0.00: 2.00
 * #     | 补空      | ###:12, 0.##: 2
 * +     | 补正负号  | +0: +0
 * .     | 小数点    | 0.00: 0.00
 * ,     | 追加逗号  | 0.00: 0.00
 *
 * @example formatNumber(1234.678, "￥#,##0.00") // "￥1,234.68"
 * @example formatNumber(1, "000.00") // 001.00
 * @example formatNumber(1.2, "0.00") // 1.20
 * @example formatNumber(1.2, "#.##") // 1.2
 * @example formatNumber(1.235, "#.##") // 1.24
 * @example formatNumber(1235, "###,###") // 1,235
 */
export function formatNumber(number: number, format?: string) {
	if (!format) {
		return number.toString()
	}
	return format.replace(/(\+)?([0#,]+|(?=\.))(\.[0#]*)?/, (_, sign?: string, integer?: string, decimal?: string) => {
		if (number < 0) {
			sign = "-"
			number = -number
		} else {
			sign = sign || ""
		}
		const numString = decimal ? number.toFixed(decimal.length - 1) : number.toString()
		const dot = numString.indexOf(".")
		let decimalPart = dot < 0 ? "" : numString.slice(dot)
		let integerPart = dot < 0 ? numString : numString.slice(0, dot)
		if (decimal) {
			for (let i = decimal.length - 1; i > 0; i--) {
				if (decimal.charAt(i) === "#" && decimalPart.charAt(i) === "0") {
					decimalPart = decimalPart.slice(0, -1)
				} else {
					break
				}
			}
			if (decimalPart.length === 1) {
				decimalPart = ""
			}
		}
		if (integer) {
			if (integerPart === "0") {
				integerPart = ""
			}
			let comma = integer.lastIndexOf(",")
			if (comma >= 0) {
				comma = integer.length - comma - 1
				integer = integer.replace(/,/g, "")
			}
			while (integerPart.length < integer.length) {
				const char = integer.charAt(integer.length - integerPart.length - 1)
				if (char === "#") {
					if (!integerPart) integerPart = "0"
					break
				}
				integerPart = char + integerPart
			}
			if (comma > 0) {
				for (let i = integerPart.length - comma; i > 0; i -= comma) {
					integerPart = integerPart.slice(0, i) + "," + integerPart.slice(i)
				}
			}
		} else {
			integerPart = ""
		}
		return sign + integerPart + decimalPart
	})
}