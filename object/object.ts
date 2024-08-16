/**
 * 判断指定的对象是否是引用对象
 * @param object 要判断的对象
 * @example isObject({}) // true
 * @example isObject(0) // false
 * @example isObject(null) // false
 */
export function isObject(object: any): object is object {
	return typeof object === "object" && object !== null || typeof object === "function"
}

/**
 * 判断指定的对象是普通字面量对象
 * @param object 要判断的对象
 * @example isPlainObject({x: 1}) // true
 * @example isPlainObject([]) // false
 */
export function isPlainObject(object: any): object is Object {
	return object?.constructor === Object
}

/**
 * 获取对象的类型名
 * @param object 要判断的对象
 * @example type(null) // "Null"
 * @example type(undefined) // "Undefined"
 * @example type(new Function) // "Function"
 * @example type(NaN) // "Number"
 * @example type(/a/) // "RegExp"
 * @example type([]) // "Array"
 */
export function type(object: any) {
	return Object.prototype.toString.call(object).slice(8, -1)
}

/**
 * 判断对象是否为 `null`、`undefined`、`false`、0、`NaN`、空字符串、空数组或空对象
 * @param object 要判断的对象
 * @example isEmpty(null) // true
 * @example isEmpty(undefined) // true
 * @example isEmpty("") // true
 * @example isEmpty(" ") // false
 * @example isEmpty([]) // true
 * @example isEmpty({}) // true
 */
export function isEmpty(object: any): object is null | undefined | "" | [] | {} {
	if (!object) {
		return true
	}
	if (typeof object !== "object") {
		return false
	}
	if (Array.isArray(object) && object.length === 0) {
		return true
	}
	for (const _ in object) {
		return false
	}
	return true
}

/**
 * 获取对象自身的可枚举属性数
 * @param object 要处理的对象
 * @example size({x: 1, y: 2}) // 2
 */
export function size(object: any) {
	let result = 0
	for (const key in object) {
		if (Object.prototype.hasOwnProperty.call(object, key)) {
			result++
		}
	}
	return result
}

/**
 * 判断对象的所有属性中是否包含指定的值
 * @param object 要遍历的对象
 * @param value 要查找的值
 * @example includes({x: 0, y: 1}, 2) // false
 */
export function includes(object: any, value: any) {
	for (const key in object) {
		if (object[key] === value) {
			return true
		}
	}
	return false
}

/**
 * 查找对象中指定值对应的第一个键，如果找不到则返回 `undefined`
 * @param object 要遍历的对象
 * @param value 要查找的值
 * @example keyOf({x: 1, y: 2}, 1) // "x"
 */
export function keyOf<T>(object: T, value: any) {
	for (const key in object) {
		if (object[key] === value) {
			return key
		}
	}
}

/**
 * 查找对象中指定值对应的最后一个键，如果找不到则返回 `undefined`
 * @param object 要遍历的对象
 * @param value 要查找的值
 * @example lastKeyOf({x: 1, y: 2}, 1) // "x"
 */
export function lastKeyOf<T>(object: T, value: any) {
	const keys = Object.keys(object) as Extract<keyof T, string>[]
	for (let i = keys.length; --i >= 0;) {
		const key = keys[i]
		if (object[key] === value) {
			return key
		}
	}
}

/**
 * 从对象中提取指定的键及对应的值并组成新对象
 * @param object 源对象
 * @param keys 要提取的键
 * @example pick({x: 1, y: 2}, ["y"]) // {y: 2}
 */
export function pick<T, K extends keyof T>(object: T, keys: K[]) {
	const result = {} as Pick<T, K>
	for (const key of keys) {
		if (key in object) {
			result[key] = object[key]
		}
	}
	return result
}

/**
 * 从对象中删除指定的键并返回新对象
 * @param object 源对象
 * @param keys 要删除的键
 * @example omit({x: 1, y: 2}, ["y"]) // {x: 2}
 */
export function omit<T, K extends keyof T>(object: T, keys: K[]) {
	const result = { ...object } as Omit<T, K>
	for (const key of keys) {
		delete result[key as any as keyof typeof result]
	}
	return result
}

/**
 * 将对象的键和值互换组成新对象
 * @param object 要处理的对象
 * @example invert({x: 1, y: 2}) // {1: "x", 2: "y"}
 */
