/**
 * 解析字符串为正则表达式
 * @param value 要解析的字符串
 * @param flags 正则表达式标记，可以是 "gmiusy" 中任意字符组合
 * @example parse("\\s") // /\s/
 */
export function parseRegExp(value: string, flags?: string) {
	return new RegExp(escapeRegExp(value), flags)
}

/**
 * 转义正则表达式中的特殊字符
 * @param value 要处理的字符串
 */
export function escapeRegExp(value: string) {
	return value.replace(/[.\\(){}[\]+*?^$|]/g, "\\$&")
}

/**
 * 合并多个正则表达式，新正则表达式会匹配原正则表达式的任意一项
 * @param regexps 要合并的所有正则表达式
 * @example join(/foo/, /goo/) // /foo|goo/
 */
export function join(...regexps: RegExp[]) {
	return new RegExp(regexps.map(regexp => regexp.source).join("|"), regexps[0]?.flags)
}

/**
 * 将通配符转为等价正则表达式
 * @param glob 要转换的通配符表达式，其中可使用以下符号：
 * - `*`：匹配任意个字符
 * - `?`：匹配一个字符
 * @param flags 正则表达式标记，可以是 "gmiusy" 中任意字符组合
 * @example globToRegExp("a*b").test("ab") // true
 * @example globToRegExp("a*b").test("acb") // true
 * @example globToRegExp("a*b").test("acbd") // false
 */
export function globToRegExp(glob: string, flags?: string) {
	return new RegExp(`^${glob.replace(/[.\\(){}[\]+^$|]/g, "\\$&").replace(/\*/g, "(.*)").replace(/\?/g, "(.)")}$`, flags)
}