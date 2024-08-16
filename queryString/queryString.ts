/**
 * 解析查询字符串（如 `foo=1&goo=2&goo=3`）为键值对
 * @param queryString 要解析的查询字符串
 * @param separator 不同参数之间的分隔符
 * @param equals 参数名和参数值之间的分隔符
 * @param decode 自定义解码参数名和参数值的回调函数
 * @returns 返回一个以每个查询参数名作为键、查询参数值作为值的新对象，同名的参数对应的值是一个数组
 * @example parseQueryString("foo=1&goo=2&goo=3") // {foo: "1", goo: ["2", "3"]}
 */
export function parseQueryString(queryString: string, separator: string | RegExp = "&", equals = "=", decode = decodeURIComponent) {
	const result: { [key: string]: string | string[] } = Object.create(null)
	if (queryString) {
		for (const pair of queryString.split(separator)) {
			const index = pair.indexOf(equals)
			const key = decode(index < 0 ? pair : pair.substr(0, index))
			const value = index < 0 ? "" : decode(pair.substr(index + equals.length))
			const exist = result[key]
			if (exist === undefined) {
				result[key] = value
			} else if (Array.isArray(exist)) {
				exist.push(value)
			} else {
				result[key] = [exist, value]
			}
		}
	}
	return result
}

/**
 * 格式化键值对为查询字符串（如“foo=1&goo=2&goo=3”）
 * @param query 要格式化的键值对
 * @param separator 不同参数之间的分隔符
 * @param equals 参数名和参数值的分隔符
 * @param encode 自定义编码参数名和参数值的回调函数
 * @example formatQueryString({x: "2", y: "4"}) // "x=2&y=4"
 * @example formatQueryString({x: [2, 4]}) // "x=2&x=4"
 */
export function formatQueryString(query: { [key: string]: string | number | boolean | (string | number | boolean)[] }, separator = "&", equals = "=", encode = encodeURIComponent) {
	const pairs: string[] = []
	for (const key in query) {
		const value = query[key]
		if (Array.isArray(value)) {
			for (const item of value) {
				pairs.push(`${encode(key)}${equals}${encode(item ?? "")}`)
			}
		} else {
			pairs.push(`${encode(key)}${equals}${encode(value ?? "")}`)
		}
	}
	return pairs.join(separator)
}

/**
 * 从查询字符串中获取指定的参数值，如果存在同名参数则只返回第一个，如果找不到则返回 `undefined`
 * @param queryString 要解析的查询字符串（如 `foo=1&goo=2&goo=3`）
 * @param name 查询参数名
 * @param separator 不同参数之间的分隔符
 * @param equals 参数名和参数值之间的分隔符
 * @example getQueryString("foo=1", "foo") // "1"
 */
export function getQueryString(queryString: string, name: string, separator: string | RegExp = "&", equals = "=") {
	name = encodeURIComponent(name)
	for (const pair of queryString.split(separator)) {
		if (pair.startsWith(name)) {
			if (pair.startsWith(equals, name.length)) {
				return decodeURIComponent(pair.substr(name.length + equals.length))
			}
			if (pair.length === name.length) {
				return ""
			}
		}
	}
}

/**
 * 设置或删除地址中指定的查询参数值，如果存在同名参数则只更新第一个
 * @param queryString 要更新的查询字符串（如 `foo=1&goo=2&goo=3`）
 * @param name 查询参数名
 * @param value 要设置的查询参数值，如果值为 `undefined` 则删除指定的查询参数
 * @param separator 不同参数之间的分隔符
 * @param equals 参数名和参数值之间的分隔符
 * @returns 返回更新后的查询字符串，如果原参数不存在则添加到末尾
 * @example setQueryString("", "foo", "1") // "foo=1"
 * @example setQueryString("foo=1", "foo", "2") // "foo=2"
 * @example setQueryString("foo=1", "foo", null) // ""
 */
export function setQueryString(queryString: string, name: string, value: string | number | boolean | null | undefined, separator = "&", equals = "=") {
	const pairs = queryString ? queryString.split(separator) : []
	name = encodeURIComponent(name)
	let i = 0
	for (; i < pairs.length; i++) {
		const pair = pairs[i]
		if (pair.startsWith(name) && (pair.length === name.length || pair.startsWith(equals, name.length))) {
			if (value == undefined) {
				pairs.splice(i--, 1)
			} else {
				pairs[i] = `${name}${equals}${encodeURIComponent(value)}`
			}
			break
		}
	}
	if (i === pairs.length && value != undefined) {
		pairs.push(`${name}${equals}${encodeURIComponent(value)}`)
	}
	return pairs.join(separator)
}

/**
 * 在地址后添加查询字符串
 * @param url 要处理的地址
 * @param queryString 要添加的查询字符串，如果是字符串则不含“?”
 * @returns 返回新地址
 * @example addQueryString("index.html", "from=link") // "index.html?from=link"
 */
export function addQueryString(url: string, queryString: string | { [key: string]: string | number | boolean | (string | number | boolean)[] } | null | undefined) {
	if (!queryString) {
		return url
	}
	let hash = ""
	const hashIndex = url.indexOf("#")
	if (hashIndex >= 0) {
		hash = url.substring(hashIndex)
		url = url.substring(0, hashIndex)
	}
	const queryIndex = url.indexOf("?")
	if (queryIndex < 0) {
		return `${url}?${typeof queryString === "object" ? formatQueryString(queryString) : queryString}${hash}`
	}
	return `${url.substring(0, queryIndex + 1)}${formatQueryString(Object.assign(parseQueryString(url.substring(queryIndex + 1)), typeof queryString === "object" ? queryString : parseQueryString(queryString)))}${hash}`
}