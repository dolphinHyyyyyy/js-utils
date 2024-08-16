/**
 * 判断指定的对象是否是字符串
 * @param object 要判断的对象
 * @example isString("") // true
 */
export function isString(object: any): object is string | String {
	return typeof object === "string" || object instanceof String
}

/**
 * 统计字符串内某个子字符串的出现次数
 * @param string 要处理的字符串
 * @param substring 要统计的子字符串
 * @example count("xyz", "x") // 1
 */
export function count(string: string, substring: string) {
	if (!substring) {
		return string.length
	}
	let result = 0
	let left = 0
	while (left < string.length) {
		const index = string.indexOf(substring, left)
		if (index < 0) {
			break
		}
		result++
		left = index + substring.length
	}
	return result
}

/**
 * 计算字符串按字节计算的长度（英文算一个字符，中文算两个个字符）
 * @param string 要处理的字符串
 * @example byteLength("i中国") // 5
 */
export function byteLength(string: string) {
	const arr = string.match(/[^\x00-\xff]/g)
	return string.length + (arr ? arr.length : 0)
}

/**
 * 判断字符串中是否包含指定的单词
 * @param string 要处理的字符串
 * @param word 要判断的单词
 * @example containsWord("xyz xy", "x") // false
 */
export function containsWord(string: string, word: string) {
	return string.split(/[^a-zA-Z-]+/).indexOf(word) >= 0
}

/**
 * 获取字符串中所有单词组成的数组
 * @param string 要处理的字符串
 * @example words("fontSize") // ["fontSize"]
 */
export function words(string: string) {
	return string.split(/[^a-zA-Z-]+/).filter(Boolean)
}

/**
 * 判断字符串是否是全小写
 * @param string 要处理的字符串
 * @example isLowerCase("qwert") // true
 */
export function isLowerCase(string: string) {
	return string === string.toLowerCase()
}

/**
 * 判断字符串是否是全大写
 * @param string 要处理的字符串
 * @example isUpperCase("qwert") // false
 */
export function isUpperCase(string: string) {
	return string === string.toUpperCase()
}

/**
 * 将字符串首字母大写
 * @param string 要处理的字符串
 * @example capitalize("qwert") // "Qwert"
 */
