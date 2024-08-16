/** 随机生成一个新的唯一识别码（UUID）v6（小写）*/
export function uuid() {
	const array = new Uint8Array(16)
	crypto.getRandomValues(array)
	let result = ""
	for (let i = 0; i < 16; i++) {
		const char = array[i].toString(16)
		if (i === 6) {
			result += "-6" + char.charAt(0)
		} else if (i === 8) {
			result += "-a" + char.charAt(0)
		} else {
			if (i === 4 || i === 10) {
				result += "-"
			}
			result += char.length < 2 ? "0" + char : char
		}
	}
	return result
}

/** 表示空的唯一识别码（UUID） */
export const emptyUUID = "00000000-0000-0000-0000-000000000000"

/**
 * 判断指定的字符串是否为合法的唯一识别码（UUID）
 * @param value 要检测的字符串
 */
export function isUUID(value: string) {
	return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-6][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
}