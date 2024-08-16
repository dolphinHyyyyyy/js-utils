import { getDir, normalizePath, relativePath } from "../path/path"
import { formatQueryString, parseQueryString } from "../queryString/queryString"

/**
 * 解析指定的地址
 * @param url 要解析的地址，支持相对地址
 * @param parseQuery 是否解析查询字符串
 * @param slashesDenoteHost 是否将紧跟 `//` 的内容解析为主机名
 * @returns 返回新地址对象
 */
export function parseURL(url: string, parseQuery?: boolean, slashesDenoteHost?: boolean) {
	return new URL(url, parseQuery, slashesDenoteHost)
}

/**
 * 格式化地址对象为字符串
 * @param url 要格式化的对象
 */
export function formatURL(url: Partial<URL> | string) {
	if (typeof url === "string") url = new URL(url)
	return URL.prototype.toString.call(url)
}

/**
 * 基于指定地址解析绝对地址
 * @param baseURL 要解析的基地址
 * @param url 要解析的相对地址
 */
export function resolveURL(baseURL: string, url: string) {
	return new URL(baseURL, false, true).resolve(url).toString()
}

/**
 * 获取指定地址对应的相对地址
 * @param baseURL 要使用的基地址
 * @param url 要处理的地址
 */
export function relativeURL(baseURL: string, url: string) {
	// 忽略 data:... 等 URI
	if (/^[\w+\-\.\+]+:(?!\/)/.test(url)) {
		return url
	}
	const baseObject = parseURL(baseURL, false, true)
	const urlObject = parseURL(url, false, true)
	// 协议不同，只能使用绝对路径
	if (baseObject.protocol !== urlObject.protocol || urlObject.protocol && !(urlObject.protocol in slashedProtocol)) {
		return formatURL(urlObject)
	}
	// 协议相同但主机（含端口）或用户名（含密码）不同，使用省略协议的绝对路径
	if (baseObject.host !== urlObject.host || baseObject.auth !== urlObject.auth) {
		if (urlObject.slashes) {
			delete urlObject.protocol
		}
		return formatURL(urlObject)
	}
	// 两个地址必须都是相对路径或都是绝对路径，否则只能使用绝对路径
	if (baseObject.pathname && urlObject.pathname && (baseObject.pathname.charCodeAt(0) === 47 /* / */) !== (urlObject.pathname.charCodeAt(0) === 47 /* / */)) {
		return formatURL(urlObject)
	}
	// 计算地址开头的相同部分，以 `/` 为界
	const pathname = baseObject.pathname || ""
	return (pathname === "/" ? urlObject.pathname === "/" ? "." : urlObject.pathname || "." : relativePath(pathname.endsWith("/") ? pathname : getDir(pathname), urlObject.pathname || "") || ".") + (urlObject.search || "") + (urlObject.hash || "")
}

/**
 * 规范化指定的地址
 * @param url 要处理的地址
 */
export function normalizeURL(url: string) {
	if (!url) {
		return url
	}
	const urlObject = parseURL(url, false, true)
	if (urlObject.protocol && !(urlObject.protocol in slashedProtocol)) {
		return url
	}
	if (urlObject.pathname) {
		urlObject.pathname = normalizePath(urlObject.pathname, !urlObject.hostname && !url.startsWith("/")) || (urlObject.hostname ? "" : ".")
	}
	return formatURL(urlObject)
}

/**
 * 判断指定的地址是否是绝对地址
 * @param url 要判断的地址
 */
export function isAbsoluteURL(url: string) {
	return /^(?:\/|[\w+\-\.\+]+:)/.test(url)
}

/**
 * 替换字符串中的地址
 * @param content 要处理的内容
 * @param replacement 要替换的内容，如果是字符串，则其中的 `$&` 代表匹配的地址
 * @param replacement.url 匹配的地址
 * @param replacement.index 本次匹配的地址在原内容的索引
 * @param replacement.return 返回替换的内容
 */