export function invert<T extends PropertyKey, K extends PropertyKey>(object: { [key in T]: K }) {
	const result = {} as { [key in K]: T }
	for (const key in object) {
		result[object[key]] = key
	}
	return result
}

/**
 * 复制指定的对象（嵌套的子对象保留原引用），返回新对象
 * @param object 要复制的对象
 * @example clone({x: 3, y: [5]}) // {x: 3, y: [5]}
 */
export function clone<T>(object: T): T {
	if (typeof object === "object" && object !== null) {
		object = Object.assign(Object.create(Object.getPrototypeOf(object)), object)
	}
	return object
}

/**
 * 复制指定的对象和嵌套的子对象，返回新对象
 * @param object 要复制的对象
 * @desc > 出于性能考虑，此函数不会复制不可枚举成员、函数和正则表达式
 * @example deepClone({x: 3, y: [5]}) // {x: 3, y: [5]}
 */
export function deepClone<T>(object: T, _cloned?: Map<any, any>): T {
	if (typeof object === "object" && object !== null) {
		if (_cloned?.has(object)) {
			return _cloned.get(object)
		}
		if (object instanceof Array) {
			const oldObj = object
			if (!_cloned) _cloned = new Map()
			_cloned.set(oldObj, object = [] as any)
			for (let i = 0; i < oldObj.length; i++) {
				object[i] = deepClone(oldObj[i], _cloned)
			}
		} else if (object instanceof Date) {
			object = new Date(+object) as any
		} else if (!(object instanceof RegExp)) {
			const oldObj = object
			if (!_cloned) _cloned = new Map()
			_cloned.set(object, object = Object.create(Object.getPrototypeOf(object)))
			for (const key in oldObj) {
				object[key] = deepClone(oldObj[key], _cloned)
			}
		}
	}
	return object
}

/**
 * 判断两个引用对象的内容是否相同
 * @param left 比较的左侧
 * @param right 比较的右侧
 * @example deepEqual([1], [1]) // true
 */
export function deepEquals(left: any, right: any, _checked?: Map<any, Set<any>>) {
	if (typeof left === "object" && typeof right === "object" && left !== null && right !== null) {
		_checked ??= new Map()
		const exists = _checked.get(left)
		if (exists) {
			if (exists.has(right)) {
				return true
			}
			exists.add(right)
		} else {
			_checked.set(left, new Set([right]))
		}
		if (Array.isArray(left) && Array.isArray(left)) {
			if (left.length !== right.length) {
				return false
			}
			for (let i = 0; i < left.length; i++) {
				if (!deepEquals(left[i], right[i], _checked)) {
					return false
				}
			}
			return true
		}
		for (const key in left) {
			if (!deepEquals(left[key], right[key], _checked)) {
				return false
			}
		}
		for (const key in right) {
			if (!deepEquals(left[key], right[key], _checked)) {
				return false
			}
		}
		return true
	}
	return left === right
}

/**
 * 判断指定的父对象是否包含子对象的所有属性且这些属性具有相同的值
 * @param parent 要判断的父对象
 * @param child 要判断的子对象
 * @example matches({x: 0, y: 1}, {x: 0}) // true
 * @example matches({x: 0, y: 1}, {x: 0, z: 0}) // false
 */
export function matches(parent: any, child: any, _checked?: Map<any, Set<any>>) {
	if (typeof parent === "object" && typeof child === "object" && parent !== null && child !== null) {
		_checked ??= new Map()
		const exists = _checked.get(parent)
		if (exists) {
			if (exists.has(child)) {
				return true
			}
			exists.add(child)
		} else {
			_checked.set(parent, new Set([child]))
		}
		for (const key in child) {
			if (!matches(parent[key], child[key])) {
				return false
			}
		}
		return true
	}
	return parent === child
}

/**
 * 比较两个对象的第一层差异
 * @param left 比较的左侧
 * @param right 比较的右侧
 * @example compare({x: 1, y: 1, p: {y: 1}}, {x: 1, z: 2, p: {z: 2}}}) // {left: ["y"], right: ["z"], both: ["p"]}
 */
