const memoizedKey = Symbol("memoized")

/** 标记使用相同的参数调用当前方法时，始终返回第一次调用的结果 */
export function memoized(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
	const func = descriptor.value
	descriptor.value = function (this: any) {
		const memizedData = this[memoizedKey] ??= Object.create(null)
		const currentData = memizedData[propertyKey] ??= Object.create(null)
		let cacheKey = ""
		for (const argument of arguments) {
			cacheKey += getObjectId(argument) + ";"
		}
		let cache = currentData[cacheKey]
		if (cache === undefined && !(cacheKey in currentData)) {
			currentData[cacheKey] = cache = func.apply(this, arguments)
		}
		return cache
	}
	return descriptor
}

/**
 * 清除 `memoized` 对应的所有缓存
 * @param obj 要处理的对象
 */
export function clearMemoizedCache(obj: any) {
	const memizedData = obj[memoizedKey]
	for (const key in memizedData) {
		memizedData[key] = undefined
	}
}

const objectIdKey = Symbol("objectId")

let objectIdSeed = 0

/**
 * 获取对象的全局唯一标识符
 * @param obj 任意对象
 */
export function getObjectId(obj: any): number | string | null {
	if (typeof obj !== "object" || obj === null) {
		return obj
	}
	return obj[objectIdKey] ??= Array.isArray(obj) ? obj.map(getObjectId).join(",") : ++objectIdSeed
}