/**
 * 合并多个路径
 * @param paths 要合并的所有路径
 * @example joinPath("a/b/../c/d/e") // "a/c/d/e"
 */
export function joinPath(...paths: string[]) {
	return normalizePath(paths.join("/"))
}

/**
 * 删除路径中多余的 ./ 和 ../
 * @param path 路径
 * @param allowAboveRoot 是否允许返回指向根路径外的路径
 * @param preverseSlash 是否保留路径末尾的 /
 * @returns 返回规范化后的新路径
 * @example normalizePath("a/b/../c/d/e") // "a/c/d/e"
 */
export function normalizePath(path: string, allowAboveRoot = true, preverseSlash = true) {
	let result = ""
	let lastSlash = -1
	let dots = 0
	for (let i = 0; i <= path.length; i++) {
		const code = i < path.length ? path.charCodeAt(i) : 47 /* / */
		if (code === 47 /* / */) {
			if (lastSlash === i - 1 || dots === 1) {
				// “//”、“./”: 忽略
			} else if (dots === 2) {
				// “../”: 退到上级
				if (result.length == 0 || result.charCodeAt(result.length - 1) === 46 /* . */ &&
					result.charCodeAt(result.length - 2) === 46 /* . */ &&
					(result.length === 2 || result.charCodeAt(result.length - 3) === 47 /* / */)) {
					if (allowAboveRoot) {
						result += result.length > 0 ? "/.." : ".."
					}
				} else {
					result = result.substring(0, result.lastIndexOf("/"))
				}
			} else {
				result = result.length > 0 ? `${result}/${path.substring(lastSlash + 1, i)}` : path.substring(lastSlash + 1, i)
			}
			lastSlash = i
			dots = 0
		} else if (code === 46 /* . */ && dots !== -1) {
			dots++
		} else {
			dots = -1
		}
	}
	if (path.charCodeAt(0) === 47 /* / */ && !result.startsWith("../")) {
		result = "/" + result
	}
	if (preverseSlash && path.charCodeAt(path.length - 1) === 47 /* / */) {
		if (result) {
			if (result !== "/") {
				result += "/"
			}
		} else {
			result = "./"
		}
	}
	return result
}

/**
 * 计算路径相对于基路径的相对路径
 * @param basePath 解析的基路径
 * @param path 路径
 * @example relativePath("a/b", "a/c") // "../c/c"
 */
export function relativePath(basePath: string, path: string) {
	basePath = normalizePath(basePath, undefined, false)
	path = normalizePath(path)
	const prefix = commonDirLength(basePath, path)
	let result = ""
	for (let i = prefix + 1; i <= basePath.length; i++) {
		if (i === basePath.length || basePath.charCodeAt(i) === 47 /* / */) {
			result += result.length === 0 ? ".." : "/.."
		}
	}
	return result.length > 0 ?
		`${result}${prefix ? path.substring(prefix) : path.startsWith("/") ? path : "/" + path}` :
		prefix ? path.length === prefix + 1 && path.endsWith("/") ? "./" : path.substring(prefix + 1) : path
}

/**
 * 获取两个路径的公共文件夹
 * @param path1 要处理的第一个路径，路径必须已规范化
 * @param path2 要处理的第二个路径，路径必须已规范化
 * @example commonDir("/root/foo", "/root/foo/goo") // "/root/foo"
 */
export function commonDir(path1: string, path2: string) {
	path1 = normalizePath(path1, undefined, false)
	path2 = normalizePath(path2, undefined, false)
	const index = commonDirLength(path1, path2)
	return path1.substring(0, index)
}

function commonDirLength(path1: string, path2: string) {
	// 确保 path1.length <= path2.length
	if (path1.length > path2.length) {
		[path1, path2] = [path2, path1]
	}
	// 计算相同的开头部分，以分隔符为界
	let index = 0
	let i = 0
	for (; i < path1.length; i++) {
		const ch1 = path1.charCodeAt(i)
		const ch2 = path2.charCodeAt(i)
		// 发现不同字符后终止
		if (ch1 !== ch2) {
			break
		}
		// 如果发现一个分隔符，则标记之前的内容是公共部分
		if (ch1 === 47 /* / */) {
			index = i
		}
	}
	// 特殊处理：path1 = "foo", path2 = "foo" 或 "foo/goo"
	if (i === path1.length && (i === path2.length || path2.charCodeAt(i) === 47 /* / */)) {
		return path1.length
	}
	return index
}

/**
 * 获取路径的文件夹部分
 * @param path 要处理的路径
 * @example getDir("e/a/b") // "e/a"
 */
export function getDir(path: string) {
	const parts = splitPath(path)
	const root = parts[1]
	const dir = parts[2]
	return !root && !dir ? "" : root + (dir && dir.substring(0, dir.length - 1))
}

/**
 * 设置指定路径的文件夹部分
 * @param path 要处理的路径
 * @param value 要设置的新文件夹路径
 * @param base 如果提供了原文件夹路径，则保留文件在原文件夹内的路径
 * @example setDir("/root/foo.txt", "goo") // "goo/foo.txt"
 * @example setDir("/root/goo/foo.txt", "/user", "/root") // "/user/goo/foo.txt"
 */
export function setDir(path: string, value: string, base?: string) {
	return joinPath(value, base ? relativePath(base, path) : getName(path))
}