export function compare(left: any, right: any) {
	const result = {
		/** 仅在左侧存在的字段 */
		left: [] as string[],
		/** 仅在右侧存在的字段 */
		right: [] as string[],
		/** 在左右侧同时存在但值不同的字段 */
		both: [] as string[],
	}
	for (const key in left) {
		if (!(key in right)) {
			result.left.push(key)
		} else if (left[key] !== right[key]) {
			result.both.push(key)
		}
	}
	for (const key in right) {
		if (!(key in left)) {
			result.right.push(key)
		}
	}
	return result
}

/**
 * 递归比较两个对象的差异
 * @param left 比较的左侧
 * @param right 比较的右侧
 * @param depth 比较的最大深度，超过此深度后的差异将被忽略
 * @example deepCompare({x: 1, p: {y: 1}}, {x: 1, p: {z: 2}}) // {left: ["p.y"], right: ["p.z"], both: []}
 */
export function deepCompare(left: any, right: any, depth = Infinity) {
	const result = {
		/** 仅在左侧存在的字段 */
		left: [] as string[],
		/** 仅在右侧存在的字段 */
		right: [] as string[],
		/** 在左右侧同时存在但值不同的字段 */
		both: [] as string[],
	}
	const checked = new Map<any, Set<any>>()
	diff(left, right, "", depth)
	return result

	function diff(left: any, right: any, prefix: string, depth: number) {
		if (depth-- === 0) {
			return
		}
		const exists = checked.get(left)
		if (exists) {
			if (exists.has(right)) {
				return true
			}
			exists.add(right)
		} else {
			checked.set(left, new Set([right]))
		}
		for (const key in left) {
			if (!(key in right)) {
				result.left.push(prefix + key)
			} else if (left[key] !== right[key]) {
				if (typeof left[key] !== "object" || typeof right[key] !== "object") {
					result.both.push(prefix + key)
				} else {
					diff(left[key], right[key], prefix + key + ".", depth)
				}
			}
		}
		for (const key in right) {
			if (!(key in left)) {
				result.right.push(prefix + key)
			}
		}
	}
}

/**
 * 获取对象自身或原型链上的属性描述符
 * @param object 要获取的对象
 * @param key 要获取的属性名
 */
export function getPropertyDescriptor(object: any, key: PropertyKey) {
	let desc: PropertyDescriptor | undefined
	while (object != null && !(desc = Object.getOwnPropertyDescriptor(object, key))) {
		object = Object.getPrototypeOf(object)
	}
	return desc
}

/** 获取对象所有键的类型 */
export type KeyOf<T> = T extends any[] ? string : Extract<keyof T, string>

/** 获取对象所有值的类型 */
export type ValueOf<T> = T extends (infer R)[] ? R : T[Extract<keyof T, string>]

/**
 * 遍历对象的每个属性并执行回调函数
 * @param object 要遍历的对象
 * @param callback 要执行的回调函数
 * @param callback.value 当前正在遍历的项
 * @param callback.key 当前正在遍历的键
 * @param callback.target 当前正在遍历的目标对象
 * @param callback.return 函数可以返回 `false` 终止遍历
 * @param thisArg 指定回调函数中 `this` 的值
 * @returns 如果遍历是因为回调函数返回 `false` 而终止，则返回 `false`，否则返回 `true`
 * @example each({x: 1, y: 2}, console.log, console) // 打印“x  1”和“y  2”
 */
export function each<T>(object: T, callback: (value: ValueOf<T>, key: KeyOf<T>, target: T) => boolean | void, thisArg?: any) {
	for (const key in object) {
		if (callback.call(thisArg, object[key] as any, key as any, object) === false) {
			return false
		}
	}
	return true
}

/**
 * 从右往左遍历对象并执行指定的函数
 * @param object 要遍历的对象
 * @param callback 要执行的回调函数
 * @param callback.value 当前正在遍历的项
 * @param callback.key 当前正在遍历的键
 * @param callback.target 当前正在遍历的目标对象
 * @param callback.return 函数可以返回 `false` 终止遍历
 * @param thisArg 指定回调函数中 `this` 的值
 * @returns 如果遍历是因为回调函数返回 `false` 而终止，则返回 `false`，否则返回 `true`
 * @example each({x: 1, y: 2}, console.log, console); // 打印“x  1”和“y  2”
 */
