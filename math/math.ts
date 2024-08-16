/**
 * 保留指定小数位数四舍五入
 * @param number 数字
 * @param decimals 要保留的小数位数
 * @example round(1.25, 1) // 1.3
 */
export function round(number: number, decimals?: number) {
	if (decimals) {
		decimals = 10 ** decimals
		return Math.round(number * decimals) / decimals
	}
	return Math.round(number)
}

/**
 * 计算不小于指定数的最小值（天花板数）
 * @param number 数字
 * @param decimals 要保留的小数位数
 * @example ceil(1.25, 1) // 1.3
 */
export function ceil(number: number, decimals?: number) {
	if (decimals) {
		decimals = 10 ** decimals
		return Math.ceil(number * decimals) / decimals
	}
	return Math.ceil(number)
}

/**
 * 计算不大于指定数的最大值（地板数）
 * @param number 数字
 * @param decimals 要保留的小数位数
 * @example floor(1.25, 1) // 1.2
 */
export function floor(number: number, decimals?: number) {
	if (decimals) {
		decimals = 10 ** decimals
		return Math.floor(number * decimals) / decimals
	}
	return Math.floor(number)
}

/**
 * 确保指定数值在指定区间内
 * @param number 数字
 * @param min 允许的最小值（含）
 * @param max 允许的最大值（含）
 * @returns 如果数字小于最小值，则返回最小值，如果数字大于最大值，则返回最大值，否则返回数值本身
 * @example limit(1, 2, 6) // 2
 */
export function limit(number: number, min: number, max: number) {
	return Math.min(max, Math.max(min, number))
}

/**
 * 判断两个数字是否近似相等
 * @param left 要判断的左值
 * @param right 要判断的右值
 * @param epsilon 允许的最大误差
 * @example approximatelyEqual(0.1 + 0.2, 0.3) // true
 */
export function approximatelyEqual(left: number, right: number, epsilon = 0.001) {
	return Math.abs(left - right) < epsilon
}

/**
 * 计算二项式系数
 * @param n 要计算的自然数
 * @param k 要计算的项数
 * @example binomialCoefficient(8, 2) // 28
 */
export function binomialCoefficient(n: number, k: number) {
	if (Number.isNaN(n) || Number.isNaN(k)) return NaN
	if (k < 0 || k > n) return 0
	if (k === 0 || k === n) return 1
	if (k === 1 || k === n - 1) return n
	if (n - k < k) k = n - k
	let res = n
	for (let i = 2; i <= k; i++) {
		res *= (n - i + 1) / i
	}
	return Math.round(res)
}

/**
 * 基于 ELO 算法计算所有玩家的最终分值
 * @param ratings 所有玩家的当前分值，赢方应位于输方之前
 * @param factor 分配指数
 * @example elo([1200, 1200]) // [1216, 1184]
 */
export function elo(ratings: number[], factor = 32) {
	if (ratings.length === 2) {
		const [a, b] = ratings
		const delta = (b - a) / 400
		return [
			a + factor - factor / (1 + 10 ** delta),
			b - factor / (1 + 10 ** -delta)
		]
	}
	for (let i = 0; i < ratings.length; i++) {
		for (let j = i; ++j < ratings.length;) {
			[ratings[i], ratings[j]] = elo([ratings[i], ratings[j]], factor)
		}
	}
	return ratings
}

/**
 * 判断数值是否在指定的区间
 * @param number 要判断的数值
 * @param start 要判断的区间开始
 * @param end 要判断的区间结束（不含）
 */
export function inRange(number: number, start: number, end: number) {
	return start <= end ? number >= start && number < end : number >= end && number < start
}

/**
 * 计算两个数的最大公约数
 * @param left 要计算的左值
 * @param right 要计算的右值
 * @example gcd(8, 36) // 4
 */
export function gcd(left: number, right: number): number {
	return right ? gcd(right, left % right) : left
}

/**
* 计算两个数的最小公倍数
* @param left 要计算的左值
* @param right 要计算的右值
* @example gcd(8, 36) // 72
*/
export function lcm(left: number, right: number) {
	return left * right / gcd(left, right)
}

/**
 * 使用 Luhn 算法检验指定的数值是否正确
 * @param number 要判断的数值
 * @example checkLuhn("4485275742308327") // true
 * @example checkLuhn(6011329933655299) //  false
 * @example checkLuhn(123456789) // false
 */
export function checkLuhn(number: number | string) {
	const arr = (number + "").split("").reverse().map(x => parseInt(x))
	const lastDigit = arr.splice(0, 1)[0]
	return (arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0) + lastDigit) % 10 === 0
}

/**
 * 判断指定的数字是否为质数
 * @param number 要判断的数字
 * @example isPrime(11) // true
 * @example isPrime(8) // false
 */
export function isPrime(number: number) {
	const boundary = Math.floor(Math.sqrt(number))
	for (let i = 2; i <= boundary; i++) {
		if (number % i === 0) {
			return false
		}
	}
	return number >= 2
}

/**
 * 计算不小于指定数的最小质数
 * @param number 要计算的数值
 */
export function nextPrime(number: number) {
	while (true) {
		if (isPrime(++number)) {
			return number
		}
	}
}