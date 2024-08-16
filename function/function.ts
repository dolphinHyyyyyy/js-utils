/** 空函数 */
export function empty() { }

/** 固定返回 `true` 的函数 */
export function returnTrue() { return true }

/** 固定返回 `false` 的函数 */
export function returnFalse() { return false }

/**
 * 始终返回第一个参数值的函数
 * @param value 要返回的值
 */
export function self<T>(value: T) { return value }

/**
 * 创建一个始终返回指定值的函数
 * @param value 新函数要返回的值
 * @example from(false)() // false
 */
export function from<T>(value: T) { return () => value }

/**
 * 创建一个新函数，调用该函数后会依次调用所有原函数
 * @param funcs 要调用的所有原函数
 * @example concat(() => {}, () => {})()
 */
export function concat<T extends (...args: any[]) => any>(...funcs: T[]) {
	return function (this: any) {
		let result: any
		for (const func of funcs) {
			result = func.apply(this, arguments as any)
		}
		return result
	} as any as T
}

/**
 * 创建一个新函数，调用该函数后，重复调用原函数指定次数
 * @param func 要调用的原函数
 * @param count 要调用的次数
 * @example repeat(() => console.log("hello"), 3)() // 输出 3 个 hello
 */
export function repeat<T extends Function>(func: T, count = 0) {
	return function (this: any) {
		for (let i = 0; i < count; i++) {
			func.apply(this, arguments)
		}
	}
}

/**
 * 创建一个新函数，仅在第一次调用该函数时调用原函数
 * @param func 要调用的原函数
 */
export function once<T extends Function>(func: T) {
	let called = false
	let result: any
	return function (this: any) {
		if (called) {
			return result
		}
		called = true
		return result = func.apply(this, arguments)
	} as any as T
}

/**
 * 创建一个新函数，仅在前几次调用该函数时调用原函数
 * @param func 要调用的原函数
 * @param maxCount 最多调用的次数
 */
export function limit<T extends Function>(func: T, maxCount: number) {
	return function (this: any) {
		if (maxCount-- > 0) {
			func.apply(this, arguments)
		}
	} as any as T
}

/**
 * 创建一个新函数，多次调用该函数时，仅在前几次调用原函数
 * @param func 要调用的原函数
 * @param count 调用的次数
 * @returns 返回一个新函数
 * @example
 * const done = before(() => console.log("hello"), 1)
 * done() // 输出 hello
 * done() // 不输出
 */
export function before<T extends Function>(func: T, count: number) {
	let i = 0
	return function (this: any) {
		if (i++ < count) {
			return func.apply(this, arguments)
		}
	} as any as T
}

/**
 * 创建一个新函数，调用该函数时直接调用原函数，但跳过前几次调用
 * @param func 要调用的原函数
 * @param count 调用的次数
 * @returns 返回一个新函数
 * @example
 * const done = after(() => console.log("hello"), 1)
 * done() // 不输出
 * done() // 输出 hello
 */
export function after<T extends Function>(func: T, count: number) {
	let i = 0
	return function (this: any) {
		if (i++ >= count) {
			return func.apply(this, arguments)
		}
	} as any as T
}

/**
 * 创建一个新函数，缓存调用原函数的结果，确保相同参数只调用一次原函数
 * @param func 要调用的原函数
 */
export function memorized<T extends Function>(func: T) {
	const caches: any[] = []
	return function (this: any) {
		for (const cache of caches) {
			if (arguments.length === cache.length) {
				let allSame = true
				for (let i = 0; i < cache.length; i++) {
					if (cache[i] !== arguments[i]) {
						allSame = false
						break
					}
				}
				if (allSame) {
					return cache.result
				}
			}
		}
		const args: any = [...arguments]
		caches.push(args)
		return args.result = func.apply(this, args)
	} as any as T
}

/**
 * 创建一个新函数，调用该函数后，延时调用原函数
 * @param func 要调用的原函数
 * @param timeout 延时的毫秒数
 * @example delay(() => console.log("延时执行"), 100)()
 */