export function eachRight<T>(object: T, callback: (value: ValueOf<T>, key: KeyOf<T>, target: T) => boolean | void, thisArg?: any) {
	const keys = Object.keys(object) as Extract<keyof T, string>[]
	for (let i = keys.length; --i >= 0;) {
		const key = keys[i]
		if (callback.call(thisArg, object[key] as any, key as any, object) === false) {
			return false
		}
	}
	return true
}

/**
 * 遍历对象并执行指定的函数
 * @param object 要遍历的对象
 * @param callback 要执行的回调函数
 * @param callback.value 当前正在遍历的项
 * @param callback.key 当前正在遍历的键
 * @param callback.target 当前正在遍历的目标对象
 * @param thisArg 指定回调函数中 `this` 的值
 * @example forEach({x: 1, y: 2}, console.log, console); // 打印“x  1”和“y  2”
 */
export function forEach<T>(object: T, callback: (value: ValueOf<T>, key: KeyOf<T>, target: T) => boolean | void, thisArg?: any) {
	for (const key in object) {
		callback.call(thisArg, object[key] as any, key as any, object)
	}
}

/**
 * 从右往左遍历对象并执行指定的函数
 * @param object 要遍历的对象
 * @param callback 要执行的回调函数
 * @param callback.value 当前正在遍历的项
 * @param callback.key 当前正在遍历的键
 * @param callback.target 当前正在遍历的目标对象
 * @param thisArg 指定回调函数中 `this` 的值
 * @example forEach({x: 1, y: 2}, console.log, console); // 打印“x  1”和“y  2”
 */
export function forEachRight<T>(object: T, callback: (value: ValueOf<T>, key: KeyOf<T>, target: T) => boolean | void, thisArg?: any) {
	const keys = Object.keys(object) as Extract<keyof T, string>[]
	for (let i = keys.length; --i >= 0;) {
		const key = keys[i]
		callback.call(thisArg, object[key] as any, key as any, object)
	}
}

/**
 * 筛选对象中符合条件的项并组成一个新对象
 * @param object 要遍历的对象
 * @param callback 用于确定每一项是否符合条件的回调函数
 * @param callback.value 当前正在遍历的项
 * @param callback.key 当前正在遍历的键
 * @param callback.target 当前正在遍历的目标对象
 * @param callback.return 如果如果当前项符合条件则返回 `true`，否则返回 `false`
 * @param thisArg 指定回调函数中 `this` 的值
 * @example filter({x: 1, y: 2}, item => item > 1) // {y: 2}
 */
export function filter<T>(object: T, callback: (value: ValueOf<T>, key: KeyOf<T>, target: T) => boolean, thisArg?: any) {
	const result = {} as Partial<T>
	for (const key in object) {
		if (callback.call(thisArg, object[key] as any, key as any, object)) {
			result[key] = object[key]
		}
	}
	return result
}

/**
 * 遍历对象并执行指定的函数，返回由函数返回值组成的新对象
 * @param object 要遍历的对象
 * @param callback 用于确定每一项是否符合条件的回调函数
 * @param callback.value 当前正在遍历的项
 * @param callback.key 当前正在遍历的键
 * @param callback.target 当前正在遍历的目标对象
 * @param callback.return 要返回的新值
 * @param thisArg 指定回调函数中 `this` 的值
 * @example map({x: 1, y: 2}, x => x + 10) // {x: 11, y: 12}
 */
export function map<T, R>(object: T, callback: (value: ValueOf<T>, key: KeyOf<T>, target: T) => R, thisArg?: any) {
	const result = {} as { [key in keyof T]: R }
	for (const key in object) {
		result[key] = callback.call(thisArg, object[key] as any, key as any, object)
	}
	return result
}

/**
 * 判断对象中的每一项是否都符合条件
 * @param object 要遍历的对象
 * @param callback 用于确定每一项是否符合条件的回调函数
 * @param callback.value 当前正在遍历的项
 * @param callback.key 当前正在遍历的键
 * @param callback.target 当前正在遍历的目标对象
 * @param callback.return 如果如果当前项符合条件则返回 `true`，否则返回 `false`
 * @param thisArg 指定回调函数中 `this` 的值
 * @example every({x: 1, y: 2}, item => item > 0) // true
 * @example every({x: 1, y: 2}, item => item > 1) // false
 */
