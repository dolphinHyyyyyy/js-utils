/**
 * 隐藏手机号中间部分
 * @param mobile 要脱敏的手机号
 * @param right 右侧保留的字符数
 * @param left 左侧保留的字符数
 * @example maskMobile("13888529999") //"138****9999"
*/
export function maskMobile(mobile: string, right = 4, left = 3) {
	if (mobile && mobile.length == 11) {
		return mobile.slice(0, left) + "*".repeat(11 - right - left) + mobile.slice(11 - right)
	}
	return mobile
}

/**
 * 隐藏邮箱中的用户名部分
 * @param email 要脱敏的邮箱
 * @example maskEmail("bug@tealui.com") //"b**@tealui.com"
 */
export function maskEmail(email: string) {
	const index = email.indexOf("@")
	return index < 0 ? email : email.substring(0, Math.min(index, 1)).padEnd(index, "*") + email.slice(index)
}

/**
 * 隐藏中文姓名的名字部分
 * @param name 要脱敏的姓名
 * @example maskChineseName("小明") //"小*"
 * @example maskChineseName("王大锤") //"王*锤"
 */
export function maskChineseName(name: string) {
	return name.charAt(0) + "*" + (name.length > 2 ? name.slice(name.length - 1) : "")
}

/**
 * 隐藏身份证号的中间部分
 * @param id 要脱敏的身份证
 * @param right 右侧保留的字符数
 * @param left 左侧保留的字符数
 * @example maskChineseID("123456789123456789") //"1234************89"
 */
export function maskChineseID(id: string, right = 2, left = 4) {
	return id.slice(0, left).padEnd(id.length - right, "*") + id.slice(id.length - right)
}

/**
 * 隐藏车牌号的中间部分
 * @param carNumber 要脱敏的身份证
 * @param right 右侧保留的字符数
 * @param left 左侧保留的字符数
 * @example maskChineseCarNumber("浙A00000") //"浙A***00"
 */
export function maskChineseCarNumber(carNumber: string, right = 2, left = 2) {
	return carNumber.slice(0, left).padEnd(carNumber.length - right, "*") + carNumber.slice(carNumber.length - right)
}