import { getPinYinsOfChar } from "./pinyin"

/**
 * 比较两个字符串的拼音顺序
 * @param x 要比较的第一个字符串
 * @param y 要比较的第二个字符串
 * @example ["你", "吃", "饭", "了", "Me"].sort(comparePinYin)
 */
export function comparePinYin(x: string, y: string) {
	const minLength = Math.min(x.length, y.length)
	for (let i = 0; i < minLength; i++) {
		const pinyin1 = getPinYinsOfChar(x.charCodeAt(i))
		const pinyin2 = getPinYinsOfChar(y.charCodeAt(i))
		const pinyinResult = (pinyin1 ? pinyin1[0] : x[i]).localeCompare(pinyin2 ? pinyin2[0] : y[i])
		if (pinyinResult !== 0) {
			return pinyinResult
		}
		const charResult = x[i].localeCompare(y[i])
		if (charResult !== 0) {
			return charResult
		}
	}
	return x.length < y.length ? -1 : x.length > y.length ? 1 : 0
}