export function every<T>(object: T, callback: (value: ValueOf<T>, key: KeyOf<T>, target: T) => boolean, thisArg?: any) {
	for (const key in object) {
		if (!callback.call(thisArg, object[key] as any, key as any, object)) {
			return false
		}
	}
	return true
}

/**
 * 判断对象中是否存在一项或多项符合条件
 * @param object 要遍历的对象
 * @param callback 用于确定每一项是否符合条件的回调函数
 * @param callback.value 当前正在遍历的项
 * @param callback.key 当前正在遍历的键
 * @param callback.target 当前正在遍历的目标对象
 * @param callback.return 如果如果当前项符合条件则返回 `true`，否则返回 `false`
 * @param thisArg 指定回调函数中 `this` 的值
 * @example some({x: 1, y: 2}, item => item > 1) // true
 * @example some({x: 1, y: 2}, item => item > 2) // false
 */
export function some<T>(object: T, callback: (value: ValueOf<T>, key: KeyOf<T>, target: T) => boolean, thisArg?: any) {
	for (const key in object) {
		if (callback.call(thisArg, object[key] as any, key as any, object)) {
			return true
		}
	}
	return false
}

/**
 * 返回对象中符合条件的第一项，如果找不到则返回 `undefined`
 * @param object 要遍历的对象
 * @param callback 用于确定每一项是否符合条件的回调函数
 * @param callback.value 当前正在遍历的项
 * @param callback.key 当前正在遍历的键
 * @param callback.target 当前正在遍历的目标对象
 * @param callback.return 如果如果当前项符合条件则返回 `true`，否则返回 `false`
 * @param thisArg 指定回调函数中 `this` 的值
 * @example find({x: 1, y: 2}, item => item > 0) // 1
 */
export function find<T>(object: T, callback: (value: ValueOf<T>, key: KeyOf<T>, target: T) => boolean, thisArg?: any) {
	for (const key in object) {
		const value = object[key]
		if (callback.call(thisArg, value as any, key as any, object)) {
			return value
		}
	}
}

/**
 * 返回对象中符合条件的最后一项，如果找不到则返回 `undefined`
 * @param object 要遍历的对象
 * @param callback 用于确定每一项是否符合条件的回调函数
 * @param callback.value 当前正在遍历的项
 * @param callback.key 当前正在遍历的键
 * @param callback.target 当前正在遍历的目标对象
 * @param callback.return 如果如果当前项符合条件则返回 `true`，否则返回 `false`
 * @param thisArg 指定回调函数中 `this` 的值
 * @example findLast({x: 1, y: 2}, item => item > 0) // 1
 */
export function findLast<T>(object: T, callback: (value: ValueOf<T>, key: KeyOf<T>, target: T) => boolean, thisArg?: any) {
	const keys = Object.keys(object) as Extract<keyof T, string>[]
	for (let i = keys.length; --i >= 0;) {
		const key = keys[i]
		const value = object[key]
		if (callback.call(thisArg, value as any, key as any, object)) {
			return value
		}
	}
}

/**
 * 返回对象中符合条件的第一项的键，如果找不到则返回 `undefined`
 * @param object 要遍历的对象
 * @param callback 用于确定每一项是否符合条件的回调函数
 * @param callback.value 当前正在遍历的项
 * @param callback.key 当前正在遍历的键
 * @param callback.target 当前正在遍历的目标对象
 * @param callback.return 如果如果当前项符合条件则返回 `true`，否则返回 `false`
 * @param thisArg 指定回调函数中 `this` 的值
 * @example findKey({x: 1, y: 2}, item => item > 0) // "x"
 */
export function findKey<T>(object: T, callback: (value: ValueOf<T>, key: KeyOf<T>, target: T) => boolean, thisArg?: any) {
	for (const key in object) {
		if (callback.call(thisArg, object[key] as any, key as any, object)) {
			return key
		}
	}
}