export function capitalize(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * 将字符串首字母小写
 * @param string 要处理的字符串
 * @example uncapitalize("Qwert") // "qwert"
 */
export function uncapitalize(string: string) {
	return string?.charAt(0).toLowerCase() + string.slice(1)
}

/**
 * 将字符串内的每个单次首字母大写
 * @param string 要处理的字符串
 * @example capitalizeWords("hi go") // "Hi Go"
 */
export function capitalizeWords(string: string) {
	return string.replace(/\b[a-z]/g, char => char.toUpperCase())
}

/**
 * 将字符串转为骆驼格式（如 `fontSize`）
 * @param string 要处理的字符串
 * @example toCamelCase("font-size") // "fontSize"
 */
export function toCamelCase(string: string) {
	return string.replace(/-(\w)/g, (_, word: string) => word.toUpperCase())
}

/**
 * 将字符串转为横线格式（如 `font-size`）
 * @param string 要处理的字符串
 * @example toKebabCase("fontSize") // "font-size"
 */
export function toKebabCase(string: string) {
	return string.replace(/[A-Z]/g, source => `-${source.toLowerCase()}`)
}

/**
 * 将字符串按指定的分隔符分成多个部分
 * @param string 要处理的字符串
 * @param seperator 要使用的分隔符
 * @param maxCount 最多允许分割的部分数，如果超过限制则字符串剩下的内容全部划归最后一部分
 */
export function split(string: string, seperator: string | RegExp, maxCount = Infinity) {
	const result: string[] = []
	if (typeof seperator === "string") {
		let left = 0
		while (--maxCount > 0) {
			const index = string.indexOf(seperator, left)
			result.push(index < 0 ? string.substring(left) : string.substring(left, index))
			if (index < 0) {
				return result
			}
			left = index + seperator.length
		}
		result.push(string.substring(left))
	} else {
		while (--maxCount > 0) {
			const match = seperator.exec(string)
			if (!match) {
				break
			}
			result.push(string.substring(0, match.index))
			string = string.substring(match.index + match[0].length)
		}
		result.push(string)
	}
	return result
}

/**
 * 将字符串拆为多行
 * @param string 要处理的字符串
 * @example splitLines("x\ny") // ["x", "y"]
 */
export function splitLines(string: string) {
	return string.split(/\r?\n|\r/)
}

/**
 * 按长度分割字符串
 * @param string 要处理的字符串
 * @param maxLength 每个部分允许的最大长度
 */
export function splitByLength(string: string, maxLength: number) {
	const result: string[] = []
	while (string.length >= maxLength) {
		result.push(string.substring(0, maxLength))
		string = string.slice(maxLength)
	}
	if (string) result.push(string)
	return result
}

/**
 * 获取字符串左边指定长度的子字符串
 * @param string 要处理的字符串
 * @param length 要获取的子字符串长度
 * @example start("abcde", 3) // "abc"
 */
export function start(string: string, length: number) {
	return string.substring(0, length)
}

/**
 * 获取字符串右边指定长度的子字符串
 * @param string 要处理的字符串
 * @param length 要获取的子字符串长度
 * @example end("abcde", 3) // "cde"
 */
export function end(string: string, length: number) {
	return string.substring(string.length - length)
}

/**
 * 截断字符串超出长度的部分
 * @param string 要处理的字符串
 * @param length 最终期望的最大长度
 * @param append 如果字符串超出长度则自动追加的符号
 * @example truncate("1234567", 6) // "123..."
 * @example truncate("1234567", 9) // "1234567"
 */
export function truncate(string: string, length: number, append = "...") {
	return string ? string.length > length ? string.substring(0, length - append.length) + append : string : ""
}

/**
 * 截断字符串超出长度的部分，并确保不强制截断单词
 * @param string 要处理的字符串
 * @param length 最终期望的最大长度
 * @param append 如果字符串超出长度则自动追加的符号
 * @example truncateByWord("abc def", 6) //   "abc..."
 */
export function truncateByWord(string: string, length: number, append = "...") {
	if (string && string.length > length) {
		length -= append.length
		if (/[\x00-\xff]/.test(string.charAt(length))) {
			const p = string.lastIndexOf(" ", length)
			if (p !== -1) {
				length = p
			}
		}
		string = string.substring(0, length) + append
	}
	return string || ""
}

/**
 * 在每行添加缩进字符
 * @param string 要处理的字符串
 * @param count 缩进数
 * @param indentChar 用于缩进的字符
 * @example indent("x\ny") // "  x\n  y"
 * @example indent("x\ny", 2, "_") // "__x\n__y"
 */
export function indent(string: string, count = 1, indentChar = "  ") {
	return string.replace(/^/gm, indentChar.repeat(count))
}

/**
 * 删除每行开头的缩进字符
 * @param string 要处理的字符串
 * @param count 缩进数，默认为可删除的最大缩进数
 * @param tabSize 一个 TAB 字符对应的缩进数
 * @example unindent("  x\n  y") // "x\ny"
 */
export function unindent(string: string, count?: number, tabSize = 2) {
	const lines = string.split(/[\r\n]/)
	if (count === undefined) {
		count = Infinity
		for (const line of lines) {
			const match = /^\s+/.exec(line)
			count = Math.min(count, match?.[0].length ?? 0)
		}
	}
	if (count > 0) {
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i]
			const indent = /^\s+/.exec(line)?.[0] ?? ""
			lines[i] = indent.replace(/\t/g, " ".repeat(tabSize)).slice(count) + line.slice(indent.length)
		}
		string = lines.join("\n")
	}
	return string
}

/**
 * 压缩字符串中的两个及以上空格为一个
 * @param string 要处理的字符串
 * @example compactWhitespace("x \n y") // "x y"
 */
export function compactWhitespace(string: string) {
	return string.replace(/\s{2,}/g, " ")
}

/**
 * 删除字符串内的所有空白符号
 * @param string 要处理的字符串
 * @example clean(" x y   ") // "xy"
 */
export function clean(string: string) {
	return string.replace(/\s+/g, "")
}

/**
 * 删除字符串内的重复字符
 * @param string 要处理的字符串
 * @example unique("xxyyzZ") // "xyzZ"
 */