export function delay<T extends Function>(func: T, timeout = 0) {
	return function (this: any) {
		setTimeout(() => {
			func.apply(this, arguments)
		}, timeout)
	} as any as T
}

/**
 * 创建一个新函数，调用该函数后每隔指定时间调用一次原函数
 * @param func 要调用的原函数
 * @param func.count 当前执行的次数
 * @param func.return 如果函数返回 `false` 则停止执行
 * @param count 执行的次数，如果指定小于 0 则无限次执行
 * @param timeout 每次执行之间的间隔毫秒数
 * @example interval(c => { console.log(c) }, 10, 400)
 */
export function interval(func: (count: number) => boolean | void, count = -1, timeout = 0) {
	progress(0)
	function progress(value: number) {
		if (value !== count && func(value) !== false) {
			setTimeout(progress, timeout, value + 1)
		}
	}
}

/**
 * 创建一个防抖函数，调用该函数后，延时调用原函数，如果在延时等待期间有新的调用，则重新开始计时
 * @param func 要调用的原函数
 * @param timeout 延时的毫秒数
 * @example document.onscroll = debounce(() => console.log("延时执行"), 100)
 */
export function debounce<T extends Function>(func: T, timeout = 0) {
	let timer: number
	return function (this: any) {
		const args = arguments
		timer && clearTimeout(timer)
		timer = setTimeout(() => {
			timer = 0
			func.apply(this, args)
		}, timeout) as any
	} as any as T
}

/**
 * 创建一个节流函数，多次调用该函数后，只会在每个延时周期内调用一次原函数
 * @param func 要调用的原函数
 * @param timeout 延时的毫秒数
 * @param leading 是否在每个延时周期的最开始调用原函数
 * @param trailing 是否确保在最后一个延时周期末尾调用一次函数
 * @example document.onmousemove = throttle(() => console.log("延时执行"), 100)
 */
export function throttle<T extends Function>(func: T, timeout: number, leading?: boolean, trailing?: boolean) {
	let timer: ReturnType<typeof setTimeout> | undefined
	let previous = 0
	return function (this: any) {
		const now = Date.now()
		if (!previous && leading === false) previous = now
		const remaining = timeout - (now - previous)
		if (remaining <= 0 || remaining > timeout) {
			if (timer) {
				clearTimeout(timer)
				timer = undefined
			}
			previous = now
			func.apply(this, arguments)
		} else if (!timer && trailing !== false) {
			timer = setTimeout(() => {
				timer = undefined
				previous = leading === false ? 0 : Date.now()
				func.apply(this, arguments)
			}, remaining)
		}
	};
}

/**
 * 获取函数的所有形参
 * @param func 要处理的函数，不支持带有复杂默认参数的函数
 */
export function getParameters(func: Function) {
	const source = func.toString().replace(/\/\/.*|\/\*[\s\S]*?\*\/|'(?:\\[\s\S]|[^'\\\r\n])*'|"(?:\\[\s\S]|[^"\\\r\n])*"|`(?:\\[\s\S]|[^`\\\r\n])*`/g, "")
	const match = /\((.*?)\)|(\S*?)\s*=>/.exec(source)
	if (!match) {
		return []
	}
	if (match[2]) {
		return [match[2]]
	}
	return match[1].split(/,\s*/).map(item => item.replace(/\s*=[\s\S]*/, ""))
}

/**
 * 获取函数不含参数部分的源码
 * @param func 要处理的函数
 * @returns 根据执行环境的不同，其中可能包含注释
 * @example getSource(x => x)
 */
export function getSource(func: Function) {
	return func.toString().replace(/^function\s+[^(]*\s*\(.*?\)\s*\{[\r\n]*/, "").replace(/\s*\}\s*$/, "").replace(/^(?:\([^)]*\)|[^=]+)\s*=>\s*/, "").replace(/\\u([0-9a-f]{3})([0-9a-f])/gi, (a: string, b: string, c: string) => String.fromCharCode((parseInt(b, 16) * 16 + parseInt(c, 16))))
}