/**
 * 返回对象中符合条件的最后一项的键，如果找不到则返回 `undefined`
 * @param object 要遍历的对象
 * @param callback 用于确定每一项是否符合条件的回调函数
 * @param callback.value 当前正在遍历的项
 * @param callback.key 当前正在遍历的键
 * @param callback.target 当前正在遍历的目标对象
 * @param callback.return 如果如果当前项符合条件则返回 `true`，否则返回 `false`
 * @param thisArg 指定回调函数中 `this` 的值
 * @example findLastKey({x: 1, y: 2}, item => item > 0) // "x"
 */
export function findLastKey<T>(object: T, callback: (value: ValueOf<T>, key: KeyOf<T>, target: T) => boolean, thisArg?: any) {
	const keys = Object.keys(object) as Extract<keyof T, string>[]
	for (let i = keys.length; --i >= 0;) {
		const key = keys[i]
		if (callback.call(thisArg, object[key] as any, key as any, object)) {
			return key
		}
	}
}

/**
 * 从左往右依次合并对象中的每一项并最终返回一个值
 * @param object 要遍历的对象
 * @param callback 用于确定每一项是否符合条件的回调函数
 * @param callback.previousValue 上一次返回的值
 * @param callback.currentValue 当前正在遍历的项
 * @param callback.key 当前正在遍历的键
 * @param callback.target 当前正在遍历的目标对象
 * @param callback.return 如果如果当前项符合条件则返回 `true`，否则返回 `false`
 * @param initialValue 用于合并第一项的初始值
 * @param thisArg 指定回调函数中 `this` 的值
 * @example reduce({x: 1, x: 2}, (x, y) => x + y) // 3
 * @example reduce({x: 1, x: 2}, (x, y) => x + y, 10) // 13
 */
export function reduce<T, R>(object: T, callback: (previousValue: R, currentValue: ValueOf<T>, key: KeyOf<T>, target: T) => R, initialValue?: R, thisArg?: any): R | undefined {
	let result: R | undefined
	let first = true
	for (const key in object) {
		if (first) {
			first = false
			result = initialValue === undefined ? object[key] as any : callback.call(thisArg, initialValue, object[key] as any, key as any, object)
		} else {
			result = callback.call(thisArg, result!, object[key] as any, key as any, object)
		}
	}
	return result
}

/**
 * 从右往左依次合并对象中的每一项并最终返回一个值
 * @param object 要遍历的对象
 * @param callback 用于确定每一项是否符合条件的回调函数
 * @param callback.previousValue 上一次返回的值
 * @param callback.currentValue 当前正在遍历的项
 * @param callback.key 当前正在遍历的键
 * @param callback.target 当前正在遍历的目标对象
 * @param callback.return 如果如果当前项符合条件则返回 `true`，否则返回 `false`
 * @param initialValue 用于合并第一项的初始值
 * @param thisArg 指定回调函数中 `this` 的值
 * @example reduceRight({x: 1, x: 2}, (x, y) => x + y) // 3
 * @example reduceRight({x: 1, x: 2}, (x, y) => x + y, 10) // 13
 */
export function reduceRight<T, R>(object: T, callback: (previousValue: R, currentValue: ValueOf<T>, key: KeyOf<T>, target: T) => R, initialValue?: R, thisArg?: any) {
	let result: R | undefined
	let first = true
	const keys = Object.keys(object) as Extract<keyof T, string>[]
	for (let i = keys.length; --i >= 0;) {
		const key = keys[i]
		if (first) {
			first = false
			result = initialValue === undefined ? object[key] as any : callback.call(thisArg, initialValue, object[key] as any, key as any, object)
		} else {
			result = callback.call(thisArg, result!, object[key] as any, key as any, object)
		}
	}
	return result
}

/**
 * 将多级的对象合并为一级的对象
 * @param object 要处理的对象
 * @param prefix 每个键的前缀
 * @desc > 注意对象中不允许存在循环引用
 * @example flat({x: {y: {z: 1}}, other: 1}) // { "x.y.z": 1, other: 1 }
 */
export function flat(object: any, prefix = "") {
	const result: { [key: string]: any } = {}
	for (const key in object) {
		const value = object[key]
		const newKey = prefix + key
		if (typeof value === "object") {
			Object.assign(result, flat(value, newKey + "."))
		} else {
			result[newKey] = value
		}
	}
	return result
}