export function replaceURL(content: string, replacement: string | ((url: string, index: number) => string)) {
	return content.replace(/\b((?:[a-z][\w\-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]|\((?:[^\s()<>]|(?:\([^\s()<>]+\)))*\))+(?:\((?:[^\s()<>]|(?:\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig, replacement as any)
}

// Reference: RFC 3986, RFC 1808, RFC 2396
// https://github.com/nodejs/node/blob/master/lib/url.js

/** 含双斜杠的协议 */
export const slashedProtocol = {
	"http:": true,
	"https:": true,
	"ftp:": true,
	"gopher:": true,
	"file:": true,
	"ws:": true,
	"wss:": true
}

/** 表示一个地址 */
export class URL {

	/** 协议部分（如 "http:"）*/
	protocol?: string

	/** 判断地址是否包含分隔符(`//`) */
	slashes?: boolean

	/** 验证部分（如 `"name:password"`）*/
	auth?: string

	/** 主机部分（如 `"localhost:80"`）*/
	host?: string

	/** 端口部分（如 `"80"`）*/
	port?: string

	/** 主机名部分（如 `"localhost"`) */
	hostname?: string

	/** 哈希值部分（如 `"#hash"`) */
	hash?: string

	/** 查询参数部分（如 `"?q=1"`) */
	search?: string

	/** 查询参数部分（如 `{q: 1}`) */
	query?: { [key: string]: string | string[] }

	/** 路径名部分（如 `"/foo/a.html"`） */
	pathname?: string

	/** 路径部分（如 `"/foo/a.html?q=1"`） */
	path?: string

	/** 完整地址（如 `"http://localhost:80/foo/a.html?q=1"`） */
	href?: string

	/**
	 * 初始化新的地址
	 * @param url 要解析的地址
	 * @param parseQuery 是否解析查询字符串
	 * @param slashesDenoteHost 是否将紧跟 `//` 的内容解析为主机名
	 */
	constructor(url: string, parseQuery?: boolean, slashesDenoteHost?: boolean) {
		// Copy chrome, IE, opera backslash-handling behavior.
		// Back slashes before the query string get converted to forward slashes
		// See: https://code.google.com/p/chromium/issues/detail?id=25916
		let hasHash = false
		let hasAt = false
		let start = -1
		let end = -1
		let rest = ""
		let lastPos = 0
		for (let i = 0, inWs = false, split = false; i < url.length; i++) {
			const code = url.charCodeAt(i)
			// Find first and last non-whitespace characters for trimming
			const isWs = code === 32 /* */ || code === 9 /* \t */ || code === 13 /* \r */ || code === 10 /* \n */ || code === 12 /* \f */ || code === 160 /* \u00A0 */ || code === 65279 /* \uFEFF */
			if (start === -1) {
				if (isWs) continue
				lastPos = start = i
			} else if (inWs) {
				if (!isWs) {
					end = -1
					inWs = false
				}
			} else if (isWs) {
				end = i
				inWs = true
			}

			// Only convert backslashes while we haven't seen a split character
			if (!split) {
				switch (code) {
					case 35: // '#'
						hasHash = true
					// Fall through
					case 63: // '?'
						split = true
						break
					case 92: // '\\'
						if (i - lastPos > 0) rest += url.slice(lastPos, i)
						rest += "/"
						lastPos = i + 1
						break
					case 64: // '@'
						hasAt = true
						break
				}
			} else if (!hasHash && code === 35 /* # */) {
				hasHash = true
			}
		}

		// Check if string was non-empty (including strings with only whitespace)
		if (start !== -1) {
			if (lastPos === start) {
				// We didn't convert any backslashes
				rest = end === -1 ? url.slice(start) : url.slice(start, end)
			} else if (end === -1 && lastPos < url.length) {
				// We converted some backslashes and have only part of the entire string
				rest += url.slice(lastPos)
			} else if (end !== -1 && lastPos < end) {
				// We converted some backslashes and have only part of the entire string
				rest += url.slice(lastPos, end)
			}
		}

		if (!slashesDenoteHost && !hasHash && !hasAt) {
			// Try fast path regexp
			const simplePath = /^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/.exec(rest)
			if (simplePath) {
				this.path = rest
				this.href = rest
				this.pathname = simplePath[1]
				if (simplePath[2]) {
					this.search = simplePath[2]
					if (parseQuery) {
						this.query = parseQueryString(this.search.substring(1))
					}
				} else if (parseQuery) {
					this.search = ""
					this.query = parseQueryString("")
				}
				return this
			}
		}

		const match = /^[a-z0-9.+-]+:/i.exec(rest)
		let proto: string | undefined
		let lowerProto: string | undefined
		if (match) {
			proto = match[0]
			this.protocol = lowerProto = proto.toLowerCase()
			rest = rest.slice(proto.length)
		}

		// Figure out if it's got a host
		// user@server is *always* interpreted as a hostname, and url
		// resolution will treat //foo/bar as host=foo,path=bar because that's
		// how the browser resolves relative URLs.
		let slashes: boolean | undefined
		if (slashesDenoteHost || proto || /^\/\/[^@/]+@[^@/]+/.test(rest)) {
			slashes = rest.charCodeAt(0) === 47 /* / */ && rest.charCodeAt(1) === 47 /* / */
			if (slashes && !(proto && !slashedProtocol[proto])) {
				rest = rest.slice(2)
				this.slashes = true
			}
		}

		if ((!proto || slashedProtocol[proto]) && (slashes || (proto && !slashedProtocol[proto]))) {
			// there's a hostname.
			// the first instance of /, ?, ;, or # ends the host.
			//
			// If there is an @ in the hostname, then non-host chars *are* allowed
			// to the left of the last @ sign, unless some host-ending character
			// comes *before* the @-sign.
			// URLs are obnoxious.
			//
			// ex:
			// http://a@b@c/ => user:a@b host:c
			// http://a@b?@c => user:a host:b path:/?@c

			let hostEnd = -1
			let atSign = -1
			let nonHost = -1
			for (let i = 0; i < rest.length; i++) {
				switch (rest.charCodeAt(i)) {
					case 9  /* \t */:
					case 10 /* \n */:
					case 13 /* \r */:
					case 32 /*   */:
					case 34 /* " */:
					case 37 /* % */:
					case 39 /* \' */:
					case 59 /* ; */:
					case 60 /* < */:
					case 62 /* > */:
					case 92 /* \\ */:
					case 94 /* ^ */:
					case 96 /* ` */:
					case 123 /* { */:
					case 124 /* | */:
					case 125 /* } */:
						// Characters that are never ever allowed in a hostname from RFC 2396
						if (nonHost === -1) nonHost = i
						break
					case 35 /* # */:
					case 47 /* / */:
					case 63 /* ? */:
						// Find the first instance of any host-ending characters
						if (nonHost === -1)
							nonHost = i
						hostEnd = i
						break
					case 64 /* @ */:
						// At this point, either we have an explicit point where the
						// auth portion cannot go past, or the last @ char is the decider.
						atSign = i
						nonHost = -1
						break
				}
				if (hostEnd !== -1)
					break
			}
			start = 0
			if (atSign !== -1) {
				this.auth = decodeURIComponent(rest.slice(0, atSign))
				start = atSign + 1
			}
			if (nonHost === -1) {
				this.host = rest.slice(start)
				rest = ""
			} else {
				this.host = rest.slice(start, nonHost)
				rest = rest.slice(nonHost)
			}

			// pull out port.
			let host = this.host
			const match = /:[0-9]*$/.exec(host)
			if (match) {
				const port = match[0]
				if (port !== ":") {
					this.port = port.slice(1)
				}
				host = host.slice(0, host.length - port.length)
			}
			if (host) this.hostname = host

			// we've indicated that there is a hostname,
			// so even if it's empty, it has to be present.
			if (typeof this.hostname !== "string") {
				this.hostname = ""
			}

			const hostname = this.hostname

			// if hostname begins with [ and ends with ]
			// assume that it's an IPv6 address.
			const ipv6Hostname = hostname.charCodeAt(0) === 91 /* [ */ && hostname.charCodeAt(hostname.length - 1) === 93 /* ] */

			// validate a little.
			if (!ipv6Hostname) {
				rest = getHostname(this, rest, hostname)
			}

			if (this.hostname.length > 255) {
				this.hostname = ""
			} else {
				// hostnames are always lower case.
				this.hostname = this.hostname.toLowerCase()
			}

			// Do Not Support.
			// if (!ipv6Hostname) {
			//    // IDNA Support: Returns a punycoded representation of "domain".
			//    // It only converts parts of the domain name that
			//    // have non-ASCII characters, i.e. it doesn't matter if
			//    // you call it with a domain that already is ASCII-only.
			//    this.hostname = punycode.toASCII(this.hostname)
			// }

			const p = this.port ? ":" + this.port : ""
			const h = this.hostname || ""
			this.host = h + p

			// strip [ and ] from the hostname
			// the host field still retains them, though
			if (ipv6Hostname) {
				this.hostname = this.hostname.slice(1, -1)
				if (rest[0] !== "/") {
					rest = "/" + rest
				}
			}
		}

		// now rest is set to the post-host stuff.
		// chop off any delim chars.
		if (lowerProto && slashedProtocol[lowerProto]) {
			// First, make 100% sure that any "autoEscape" chars get
			// escaped, even if encodeURIComponent doesn't think they
			// need to be.
			rest = autoEscapeStr(rest)
		}

		let questionIdx = -1
		let hashIdx = -1
		for (let i = 0; i < rest.length; i++) {
			const code = rest.charCodeAt(i)
			if (code === 35 /* # */) {
				this.hash = rest.slice(i)
				hashIdx = i
				break
			}
			if (code === 63 /* ? */ && questionIdx === -1) {
				questionIdx = i
			}
		}

		if (questionIdx !== -1) {
			if (hashIdx === -1) {
				this.search = rest.substring(questionIdx)
			} else {
				this.search = rest.substring(questionIdx, hashIdx)
			}
			if (parseQuery) {
				this.query = parseQueryString(this.search.substring(1))
			}
		} else if (parseQuery) {
			// no query string, but parseQueryString still requested
			this.search = ""
			this.query = parseQueryString("")
		}

		const useQuestionIdx = questionIdx !== -1 && (hashIdx === -1 || questionIdx < hashIdx)
		const firstIdx = useQuestionIdx ? questionIdx : hashIdx
		if (firstIdx === -1) {
			if (rest.length > 0) this.pathname = rest
		} else if (firstIdx > 0) {
			this.pathname = rest.slice(0, firstIdx)
		}
		if (lowerProto && slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
			this.pathname = "/"
		}

		// to support http.request
		if (this.pathname || this.search) {
			const p = this.pathname || ""
			const s = this.search || ""
			this.path = p + s
		}

		// Finally, reconstruct the href based on what has been validated.
		this.href = this.toString()
	}

	/**
	 * 转换地址为字符串
	 * @returns 返回格式化后的字符串
	 */
	toString() {
		let auth = this.auth || ""
		if (auth) {
			auth = encodeURIComponent(auth).replace(/%3A/g, ":")
			auth += "@"
		}

		let protocol = this.protocol || ""
		let pathname = this.pathname || ""
		let hash = this.hash || ""
		let host: string | undefined
		let query = ""

		if (this.host) {
			host = auth + this.host
		} else if (this.hostname) {
			host = auth + (this.hostname.indexOf(":") === -1 ?
				this.hostname :
				"[" + this.hostname + "]")
			if (this.port) {
				host += ":" + this.port
			}
		}

		if (this.query !== null && typeof this.query === "object")
			query = formatQueryString(this.query)

		let search = this.search || (query && ("?" + query)) || ""

		if (protocol && protocol.charCodeAt(protocol.length - 1) !== 58 /* : */)
			protocol += ":"

		let newPathname = ""
		let lastPos = 0
		for (let i = 0; i < pathname.length; ++i) {
			switch (pathname.charCodeAt(i)) {
				case 35: // '#'
					if (i - lastPos > 0)
						newPathname += pathname.slice(lastPos, i)
					newPathname += "%23"
					lastPos = i + 1
					break
				case 63: // '?'
					if (i - lastPos > 0)
						newPathname += pathname.slice(lastPos, i)
					newPathname += "%3F"
					lastPos = i + 1
					break
			}
		}
		if (lastPos > 0) {
			if (lastPos !== pathname.length)
				pathname = newPathname + pathname.slice(lastPos)
			else
				pathname = newPathname
		}

		// only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
		// unless they had them to begin with.
		if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== undefined) {
			host = "//" + (host || "")
			if (pathname && pathname.charCodeAt(0) !== 47/* / */)
				pathname = "/" + pathname
		} else if (!host) {
			host = ""
		}

		search = search.replace("#", "%23")

		if (hash && hash.charCodeAt(0) !== 35 /* # */) hash = "#" + hash
		if (search && search.charCodeAt(0) !== 63 /* ? */) search = "?" + search

		return protocol + host + pathname + search + hash
	}

	/**
	 * 基于当前地址解析指定的相对地址
	 * @param relative 要解析的相对地址
	 * @returns 返回新地址对象
	 */
	resolve(relative: string | URL) {
		if (typeof relative === "string") {
			const rel = new URL(relative, false, true)
			relative = rel
		}

		const result = new URL("")
		for (const tkey in this as any) {
			result[tkey] = this[tkey]
		}

		// Hash is always overridden, no matter what.
		// even href="" will remove it.
		result.hash = relative.hash

		// if the relative url is empty, then there's nothing left to do here.
		if (relative.href === "") {
			result.href = relative.toString()
			return result
		}

		// hrefs like //foo/bar always cut to the protocol.
		if (relative.slashes && !relative.protocol) {
			// take everything except the protocol from relative
			result.path = result.pathname = ""
			for (const rkey in relative) {
				if (rkey !== "protocol") {
					result[rkey] = relative[rkey]
				}
			}

			// urlParse appends trailing / to urls like http://www.example.com
			if (result.protocol && slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
				result.path = result.pathname = "/"
			}

			result.href = result.toString()
			return result
		}

		if (relative.protocol && relative.protocol !== result.protocol) {
			// if it's a known url protocol, then changing
			// the protocol does weird things
			// first, if it's not file:, then we MUST have a host,
			// and if there was a path
			// to begin with, then we MUST have a path.
			// if it is file:, then the host is dropped,
			// because that's known to be hostless.
			// anything else is assumed to be absolute.
			result.protocol = relative.protocol
			if (!relative.host &&
				!/^file:?$/.test(relative.protocol) &&
				slashedProtocol[relative.protocol]) {
				const relPath = (relative.pathname || "").split("/")
				while (relPath.length && !(relative.host = relPath.shift()!)) { }
				if (!relative.host) relative.host = ""
				if (!relative.hostname) relative.hostname = ""
				if (relPath[0] !== "") relPath.unshift("")
				if (relPath.length < 2) relPath.unshift("")
				result.pathname = relPath.join("/")
			} else {
				result.pathname = relative.pathname
			}
			result.search = relative.search
			result.query = relative.query
			result.host = relative.host || ""
			result.auth = relative.auth
			result.hostname = relative.hostname || relative.host
			result.port = relative.port
			// to support http.request
			if (result.pathname || result.search) {
				const p = result.pathname || ""
				const s = result.search || ""
				result.path = p + s
			}
			result.slashes = slashedProtocol[relative.protocol] ? result.slashes || relative.slashes : false
			result.href = result.toString()
			return result
		}

		const isSourceAbs = result.pathname && result.pathname.charCodeAt(0) === 47 /* / */
		const isRelAbs = relative.host || relative.pathname && relative.pathname.charCodeAt(0) === 47 /* / */
		let mustEndAbs: any = isRelAbs || isSourceAbs || (result.host && relative.pathname)
		const removeAllDots = mustEndAbs
		let srcPath = result.pathname && result.pathname.split("/") || []
		const relPath = relative.pathname && relative.pathname.split("/") || []
		const noLeadingSlashes = result.protocol && !slashedProtocol[result.protocol]

		// if the url is a non-slashed url, then relative
		// links like ../.. should be able
		// to crawl up to the hostname, as well.  This is strange.
		// r.protocol has already been set by now.
		// Later on, put the first path part into the host field.
		if (noLeadingSlashes) {
			result.hostname = ""
			result.port = null!
			if (result.host) {
				if (srcPath[0] === "") srcPath[0] = result.host
				else srcPath.unshift(result.host)
			}
			result.host = ""
			if (relative.protocol) {
				relative.hostname = null!
				relative.port = null!
				relative.auth = null!
				if (relative.host) {
					if (relPath[0] === "") relPath[0] = relative.host
					else relPath.unshift(relative.host)
				}
				relative.host = null!
			}
			mustEndAbs = mustEndAbs && (relPath[0] === "" || srcPath[0] === "")
		}

		if (isRelAbs) {
			// it's absolute.
			if (relative.host || relative.host === "") {
				if (result.host !== relative.host) result.auth = null!
				result.host = relative.host
				result.auth = relative.port
			}
			if (relative.hostname || relative.hostname === "") {
				if (result.hostname !== relative.hostname) result.auth = null!
				result.hostname = relative.hostname
			}
			result.search = relative.search
			result.query = relative.query
			srcPath = relPath
			// fall through to the dot-handling below.
		} else if (relPath.length) {
			// it's relative
			// throw away the existing file, and take the new path instead.
			if (!srcPath) srcPath = []
			srcPath.pop()
			srcPath = srcPath.concat(relPath)
			result.search = relative.search
			result.query = relative.query
		} else if (relative.search !== null && relative.search !== undefined) {
			// just pull out the search.
			// like href='?foo'.
			// Put this after the other two cases because it simplifies the booleans
			if (noLeadingSlashes) {
				result.hostname = result.host = srcPath.shift()!
				// occasionally the auth can get stuck only in host
				// this especially happens in cases like
				// url.resolveObject('mailto:local1@domain1', 'local2@domain2')
				const authInHost = result.host && result.host.indexOf("@") > 0 && result.host.split("@")
				if (authInHost) {
					result.auth = authInHost.shift()!
					result.host = result.hostname = authInHost.shift()!
				}
			}
			result.search = relative.search
			result.query = relative.query
			// to support http.request
			if (result.pathname !== null || result.search !== null) {
				result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "")
			}
			result.href = result.toString()
			return result
		}

		if (!srcPath.length) {
			// no path at all.  easy.
			// we've already handled the other stuff above.
			result.pathname = null!
			// to support http.request
			if (result.search) {
				result.path = "/" + result.search
			} else {
				result.path = null!
			}
			result.href = result.toString()
			return result
		}

		// if a url ENDs in . or .., then it must get a trailing slash.
		// however, if it ends in anything else non-slashy,
		// then it must NOT get a trailing slash.
		let last = srcPath.slice(-1)[0]
		const hasTrailingSlash = (
			(result.host || relative.host || srcPath.length > 1) &&
			(last === "." || last === "..") || last === "")

		// strip single dots, resolve double dots to parent dir
		// if the path tries to go above the root, `up` ends up > 0
		let up = 0
		for (let i = srcPath.length; i >= 0; i--) {
			last = srcPath[i]
			if (last === ".") {
				spliceOne(srcPath, i)
			} else if (last === "..") {
				spliceOne(srcPath, i)
				up++
			} else if (up) {
				spliceOne(srcPath, i)
				up--
			}
		}

		// if the path is allowed to go above the root, restore leading ..s
		if (!mustEndAbs && !removeAllDots) {
			while (up--) {
				srcPath.unshift("..")
			}
		}

		if (mustEndAbs && srcPath[0] !== "" && (!srcPath[0] || srcPath[0].charAt(0) !== "/")) {
			srcPath.unshift("")
		}

		if (hasTrailingSlash && (srcPath.join("/").slice(-1) !== "/")) {
			srcPath.push("")
		}

		const isAbsolute = srcPath[0] === "" || (srcPath[0] && srcPath[0].charAt(0) === "/")

		// put the host back
		if (noLeadingSlashes) {
			result.hostname = result.host = isAbsolute ? "" : srcPath.length ? srcPath.shift()! : ""
			// occasionally the auth can get stuck only in host
			// this especially happens in cases like
			// url.resolveObject('mailto:local1@domain1', 'local2@domain2')
			const authInHost = result.host && result.host.indexOf("@") > 0 && result.host.split("@")
			if (authInHost) {
				result.auth = authInHost.shift()!
				result.host = result.hostname = authInHost.shift()!
			}
		}

		mustEndAbs = mustEndAbs || (result.host && srcPath.length)

		if (mustEndAbs && !isAbsolute) {
			srcPath.unshift("")
		}

		if (!srcPath.length) {
			result.pathname = null!
			result.path = null!
		} else {
			result.pathname = srcPath.join("/")
		}

		// to support request.http
		if (result.pathname !== null || result.search !== null) {
			result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "")
		}
		result.auth = relative.auth || result.auth
		result.slashes = result.slashes || relative.slashes
		result.href = result.toString()
		return result

		// About 1.5x faster than the two-arg version of Array#splice().
		function spliceOne(list: any[], index: number) {
			for (let i = index, k = i + 1; k < list.length; i += 1, k += 1)
				list[i] = list[k]
			list.pop()
		}

	}

}

const escapedCodes = [
	/* 0 - 9 */ '', '', '', '', '', '', '', '', '', '%09',
	/* 10 - 19 */ '%0A', '', '', '%0D', '', '', '', '', '', '',
	/* 20 - 29 */ '', '', '', '', '', '', '', '', '', '',
	/* 30 - 39 */ '', '', '%20', '', '%22', '', '', '', '', '%27',
	/* 40 - 49 */ '', '', '', '', '', '', '', '', '', '',
	/* 50 - 59 */ '', '', '', '', '', '', '', '', '', '',
	/* 60 - 69 */ '%3C', '', '%3E', '', '', '', '', '', '', '',
	/* 70 - 79 */ '', '', '', '', '', '', '', '', '', '',
	/* 80 - 89 */ '', '', '', '', '', '', '', '', '', '',
	/* 90 - 99 */ '', '', '%5C', '', '%5E', '', '%60', '', '', '',
	/* 100 - 109 */ '', '', '', '', '', '', '', '', '', '',
	/* 110 - 119 */ '', '', '', '', '', '', '', '', '', '',
	/* 120 - 125 */ '', '', '', '%7B', '%7C', '%7D',
]

// Automatically escape all delimiters and unwise characters from RFC 2396.
// Also escape single quotes in case of an XSS attack.
// Return the escaped string.
function autoEscapeStr(rest: string) {
	let escaped = ''
	let lastEscapedPos = 0
	for (let i = 0; i < rest.length; i++) {
		// `escaped` contains substring up to the last escaped character.
		const escapedChar = escapedCodes[rest.charCodeAt(i)]
		if (escapedChar) {
			// Concat if there are ordinary characters in the middle.
			if (i > lastEscapedPos)
				escaped += rest.slice(lastEscapedPos, i)
			escaped += escapedChar
			lastEscapedPos = i + 1
		}
	}
	if (lastEscapedPos === 0)  // Nothing has been escaped.
		return rest

	// There are ordinary characters at the end.
	if (lastEscapedPos < rest.length)
		escaped += rest.slice(lastEscapedPos)

	return escaped
}

function getHostname(self: URL, rest: string, hostname: string) {
	for (let i = 0; i < hostname.length; i++) {
		const code = hostname.charCodeAt(i)
		if (code >= 97 /* a */ && code <= 122 /* z */ ||
			code === 46 /* . */ ||
			code >= 65 /* A */ && code <= 90 /* Z */ ||
			code >= 48 /* 0 */ && code <= 57 /* 9 */ ||
			code === 45 /* - */ ||
			code === 43 /* + */ ||
			code === 95 /* _ */ ||
			code > 127) {
			continue
		}
		// Invalid host character
		self.hostname = hostname.slice(0, i)
		return `/${hostname.slice(i)}${rest}`
	}
	return rest
}