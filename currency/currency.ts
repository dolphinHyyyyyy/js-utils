/**
 * 精确计算两个货币的和
 * @param left 要计算的左值，最大不得超过 1 万亿，最多只能有两位小数
 * @param right 要计算的右值，最大不得超过 1 万亿，最多只能有两位小数
 * @example add(86.24, 0.1) // 86.34
 */
export function add(left: number, right: number) {
	return ((left + right) * 100) / 100
}

/**
 * 精确计算两个货币的差
 * @param left 要计算的左值，最大不得超过 1 万亿，最多只能有两位小数
 * @param right 要计算的右值，最大不得超过 1 万亿，最多只能有两位小数
 * @example subtract(7, 0.8) // 6.2
 */
export function subtract(left: number, right: number) {
	return ((left - right) * 100) / 100
}

/**
 * 精确计算两个货币的积
 * @param left 要计算的左值，最大不得超过 10 亿，最多只能有两位小数
 * @param right 要计算的右值，最大不得超过 10 亿，最多只能有两位小数
 * @example multiply(7, 0.8) // 5.6
 */
export function multiply(left: number, right: number) {
	return ((left * 1000) * (right * 1000)) / 1000000
}

/**
 * 精确计算两个货币的商
 * @param left 要计算的左值，最大不得超过 10 亿，最多只能有两位小数
 * @param right 要计算的右值，最大不得超过 10 亿，最多只能有两位小数
 * @example div(7, 0.8) // 8.75
 */
export function divide(left: number, right: number) {

	return (left * 1000 / right) / 1000
}

/**
 * 保留小数点后两位四舍五入
 * @param value 要计算的货币值。最大不得超过 10 亿
 * @example round(86.245) // 86.25
 */
export function round(value: number) {
	return Math.round(value * 100) / 100
}

/**
 * 格式化货币为带“,”的字符串（如“86,234.25”），小数保留两位小数四舍五入
 * @param value 要格式化的货币值，最大不得超过 10 亿
 * @example formatCurrency(86234.245) // "86,234.25"
 */
export function formatCurrency(value: number) {
	const s = value.toFixed(2).replace(/(\.0)?0$/, "")

	return s
	// const t = Math.round(Math.abs(value) * 100)
	// const r = Math.floor(value) + ""
	// const c = (r.length - 1) % 3 + (value < 0 ? 2 : 1)
	// return r.substring(0, c) + r.substring(c) + (t % 100 === 0 ? "" : "." + Math.floor(t / 10) % 10 + (t % 10 || ""))
}

/**
 * 格式化货币为带“,”的字符串（如“86,234.25”），小数保留两位小数四舍五入
 * @param value 要格式化的货币值，最大不得超过 10 亿
 * @example formatCurrency(86234.245) // "86,234.25"
 */
export function formatCurrencySeperated(value: number) {
	const t = Math.round(Math.abs(value) * 100)
	const r = Math.floor(value) + ""
	const c = (r.length - 1) % 3 + (value < 0 ? 2 : 1)
	return r.substring(0, c) + r.substring(c).replace(/(\d{3})/g, ",$1") + (t % 100 === 0 ? "" : "." + Math.floor(t / 10) % 10 + (t % 10 || ""))
}

/**
 * 格式化货币为中文大写格式（如壹佰贰拾元）
 * @param value 要格式化的货币值，最大不能超过 9 亿
 * @example formatCurrencyToChinese(10000000) // "壹仟万元"
 */
export function formatCurrencyToTranditionalChinese(value: number) {
	const digits = "零壹贰叁肆伍陆柒捌玖"
	const units0 = "元万亿"
	const units1 = ["", "拾", "佰", "仟"]
	const neg = value < 0
	if (neg) value = -value
	if (value < 0.005) return "零元"
	let t = Math.round(value * 100) % 100
	let s = t ? (t >= 10 ? digits.charAt(Math.floor(t / 10)) + "角" : "") + (t % 10 ? digits.charAt(t % 10) + "分" : "") : ""
	t = Math.floor(value)
	for (let i = 0; i < units0.length && t > 0; i++) {
		let p = ""
		for (let j = 0; j < units1.length && t > 0; j++) {
			p = digits.charAt(t % 10) + units1[j] + p
			t = Math.floor(t / 10)
		}
		s = (p.replace(/(零.)*零$/, "") || "零") + units0.charAt(i) + s
	}
	return (neg ? "负" : "") + s.replace(/(零.)*零元/, "元").replace(/(零.)+/g, "零")
}