/**
 * 将一级的对象展开为多级对象
 * @param object 要处理的对象
 * @param prefix 每个键的前缀
 * @example unflat({"x.y.z": 1, other: 1 }) // {x: {y: {z: 1}}, other: 1}
 */
export function unflat(object: any) {
	const result: { [key: string]: any } = {}
	for (const key in object) {
		set(result, key, object[key])
	}
	return result
}

/**
 * 重命名对象的指定键并返回新对象
 * @param object 要处理的对象
 * @param maps 重命名的映射表
 * @example renameKeys({x: 0}, {x: "y"}) // {y: 0}
 */
export function renameKeys<T>(object: T, maps: { [key in keyof T]?: PropertyKey }) {
	const result = {} as { [key: string]: T[keyof T] }
	for (const key in object) {
		result[maps[key] ?? key as any] = object[key]
	}
	return result
}

/**
 * 获取对象中指定属性的值
 * @param object 目标对象
 * @param expression 要获取的属性表达式，如 `x.y[0]`
 * @example get({x: {y: 0}}, "x.y") // 0
 */
export function get(object: any, expression: string) {
	expression.replace(/\.?\s*([^\.\[]+)|\[\s*([^\]]*)\s*\]/g, ((_: string, propName: string, indexer: string) => {
		if (object != null) {
			object = object[propName || indexer]
		}
	}) as any)
	return object
}

/**
 * 设置对象中指定属性的值
 * @param object 目标对象
 * @param expression 要设置的属性表达式，如 `x.y[0]`
 * @param value 要设置的值
 * @example set({}, "x[1].z", 2) // {x: [undefined, {z: 2}]}
 */
export function set(object: any, expression: string, value: any) {
	let prevObject: any
	let prevKey: string
	expression.replace(/\.?\s*([^\.\[]+)|\[\s*([^\]]*)\s*\]/g, ((source: string, propName: string | undefined, indexer: string | undefined, index: number) => {
		let currentObject = prevKey ? prevObject[prevKey] : object
		if (currentObject == null) {
			currentObject = indexer ? [] : {}
			if (prevKey) {
				prevObject[prevKey] = currentObject
			} else {
				prevObject = object = currentObject
			}
		}
		prevObject = currentObject
		prevKey = propName || indexer!
		if (index + source.length === expression.length) {
			currentObject[prevKey] = value
		}
	}) as any)
}

/**
 * 强制覆盖对象的属性值
 * @param object 要处理的对象
 * @param key 要设置的属性名
 * @param value 要设置的属性值
 * @returns 返回对象本身
 * @example setProperty({x: 1}, "x", 0)
 */
export function setProperty(object: any, key: PropertyKey, value: any) {
	return Object.defineProperty(object, key, {
		value: value,
		writable: true,
		enumerable: true,
		configurable: true
	})
}

/**
 * 合并所有对象，如果两个对象包含同名的数组，则将这些数组合并为一个
 * @param target 要合并的目标对象
 * @param sources 要合并的源对象
 * @example merge({x: [0], y: 0}, {x: [1], y: 2}) // {x: [0, 1], y: 2}
 */
export function merge<T, S>(target: T, ...sources: S[]) {
	const cloned = new Map()
	for (const source of sources) {
		target = merge(target, source)
	}
	return target

	function merge(target: any, source: any) {
		if (typeof target === "object" && typeof source === "object") {
			if (Array.isArray(target) && Array.isArray(source)) {
				return [...target, ...source]
			}
			const exists = cloned.get(source)
			if (exists !== undefined) {
				return exists
			}
			const result: { [key: string]: any } = { ...target }
			cloned.set(source, result)
			for (const key in source) {
				result[key] = merge(result[key], source[key])
			}
			return result
		}
		return source
	}
}

/**
 * 将源对象中的所有可枚举属性复制到目标对象，但跳过目标对象中已存在的属性
 * @param target 要复制的目标对象
 * @param source 要复制的源对象，源对象可以是 `null` 或 `undefined`
 * @example assignIfNotExists({x: 1}, {x: 2, y: 2}) // {x: 1, y: 2}
 */