/**
 * 获取路径的文件名部分
 * @param path 路径
 * @param includeExt 如果为 `true`（默认）则包含扩展名（含点），否则不包含扩展名
 * @returns 返回文件部分
 * @example getName("e/a/b.txt") // "b.txt"
 */
export function getName(path: string, includeExt = true) {
	const parts = splitPath(path)
	const baseName = parts[3]
	return includeExt ? baseName : baseName.substring(0, baseName.length - parts[4].length)
}

/**
 * 设置指定路径的文件名部分
 * @param path 要处理的路径
 * @param value 要更改的新文件名
 * @param includeExt 如果为 `true`（默认）则同时更改扩展名（含点），否则保留原扩展名
 * @example setName("/root/foo.txt", "goo.jpg") // "/root/goo.jpg"
 * @example setName("/root/foo.txt", "goo", false) // "/root/goo.jpg"
 */
export function setName(path: string, value: string, includeExt = true): string {
	if (/[/\\]$/.test(path)) {
		return setName(path.slice(0, -1), value, includeExt) + path.charAt(path.length - 1)
	}
	const base = getDir(path)
	return path.slice(0, -base.length) + value + (includeExt ? "" : getExt(base))
}

/**
 * 获取路径的扩展名部分（含点）
 * @param path 路径
 * @returns 返回扩展名部分（含点）
 * @example getExt("e/a/b.txt") // ".txt"
 */
export function getExt(path: string) {
	return splitPath(path)[4]
}

/**
 * 设置指定路径的扩展名（含点）部分，如果源路径不含扩展名则追加到末尾
 * @param path 要处理的路径
 * @param value 要更改的新扩展名（含点）
 * @example setExt("/root/foo.txt", ".jpg") // "/root/foo.jpg"
 * @example setExt("/root/foo.txt", "") // "/root/foo"
 * @example setExt("/root/foo", ".jpg") // "/root/foo.jpg"
 */
export function setExt(path: string, value: string) {
	return path.substring(0, path.length - getExt(path).length) + value
}

/**
 * 将文件名分割为数组
 * @param path 文件名
 * @returns 返回一个数组。其内容分别为根路径、文件夹、文件基础名和扩展名
 */
function splitPath(path: string) {
	return /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(path)!
}

/**
 * 在指定路径的文件名（不含扩展名部分）后追加内容
 * @param path 要处理的路径
 * @param value 要追加的内容
 * @example appendName("foo/goo.src.txt", "_fix") // "foo/goo_fix.src.txt"
 */
export function appendName(path: string, value: string): string {
	if (/[/\\]$/.test(path)) {
		return appendName(path.slice(0, -1), value) + path.charAt(path.length - 1)
	}
	const base = getName(path)
	const dot = base.indexOf(".")
	return path.slice(0, -base.length) + (dot < 0 ? base : base.substring(0, dot)) + value + (dot < 0 ? "" : base.substring(dot))
}

/**
 * 计算重命名后的路径
 * @params path 目标字段
 * @params append 转换附加字符串
 * @params ext 排除的扩展名
 * @example getNewPath("测试 - 副本", " - 副本") // "测试 - 副本2"
 * @example getNewPath("test", "-2") // "test-2"
 * @example getNewPath("test-2", "-2") // "test-3"
 */
export function getNewPath(path: string, append = "-2", ext = getExt(path)) {
	if (ext) path = path.substring(0, path.length - ext.length)
	const digits = /\d+$/.exec(path)
	if (digits) {
		return path.substring(0, digits.index) + (parseInt(digits[0]) + 1) + ext
	}
	if (path.endsWith(append)) {
		return path + "2" + ext
	}
	return path + append + ext
}

/**
 * 判断指定的文件夹是否包含另一个文件或文件夹
 * @param parent 要判断的父文件夹路径，路径必须已规范化
 * @param child 要判断的子文件或文件夹路径，路径必须已规范化
 * @example containsPath("/root", "/root/foo") // true
 * @example containsPath("/root/foo", "/root/goo") // false
 */
export function containsPath(parent: string, child: string) {
	if (child.length < parent.length) {
		return false
	}
	if (!child.startsWith(parent)) {
		return false
	}
	const endChar = parent.charCodeAt(parent.length - 1)
	if (endChar === 47 /* / */ || endChar !== endChar /* NaN */) {
		return true
	}
	const char = child.charCodeAt(parent.length)
	return char === 47 /* / */ || char !== char /* NaN */
}

/**
 * 解析路径中指定索引的组成部分，比如 `x/y/z` 的第 1 部分是 `y`
 * @param path 文件路径
 * @param index 要获取的索引
 */
export function getPathPart(path: string, index: number) {
	for (let pos = 0; index >= 0; index--) {
		const nextSlash = path.indexOf('/', pos)
		if (nextSlash < 0) {
			return index === 0 ? path.substring(pos) : ""
		}
		if (index === 0) {
			return path.substring(pos, nextSlash)
		}
		pos = nextSlash + 1
	}
}

/**
 * 解析路径中指定索引后的组成部分，比如 `x/y/z` 的第 1 部分后是 `y/z`
 * @param path 文件路径
 * @param index 要获取的索引
 */
export function getPathRest(path: string, index: number) {
	let pos = 0
	for (; index > 0; index--) {
		const nextSlash = path.indexOf('/', pos)
		if (nextSlash < 0) {
			return ""
		}
		pos = nextSlash + 1
	}
	return path.substring(pos)
}