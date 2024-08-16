import { chineseCarNumberRegExp, chineseIDRegExp, chinesePostCodeRegExp, chineseRegExp, currencyRegExp, dateRegExp, dateTimeRegExp, digitRegExp, emailRegExp, englishRegExp, identifierRegExp, integerRegExp, ipRegExp, ipv4RegExp, ipv6RegExp, letterOrDigitRegExp, letterRegExp, naturalRegExp, numberRegExp, phoneRegExp, telephoneRegExp, timeRegExp, urlRegExp } from "../regexps/regexps"

/**
 * 判断字符串是否只包含英文字母（a-z）
 * @param value 要判断的字符串
 * @example isLetter("abc") // true
 * @example isLetter("ab0") // false
 */
export function isLetter(value: string) {
	return letterRegExp.test(value)
}

/**
 * 判断字符串是否只包含数字（0-9）
 * @param value 要判断的字符串
 * @example isDigit("1") // true
 * @example isDigit("a") // false
 */
export function isDigit(value: string) {
	return digitRegExp.test(value)
}

/**
 * 判断字符串是否只包含数字（0-9）或英文字母（a-z）
 * @param value 要判断的字符串
 * @example isLetterOrDigit("x09") // true
 * @example isLetterOrDigit("1.2f") // false
 */
export function isLetterOrDigit(value: string) {
	return letterOrDigitRegExp.test(value)
}

/**
 * 判断字符串是否表示一个自然数
 * @param value 要判断的字符串
 * @example isInteger("-45") // true
 * @example isInteger("-45.0") // false
 * @desc 要判断字符串能否转换为整数，可以使用 `!!parseInt("0x00")`
 */
export function isNatural(value: string) {
	return naturalRegExp.test(value)
}

/**
 * 判断字符串是否表示一个整数
 * @param value 要判断的字符串
 * @example isInteger("-45") // true
 * @example isInteger("-45.0") // false
 * @desc 要判断字符串能否转换为整数，可以使用 `!!parseInt("0x00")`
 */
export function isInteger(value: string) {
	return integerRegExp.test(value)
}

/**
 * 判断字符串是否表示一个数字
 * @param value 要判断的字符串
 * @example isNumber("-45.35") // true
 * @example isNumber("0x00") // false
 * @desc 要判断字符串能否转换为数字，可以使用 `!!parseFloat("0x00")`
 */
export function isNumber(value: string) {
	return numberRegExp.test(value)
}

/**
 * 判断字符串是否表示一个日期
 * @param value 要判断的字符串
 * @example isDate("2014/1/1") // true
 * @example isDate("hello") // false
 * @example isDate("2014年1月1日") // false
 */
export function isDate(value: string) {
	return dateRegExp.test(value)
}

/**
 * 判断字符串是否表示一个时间
 * @param value 要判断的字符串
 * @example isTime("10:00:00") // true
 */
export function isTime(value: string) {
	return timeRegExp.test(value)
}

/**
 * 判断字符串是否表示一个日期时间
 * @param value 要判断的字符串
 * @example isDateTime("2014/1/1 10:00:00") // true
 */
export function isDateTime(value: string) {
	return dateTimeRegExp.test(value)
}

/**
 * 判断字符串是否表示一个电子邮箱地址
 * @param value 要判断的字符串
 * @example isEmail("bug@tealui.com") // true
 * @example isEmail("bug@@tealui.com") // false
 */
export function isEmail(value: string) {
	return emailRegExp.test(value)
}

/**
 * 判断字符串是否表示一个 IP 地址
 * @param value 要判断的字符串
 * @example isIP("127.0.0.1") // true
 */
export function isIP(value: string) {
	return ipRegExp.test(value)
}

/**
 * 判断字符串是否表示一个 IPv4 地址
 * @param value 要判断的字符串
 * @example isIPv4("127.0.0.1") // true
 */
export function isIPv4(value: string) {
	return ipv4RegExp.test(value)
}

/**
 * 判断字符串是否表示一个 IPv6 地址
 * @param value 要判断的字符串
 * @example isIPv6("::1") // true
 */
export function isIPv6(value: string) {
	return ipv6RegExp.test(value)
}

/**
 * 判断字符串是否表示一个网址
 * @param value 要判断的字符串
 * @example isUrl("http://tealui.com/") // true
 */