export function assignIfNotExists<T, S>(target: T, source: S) {
	for (const key in source) {
		if (target[key as any] === undefined) {
			target[key as any] = source[key]
		}
	}
	return target as T & S
}

/**
 * 在对象指定的键之前插入一个键值对
 * @param object 要处理的对象
 * @param newKey 要插入的键
 * @param newValue 要插入的值
 * @param refKey 指示插入位置的键，将在该键前插入，如果指定为空则插入到末尾
 * @example insertBefore({x: 1}, "y", 2, "x") // {y: 2, x: 1}
 */
export function insertBefore<T>(object: T, newKey: PropertyKey, newValue: any, refKey?: keyof T) {
	let tmpObj: any
	for (const key in object) {
		if (key === refKey) {
			tmpObj = {}
		}
		if (tmpObj) {
			tmpObj[key] = object[key]
			delete object[key]
		}
	}
	object[newKey] = newValue
	for (const key in tmpObj) {
		object[key] = tmpObj[key]
	}
}

/**
 * 清空对象中的所有键
 * @param object 要处理的对象
 * @example clear({x: undefined, y: null, z: 1}) // {}
 */
export function clear(object: { [key: string]: any }) {
	for (const key in object) {
		delete object[key]
	}
	return object as {}
}

/**
 * 删除对象中值为 `null` 或 `undefined` 和空字符串、数组的键并返回新对象
 * @param object 要处理的对象
 * @example clean({x: undefined, y: null, z: 1}) // {z: 1}
 */
export function clean<T>(object: T, _cloned?: Map<any, any>): T | undefined {
	if (typeof object === "object") {
		_cloned ??= new Map()
		const exists = _cloned.get(object)
		if (exists !== undefined) {
			return exists
		}
		if (Array.isArray(object)) {
			const result: any[] = []
			_cloned.set(object, result)
			for (let i = 0; i < object.length; i++) {
				result[i] = clean(object[i], _cloned)
			}
			return result as any
		}
		const result: any = {}
		_cloned.set(object, result)
		let isEmpty = true
		for (const key in object) {
			const value = clean(object[key])
			if (value == undefined) {
				continue
			}
			result[key] = value
			isEmpty = false
		}
		return isEmpty ? undefined : result
	}
	if (typeof object === "string" && object.length === 0) {
		return undefined
	}
	return object
}

/**
 * 添加调用指定成员函数后的回调函数
 * @param object 要处理的对象
 * @param key 要设置的成员函数名
 * @param callback 要设置的回调函数，参数同原函数，如果原函数返回 `undefined` 则返回该函数的返回值
 * @returns 返回回调函数
 * @example
 * const object = { x() { console.log(1) } }
 * addCallback(object, "x", () => { console.log(2) } )
 * object.x() // 输出 1, 2
 */
export function addCallback<T, K extends keyof T>(object: T, key: K, callback: T[K] extends Function ? T[K] : Function) {
	const oldFunc = object[key] as any as Function
	return object[key] = oldFunc ? function (this: any) {
		const oldResult = oldFunc.apply(this, arguments)
		const newResult = callback.apply(this, arguments)
		return oldResult !== undefined ? oldResult : newResult
	} : callback as any
}

/**
 * 添加设置指定属性后的回调函数
 * @param object 要处理的对象
 * @param key 要设置的属性名
 * @param callback 要设置的回调函数
 * @param callback.value 要设置的新属性值
 * @returns 返回对象本身
 */
export function addSetCallback<T, K extends keyof T>(object: T, key: K, callback: (this: T, value: T[K]) => void) {
	const descriptor = getPropertyDescriptor(object, key) || { configurable: true, enumerable: true, writable: true }
	let newDescriptor: PropertyDescriptor & ThisType<any>
	if (descriptor.get || descriptor.set) {
		newDescriptor = {
			...descriptor,
			set(value) {
				if (descriptor.set) {
					descriptor.set.call(this, value)
				}
				callback.call(this, value)
			}
		}
	} else {
		let currentValue = descriptor.value
		newDescriptor = {
			configurable: descriptor.configurable,
			enumerable: descriptor.enumerable,
			get() {
				return currentValue
			},
			set(value) {
				currentValue = value
				callback.call(this, value)
			}
		}
	}
	return Object.defineProperty(object, key, newDescriptor)
}