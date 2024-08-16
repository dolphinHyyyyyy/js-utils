import { compareYear } from "../date/date"

/**
 * 解析 18 位中国身份证号的信息
 * @param idNumber 要解析的身份证号
 * @returns 返回一个身份证信息对象
 * @description > [!] 本函数只验证身份证的数值特征，并不能判定身份证是否真实有效
 * @example parseChineseID("152500198909267865")
 */
export function parseChineseID(idNumber: string) {
	const province = +idNumber.substring(0, 2)
	const city = +idNumber.substring(2, 4)
	const county = +idNumber.substring(4, 6)

	// 身份证第 6 - 13 位表示生日
	const birthdayYear = +idNumber.substring(6, 10)
	const birthdayMonth = +idNumber.substring(10, 12) - 1
	const birthdayDay = +idNumber.substring(12, 14)
	const birthday = new Date(birthdayYear, birthdayMonth, birthdayDay)

	// 身份证第 17 位表示检验码
	let valid = province > 10 && city >= 0 && county >= 0 &&
		birthday.getFullYear() === birthdayYear &&
		birthday.getMonth() === birthdayMonth &&
		birthday.getDate() === birthdayDay
	if (valid) {
		let code = 0
		for (let i = 0; i < 18; i++) {
			const bit = idNumber.charCodeAt(17 - i)
			code += ((1 << i) % 11) * (!i && (bit | 32) === 120 /* x */ ? 10 : bit > 47 && bit < 58 ? bit - 48 : NaN)
		}
		valid = code % 11 === 1
	}

	// 身份证第 16 位表示性别
	return {
		/** 判断身份证是否合法 */
		valid,
		/** 获取身份证的省份（自治区、直辖市）编码 */
		province,
		/** 获取身份证的地级市（州、盟）编码 */
		city,
		/** 获取身份证的县级市（区、旗）编码 */
		county,
		/** 获取身份证的生日 */
		birthday,
		/** 获取身份证的性别，`1` 表示男, `0` 表示女 */
		sex: idNumber.charCodeAt(16) % 2 as ChineseIDSex
	}
}

/** 表示身份证上的省份（自治区、直辖市）编码 */
export const enum ChineseIDProvince {
	北京 = 11,
	天津 = 12,
	河北 = 13,
	山西 = 14,
	内蒙古 = 15,
	辽宁 = 21,
	吉林 = 22,
	黑龙江 = 23,
	上海 = 31,
	江苏 = 32,
	浙江 = 33,
	安徽 = 34,
	福建 = 35,
	江西 = 36,
	山东 = 37,
	河南 = 41,
	湖北 = 42,
	湖南 = 43,
	广东 = 44,
	广西 = 45,
	海南 = 46,
	重庆 = 50,
	四川 = 51,
	贵州 = 52,
	云南 = 53,
	西藏 = 54,
	陕西 = 61,
	甘肃 = 62,
	青海 = 63,
	宁夏 = 64,
	新疆 = 65,
	台湾 = 71,
	香港 = 81,
	澳门 = 82,
	外籍 = 91
}

/** 表示身份证上的性别 */
export const enum ChineseIDSex {
	/** 女性 */
	famale = 0,
	/** 男性 */
	male = 1,
}

/**
 * 从 18 位身份证号提取周岁
 * @param idNumber 要解析的身份证号
 * @param now 当前时间
 * @returns 返回周岁，如果无法读取身份证号的生日信息则返回 NaN
 * @example getAgeFromChineseId("152500198909267865")
 */
export function getAgeFromChineseId(idNumber: string, now = new Date()) {
	const birthdayYear = +idNumber.substring(6, 10)
	const birthdayMonth = +idNumber.substring(10, 12) - 1
	const birthdayDay = +idNumber.substring(12, 14)
	return compareYear(now, new Date(birthdayYear, birthdayMonth, birthdayDay))
}