export function unique(string: string) {
	let result = ""
	for (const char of string) {
		if (result.indexOf(char) < 0) {
			result += char
		}
	}
	return result
}

/**
 * 删除字符串中的非 ASCII 字符
 * @param string 要处理的字符串
 * @example removeNonASCII("xyz中文") // "xyz"
 */
export function removeNonASCII(string: string) {
	return string.replace(/[^\x20-\x7E]/g, "")
}

/**
 * 将字符串中的指定字符替换为掩码字符
 * @param string 要处理的字符串
 * @param startCount 在字符串开头保留的字符数
 * @param endCount 在字符串结尾保留的字符数
 * @param mask 要使用的掩码字符
 * @example mask("1234567890", 1, 2) // "1*******90"
 */
export function mask(string: string, startCount = 0, endCount = startCount, mask = "*") {
	if (startCount + endCount >= string.length) {
		return string
	}
	return string.substring(0, startCount) + mask.repeat(string.length - endCount - startCount) + string.substring(string.length - endCount)
}

/**
 * 反转字符串
 * @param string 要处理的字符串
 * @example reverse("foobar") // "raboof"
 */
export function reverse(string: string) {
	return string.split("").reverse().join("")
}

/**
 * 获取字符串的哈希值
 * @param string 要处理的字符串
 * @returns 返回 32 位整数
 * @example getHashCode("x")
 */
export function getHashCode(string: string) {
	let result = 0
	for (let i = 0; i < string.length; i++) {
		const char = string.charCodeAt(i)
		result = char + (result << 6) + (result << 16) - result
	}
	return result
}

/**
 * 格式化字符串
 * @param string 格式字符串，其中以下内容会被替换：
 *
 * 元字符   | 意义      | 示例
 * --------|-----------|--------
 * {数字}   | 替换为参数列表 | 如 `String.format("{0}年{1}月{2}日", 2012, 12, 3)` 中，{0} 被替换成 2012，{1} 被替换成 12 ，依次类推
 * {字符串} | 替换为参数对象 | 如 `String.format("{year}年{month} 月 ", {year: 2012, month:12})`
 * {{      | 被替换为 { |
 * }}      | 被替换为 } |
 *
 * @param args 所有格式化参数
 * @example format("我是{0}，不是{1}", "小黑", "大白") // "我是小黑，不是大白"
 * @example format("我是{xiaohei}，不是{dabai}", {xiaohei: "小黑", dabai: "大白"}) // "我是小黑，不是大白"
 * @example format("在字符串内使用两个{{和}}避免被转换") //  "在字符串内使用两个{和}避免被转换"
 */
export function formatString(string: string, ...args: any[]) {
	return string ? string.replace(/\{\{|\{(.+?)\}|\}\}/g, (source: string, argName: string) => {
		if (argName == undefined) {
			return source.charAt(0)
		}
		argName = +argName >= 0 ? args[argName as any] : args[0][argName]
		return argName == undefined ? "" : argName
	}) : ""
}

/**
 * 计算字符串的相似度，返回数值越小越相似，0 表示相同
 * @param string1 要比较的第一个字符串
 * @param string2 要比较的第二个字符串
 */
export function levenshteinDistance(string1: string, string2: string) {
	if (string1.length === 0) return string2.length
	if (string2.length === 0) return string1.length
	const matrix = Array(string2.length + 1).fill(0).map((x, i) => [i])
	matrix[0] = Array(string1.length + 1).fill(0).map((x, i) => i)
	for (let i = 1; i <= string2.length; i++) {
		for (let j = 1; j <= string1.length; j++) {
			matrix[i][j] = string2[i - 1] === string1[j - 1] ? matrix[i - 1][j - 1] : Math.min(
				matrix[i - 1][j - 1] + 1,
				matrix[i][j - 1] + 1,
				matrix[i - 1][j] + 1
			)
		}
	}
	return matrix[string2.length][string1.length]
}

/**
 * 生成一个随机字符串
 * @param length 要生成的字符串长度
 * @param chars 允许使用的所有字符
 */
export function getRandomString(length = 10, chars = "0123456789abcdef") {
	const array: string[] = []
	for (let i = 0; i < length; i++) {
		array[i] = chars[Math.floor(Math.random() * chars.length)]
	}
	return array.join("")
}