export function isURL(value: string) {
	return urlRegExp.test(value)
}

/**
 * 判断字符串是否表示一个 JavaScript 标识符
 * @param value 要判断的字符串
 * @example isIdentifier("x09") // true
 */
export function isIdentifier(value: string) {
	return identifierRegExp.test(value)
}

/**
 * 判断字符串是否表示一个金额（必须是正数）
 * @param value 要判断的字符串
 * @example isCurrency("1") // true
 */
export function isCurrency(value: string) {
	return currencyRegExp.test(value)
}

/**
 * 判断字符串是否表示一个手机号码
 * @param value 要判断的字符串
 * @example isPhone("+8613211111111") // true
 */
export function isPhone(value: string) {
	return phoneRegExp.test(value)
}

/**
 * 判断字符串是否表示一个电话号码（400 电话和国际电话除外）
 * @param value 要判断的字符串
 * @example isTelephone("010-86000000") // true
 */
export function isTelephone(value: string) {
	return telephoneRegExp.test(value)
}

/**
 * 判断字符串是否只包含英文
 * @param value 要判断的字符串
 * @example isEnglish("Hello") // true
 */
export function isEnglish(value: string) {
	return englishRegExp.test(value)
}

/**
 * 判断字符串是否表示一个邮编号码
 * @param value 要判断的字符串
 * @example isPostCode("310000") // true
 */
export function isChinesePostCode(value: string) {
	return chinesePostCodeRegExp.test(value)
}

/**
 * 判断字符串是否只包含中文
 * @param value 要判断的字符串
 * @example isChinese("你好") // true
 */
export function isChinese(value: string) {
	return chineseRegExp.test(value)
}

/**
 * 判断字符串是否表示一个身份证号
 * @param value 要判断的字符串
 * @example isChineseID("152500198909267865") // true
 */
export function isChineseID(value: string) {
	return chineseIDRegExp.test(value)
}

/**
 * 判断字符串是否表示一个身份证号
 * @param value 要判断的字符串
 * @example isChineseID("152500198909267865") // true
 */
export function isChineseCarNumber(value: string) {
	return chineseCarNumberRegExp.test(value)
}

/**
 * 获取密码的复杂度
 * @param value 要测试的密码
 * @returns 返回一个整数，值越大表示复杂度越高，具体范围如下：
 * - < 0：太简单（如 123456）
 * - = 0：简单（如生日：901206）
 * - \> 0：复杂（如 abc123）
 * - \>= 3：很复杂（如 a1b2c3）
 * @example getComplexityOfPassword("123456") // -1
 */
export function getComplexityOfPassword(value: string) {
	value = value.replace(/1q2w(?:3e(?:4r(?:5t)?)?)?/, "1")
		.replace(/(?:qwe(?:rty(?:ui)?)?)+/, "q")
		.replace(/(?:asd(?:fgh(?:jk)?)?)+/, "a")
		.replace(/1?qaz(?:1?qaz|2?wsx)?/, "q")
		.replace(/(?:147|258|369)+/, "1")
		.replace(/[a-zA-Z]+123/, "1")
		.replace(/(?:123){2,}/, "1")
		.replace(/7891?0/, "789")
		.replace(/\.1415/, "5")
	let level = Math.floor(value.length / 10)
	let equalCount = 0
	let chainCount = 0
	let oldCharCode: number | undefined
	let oldCharType: 0 | 1 | 2 | 3 | undefined
	for (let i = 0; i < value.length; i++) {
		const newCharCode = value.charCodeAt(i)
		const newCharType = newCharCode >= 48 && newCharCode <= 57 ? 0 : newCharCode >= 97 && newCharCode <= 122 ? 1 : newCharCode >= 65 && newCharCode <= 90 ? 2 : 3
		if (i) {
			if (oldCharType !== newCharType) {
				level++
			} else if (Math.abs(newCharCode - oldCharCode!) <= 1) {
				if (newCharCode === oldCharCode) {
					equalCount++
				} else {
					chainCount++
				}
			}
		}
		oldCharCode = newCharCode
		oldCharType = newCharType
	}
	return level - (value.length - equalCount <= 1 ? 2 : value.length - chainCount <= 1 ? 1 : 0)
}