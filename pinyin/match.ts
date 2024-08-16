import { getPinYinsOfChar } from "./pinyin"

/**
 * 在字符串中执行带拼音的模糊搜索
 * @param input 原字符串内容
 * @param pattern 搜索的内容，可以是拼音全拼、拼音首字母或原始字符串内容
 * @param getPinYins 获取单个字符的拼音的回调函数
 * @returns 返回包含所有匹配索引的数组，如果不匹配则返回 `null`
 */
export function matchPinYin(input: string, pattern: string, getPinYins = getPinYinsOfChar) {
	// TODO: 改进匹配算法为动态规划
	return matchPinYinFrom(input, 0, pattern, 0, getPinYins)
}

/** 表示一个拼音模糊搜索结果，包含所有匹配的索引 */
export interface PinYinMatch extends Array<number> {
	/** 用于确定匹配度的数值，值越高说明越匹配 */
	level: number
}

/** 从指定位置开始的任一处执行搜索 */
function matchPinYinFrom(input: string, inputIndex: number, pattern: string, patternIndex: number, getPinYins: typeof getPinYinsOfChar): PinYinMatch | null {
	for (; inputIndex < input.length; inputIndex++) {
		// ord 只能匹配 order，不能匹配 word，因此如果当前位置是字母的时候，跳过紧跟的其他小写字母
		if (inputIndex) {
			const char = input.charCodeAt(inputIndex)
			if (char <= 122 /* z */ && char >= 97 /* a */) {
				const prevChar = input.charCodeAt(inputIndex - 1)
				if (prevChar <= 122 /* z */ && prevChar >= 97 /* a */ || prevChar <= 90 /* Z */ && prevChar >= 65 /* A */) {
					continue
				}
			} else if (char <= 57 /* 9 */ && char >= 48 /* 0 */) {
				const prevChar = input.charCodeAt(inputIndex - 1)
				if (prevChar <= 57 /* 9 */ && prevChar >= 48 /* 0 */) {
					continue
				}
			}
		}
		const result = matchPinYinAt(input, inputIndex, pattern, patternIndex, getPinYins)
		if (result) {
			inputIndex = result[result.length]
			const nextMatch = matchPinYinFrom(input, result[result.length - 1] + 1, pattern, 0, getPinYins)
			if (nextMatch) {
				result.push(...nextMatch)
				result.level += nextMatch.level
			}
			if (!inputIndex) {
				result.level++
			}
			return result
		}
	}
	return null
}

/** 从指定位置执行搜索 */
function matchPinYinAt(input: string, inputIndex: number, pattern: string, patternIndex: number, getPinYins: typeof getPinYinsOfChar): PinYinMatch | null {
	if (patternIndex === pattern.length) {
		const result = [] as unknown as PinYinMatch
		result.level = 0
		return result
	}
	const inputCode = input.charCodeAt(inputIndex)
	const patternCode = pattern.charCodeAt(patternIndex)
	// 精确匹配
	if (toLower(inputCode) === toLower(patternCode)) {
		const result = matchPinYinAt(input, inputIndex + 1, pattern, patternIndex + 1, getPinYins)
		if (result) {
			result.unshift(inputIndex)
			result.level += pattern.length * (inputCode === patternCode ? 5 : 4)
			return result
		}
	}
	// 小写英文：b 可匹配 extBox 中的 b
	if (inputCode <= 122 /* z */ && inputCode >= 97 /* a */) {
		while (++inputIndex < input.length) {
			let char = input.charCodeAt(inputIndex)
			// 跳过当前字母后的所有小写字母
			if (char >= 97 /* a */ && char <= 122 /* z */) {
				continue
			}
			// 跳过第一个字母和数字前的特殊符号
			while (char !== patternCode && inputIndex < input.length && !(char >= 97 /* a */ && char <= 122 /* z */ || char <= 90 /* Z */ && char >= 65 /* A */ || char <= 57 /* 9 */ && char >= 48 /* 0 */)) {
				char = input.charCodeAt(++inputIndex)
			}
			if (toLower(char) === toLower(patternCode)) {
				const result = matchPinYinAt(input, inputIndex + 1, pattern, patternIndex + 1, getPinYins)
				if (result) {
					result.unshift(inputIndex)
					result.level += pattern.length * 2
					return result
				}
			}
			break
		}
	}
	if (inputIndex === input.length) {
		return null
	}
	// 中文：匹配任一个拼音
	const pinyins = getPinYins(input.charCodeAt(inputIndex))
	if (pinyins) {
		for (const pinyin of pinyins) {
			// 比如 sh 既可以匹配“是”，也可以匹配“时候”
			for (let i = 0; i < pinyin.length && patternIndex + i < pattern.length && pinyin.charCodeAt(i) === pattern.charCodeAt(patternIndex + i); i++) {
				const result = matchPinYinAt(input, inputIndex + 1, pattern, patternIndex + i + 1, getPinYins)
				if (result) {
					result.unshift(inputIndex)
					result.level += pattern.length * 3
					return result
				}
			}
		}
	}
	// 空格：子模式匹配
	if (patternCode === 32 /* */) {
		return matchPinYinFrom(input, inputIndex, pattern, patternIndex + 1, getPinYins)
	}
	return null
}

/** 将英文字母转为小写 */
function toLower(code: number) {
	return code <= 90 && code >= 65 ? code | 32 : code
}