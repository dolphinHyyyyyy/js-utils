/**
 * 创建一个等差数列组成的数组
 * @param start 开始的数值
 * @param end 结束的数值（不含）
 * @param step 相邻数值的增幅，增幅不得为 0
 * @example range(0, 6) // [0, 1, 2, 3, 4, 5]
 * @example range(2, 11, 3) // [2, 5, 8]
 */
export function range(start: number, end: number, step = 1) {
	const result: number[] = []
	if (step > 0) {
		if (start > end) {
			[start, end] = [end + step, start + step]
		}
		for (; start < end; start += step) {
			result.push(start)
		}
	} else if (step < 0) {
		if (start < end) {
			[start, end] = [end + step, start + step]
		}
		for (; start > end; start += step) {
			result.push(start)
		}
	}
	return result
}

/**
 * 如果数组中不存在指定的项，则添加到数组末尾
 * @param array 要处理的数组
 * @param item 要添加的项
 * @returns 如果已添加到数组则返回 `true`，如果该项已存在则返回 `false`
 * @example pushIfNotExists(1, 9, 0], 1) // 数组变成 [1, 9, 0]
 * @example pushIfNotExists([1, 9, 0], 2) // 数组变成 [1, 9, 0, 2]
 */
export function pushIfNotExists<T>(array: T[], item: T) {
	if (array.indexOf(item) >= 0) {
		return false
	}
	array.push(item)
	return true
}

/**
 * 在数组的指定位置插入项
 * @param array 要处理的数组
 * @param index 要插入的索引（从 0 开始），如果索引超出数组的长度，则插入到末尾
 * @param item 要插入的项
 * @example insert(["I", "you"], 1, "love") // 数组变成 ["I", "love", "you"]
 */
export function insert<T>(array: T[], index: number, item: T) {
	array.splice(index, 0, item)
}

/**
 * 根据顺序将项插入到已排序的数组中
 * @param array 要处理的数组
 * @param item 要插入的项
 * @param keySelector 用于获取每项元素待比较的键的回调函数
 * @param keyComparer 用于确定两个键排序顺序的回调函数
 * @param keyComparer.left 要比较的左值
 * @param keyComparer.right 要比较的右值
 * @param keyComparer.return 如果左值应排在右值前面，则返回负数，如果左值应排在右值后面，则返回正数，如果两者相对位置不变则返回零
 */
export function insertSorted<T, K>(array: T[], item: T, keySelector = (item: T) => item as unknown as K, keyComparer = (left: K, right: K) => left < right ? -1 : left > right ? 1 : 0) {
	const index = binarySearch(array, item, keySelector, keyComparer)
	array.splice(index < 0 ? ~index : index, 0, item)
}

/**
 * 如果数组中不存在指定的项，则根据顺序将项插入到已排序的数组中
 * @param array 要处理的数组
 * @param item 要插入的项
 * @param keySelector 用于获取每项元素待比较的键的回调函数
 * @param keyComparer 用于确定两个键排序顺序的回调函数
 * @param keyComparer.left 要比较的左值
 * @param keyComparer.right 要比较的右值
 * @param keyComparer.return 如果左值应排在右值前面，应返回负数，如果右值应排在右值后面，应返回正数，如果两者相同则返回零
 * @returns 如果已添加到数组则返回 `true`，否则说明该项已存在，返回 `false`
 */
export function insertSortedIfNotExists<T, K>(array: T[], item: T, keySelector = (item: T) => item as unknown as K, keyComparer = (left: K, right: K) => left < right ? -1 : left > right ? 1 : 0) {
	if (!array.length) {
		array.push(item)
		return true
	}
	const lastResult = keyComparer(keySelector(array[array.length - 1]), keySelector(item))
	if (lastResult <= 0) {
		if (lastResult === 0) {
			return false
		}
		array.push(item)
		return true
	}
	const index = binarySearch(array, item, keySelector, keyComparer)
	if (index >= 0) {
		return false
	}
	array.splice(~index, 0, item)
	return true
}

/**
 * 删除数组中指定位置的项
 * @param array 要处理的数组
 * @param index 要删除的索引（从 0 开始）
 */
export function removeAt<T>(array: T[], index: number) {
	array.splice(index, 1)
}

/**
 * 删除数组中指定的项，如果有多个匹配项则只删除第一个
 * @param array 要处理的数组
 * @param item 要删除的项
 * @param startIndex 开始搜索的索引（从 0 开始）
 * @returns 返回被删除的项在原数组中的索引，如果数组中找不到指定的项则返回 `-1`
 * @example remove([1, 9, 9, 0], 9) // 1, 数组变成 [1, 9, 0]
 * @example while(remove(array, "wow") >= 0) {} // 删除所有 "wow"
 */
export function remove<T>(array: T[], item: T, startIndex?: number) {
	startIndex = array.indexOf(item, startIndex)
	if (startIndex >= 0) array.splice(startIndex, 1)
	return startIndex
}

/**
 * 删除数组中指定的项，如果有多个匹配项则全部删除
 * @param array 要处理的数组
 * @param item 要删除的项
 * @param startIndex 开始搜索的索引（从 0 开始）
 * @returns 返回被删除的项数
 * @example removeAll([1, 9, 9, 0], 9) // 数组变成 [1, 0]
 */
export function removeAll<T>(array: T[], item: T, startIndex = 0) {
	let index = 0
	for (let i = startIndex; i < array.length; i++) {
		if (array[i] === item) {
			continue
		}
		if (i !== index) {
			array[index] = array[i]
		}
		index++
	}
	const count = array.length - index
	if (count) {
		array.length = index
	}
	return count
}

/**
 * 在已排序的数组中删除指定的项，如果有多个匹配项则只删除第一个
 * @param array 要处理的数组
 * @param item 要删除的项
 * @param keySelector 用于获取每项元素待比较的键的回调函数
 * @param keyComparer 用于确定两个键排序顺序的回调函数
 * @param keyComparer.left 要比较的左值
 * @param keyComparer.right 要比较的右值
 * @param keyComparer.return 如果左值应排在右值前面，应返回负数，如果右值应排在右值后面，应返回正数，如果两者相同则返回零
 * @returns 返回被删除的项在原数组中的索引，如果数组中找不到指定的项则返回负数
 */
export function removeSorted<T, K>(array: T[], item: T, keySelector?: (item: T) => K, keyComparer?: (x: K, y: K) => number) {
	const index = binarySearch(array, item, keySelector, keyComparer)
	if (index >= 0) {
		array.splice(index, 1)
	}
	return index
}

/**
 * 删除数组中值为 `null` 或 `undefined` 的项
 * @param array 要处理的数组
 * @example clean(["", false, 0, undefined, null, {}]) // ["", false, 0, {}]
 */
export function clean<T>(array: T[]) {
	for (let i = array.length; --i >= 0;) {
		if (array[i] == null) {
			array.splice(i, 1)
		}
	}
	return array
}

/**
 * 删除数组中的重复项并返回新数组
 * @param array 要处理的数组
 * @example unique([1, 9, 9, 0]) // [1, 9, 0]
 */
export function unique<T>(array: readonly T[]) {
	const result: T[] = []
	for (const value of array) {
		if (result.indexOf(value) < 0) result.push(value)
	}
	return result
}

/**
 * 查找并返回数组中的不重复项
 * @param array 要处理的数组
 * @example filterNonUnique([1, 2, 2, 3, 4, 4, 5]) // [1, 3, 5]
 */
export function filterNonUnique<T>(array: readonly T[]) {
	return array.filter(i => array.indexOf(i) === array.lastIndexOf(i))
}

/**
 * 交换数组中的两个项
 * @param array 要处理的数组
 * @param index1 要交换的第一个项的索引
 * @param index2 要交换的第二个项的索引
 * @example swap([1, 2, 3], 1, 2)
 */
export function swap<T>(array: T[], index1: number, index2: number) {
	const t = array[index1]
	array[index1] = array[index2]
	array[index2] = t
}

/**
 * 遍历并更新一个只读数组，如果任一项被更新则返回新数组，否则返回原数组
 * @param array 要处理的数组
 * @param callback 用于更新每一项的回调函数
 * @param callback.item 当前项的值
 * @param callback.index 当前项的索引（从 0 开始）
 */
export function update<T>(array: readonly T[], callback: (item: T, index: number) => T) {
	let result = array as T[]
	for (let i = 0; i < array.length; i++) {
		const oldItem = array[i]
		const newItem = callback(oldItem, i)
		if (newItem !== oldItem && result === array) {
			result = array.slice(0, i)
		}
		if (result !== array) {
			result[i] = newItem
		}
	}
	return result
}

/**
 * 从数组的每项获取一个值并组成一个新数组，其中 `undefined` 会被忽略
 * @param array 要处理的数组
 * @param key 用于取值的键名或自定义函数
 * @param key.item 当前项的值
 * @param key.index 当前项的索引（从 0 开始）
 * @example select([{"user": "fred"}, {"user": "bred"}, {"user": undefined}], "user") // ["fred", "bred"]
 * @example select([{"user": "fred"}, {"user": "bred"}, {"user": undefined}], o => o.user) // ["fred", "bred"]
 */
export function select<T, K extends ((item: T, index: number) => any) | keyof T>(array: readonly T[], key: K) {
	const result: (K extends ((...args: any) => infer R) ? R : K extends keyof T ? T[K] : undefined)[] = []
	for (let i = 0; i < array.length; i++) {
		const value = typeof key === "function" ? (key as Exclude<K, PropertyKey>)(array[i], i) : array[i][key as keyof T]
		if (value !== undefined) {
			result.push(value)
		}
	}
	return result
}

/**
 * 从数组中随机取值，如果数组为空则返回 `undefined`
 * @param array 要处理的数组
 * @example randomGet([1, 2, 3])
 */
export function randomGet<T>(array: readonly T[]) {
	return array[Math.floor(array.length * Math.random())]
}

/**
 * 在已排序的数组中二分查找指定的项，如果找到则返回该项的位置，否则返回离该值最近的位置的位反值（总是小于 0）
 * @param array 要遍历的数组
 * @param item 要查找的项
 * @param keySelector 用于获取每项元素待比较的键的回调函数
 * @param keyComparer 用于确定两个键排序顺序的回调函数
 * @param keyComparer.left 要比较的左值
 * @param keyComparer.right 要比较的右值
 * @param keyComparer.return 如果左值应排在右值前面，应返回负数，如果右值应排在右值后面，应返回正数，如果两者相同则返回零
 * @param startIndex 开始查找的索引（从 0 开始）
 * @param endIndex 结束查找的索引（从 0 开始，不含）
 */
export function binarySearch<T, V, K>(array: readonly T[], item: V, keySelector = (item: T | V) => item as unknown as K, keyComparer = (left: K, right: K) => left < right ? -1 : left > right ? 1 : 0 as number, startIndex = 0, endIndex = array.length) {
	endIndex--
	const key = keySelector(item)
	while (startIndex <= endIndex) {
		const middle = startIndex + ((endIndex - startIndex) >> 1)
		const midKey = keySelector(array[middle])
		const result = keyComparer(midKey, key)
		if (result < 0) {
			startIndex = middle + 1
		} else if (result > 0) {
			endIndex = middle - 1
		} else {
			return middle
		}
	}
	return ~startIndex
}

/**
 * 查找数组中最后一个满足条件的项索引，如果找不到则返回 `-1`
 * @param array 要遍历的数组
 * @param callback 判断每项是否符合条件的回调函数
 * @param callback.element 当前正在处理的项
 * @param callback.index 当前正在处理的项索引
 * @param callback.array 正在遍历的数组
 * @param thisArg 回调函数中 `this` 的值
 */
export function findLastIndex<T>(array: T[], callback: (element: T, index: number, array: T[]) => boolean, thisArg?: any) {
	for (let i = array.length - 1; i >= 0; i--) {
		if (callback.call(thisArg, array[i], i, array)) {
			return i
		}
	}
	return -1
}

/**
 * 查找数组中最后一个满足条件的项
 * @param array 要处理的数组
 * @param callback 判断每项是否符合条件的回调函数
 * @param callback.element 当前正在处理的项
 * @param callback.index 当前正在处理的项索引
 * @param callback.array 正在遍历的数组
 * @param thisArg 回调函数中 `this` 的值
 */
export function findLast<T>(array: T[], callback: (element: T, index: number, array: T[]) => boolean, thisArg?: any) {
	for (let i = array.length - 1; i >= 0; i--) {
		if (callback.call(thisArg, array[i], i, array)) {
			return array[i]
		}
	}
}

/**
 * 判断数组中是否存在重复项
 * @param array 要处理的数组
 * @example isUnique([1, 9, 0]) // true
 * @example isUnique([1, 9, 9, 0]) // false
 */
export function isUnique<T>(array: readonly T[]) {
	for (let i = array.length; --i > 0;) {
		if (array.indexOf(array[i - 1], i) >= 0) {
			return false
		}
	}
	return true
}

/**
 * 按每项对应的值进行排序
 * @param array 要处理的数组
 * @param keys 用于取值的键名或自定义函数
 * @param keys.item 当前项的值
 * @example sortBy([{"user": "fred"}, {"user": "bred"}], "user") // [{"user": "bred"}, {"user": "fred"}]
 * @example sortBy([{"user": "fred"}, {"user": "bred"}], o => o.user) // [{"user": "bred"}, {"user": "fred"}]
 */
export function sortBy<T>(array: T[], ...keys: (((item: T) => any) | keyof T)[]) {
	return array.sort((x, y) => {
		for (const key of keys) {
			const valueX = typeof key === "function" ? key(x) : x[key]
			const valueY = typeof key === "function" ? key(y) : y[key]
			if (valueX > valueY) {
				return 1
			}
			if (valueX < valueY) {
				return -1
			}
		}
		return 0
	})
}

/**
 * 按每项对应的值进行倒序排序
 * @param array 要处理的数组
 * @param keys 用于取值的键名或自定义函数
 * @param keys.item 当前项的值
 * @example sortByDesc([{"user":"bred"}, {"user": "fred"}], "user") // [{"user": "fred"}, {"user": "bred"}]
 * @example sortByDesc([{"user":"bred"}, {"user": "fred"}], o => o.user) // [{"user": "fred"}, {"user": "bred"}]
 */
export function sortByDesc<T>(array: T[], ...keys: (((item: T) => any) | keyof T)[]) {
	return array.sort((x, y) => {
		for (const key of keys) {
			const valueX = typeof key === "function" ? key(x) : x[key]
			const valueY = typeof key === "function" ? key(y) : y[key]
			if (valueX > valueY) {
				return -1
			}
			if (valueX < valueY) {
				return 1
			}
		}
		return 0
	})
}

/**
 * 判断数组是否已排序
 * @param array 要处理的数组
 * @param comparer 用于确定两个键排序顺序的回调函数
 * @param comparer.left 要比较的左值
 * @param comparer.right 要比较的右值
 * @param comparer.return 如果左值应排在右值前面，则返回负数，如果左值应排在右值后面，则返回正数，如果两者相对位置不变则返回零
 * @example isSorted([0, 1, 2, 2]) // true
 */
export function isSorted<T>(array: readonly T[], comparer = (left: T, right: T) => left < right ? -1 : left > right ? 1 : 0 as number) {
	for (let i = 1; i < array.length; i++) {
		if (comparer(array[i - 1], array[i]) > 0) {
			return false
		}
	}
	return true
}

/**
 * 计算数组的全排列结果
 * @param array 要处理的数组
 * @returns 返回一个新数组，其每一项都是一种排列方式
 * @example permute([1, 2, 3]) // [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]
 */
export function permute<T>(array: readonly T[]) {
	const result: T[][] = []
	const usedItems: T[] = []
	next(array)
	return result

	function next(input: any) {
		for (let i = 0; i < input.length; i++) {
			const item = input.splice(i, 1)[0]
			usedItems.push(item)
			if (input.length === 0) {
				result.push(usedItems.slice(0))
			}
			next(input)
			input.splice(i, 0, item)
			usedItems.pop()
		}
	}
}

/**
 * 将数组中的项随机打乱
 * @param array 要处理的数组
 * @example shuffle([1, 2, 3])
 */
export function shuffle<T>(array: T[]) {
	let index = array.length
	while (index > 0) {
		const target = Math.floor(Math.random() * index)
		const value = array[--index]
		array[index] = array[target]
		array[target] = value
	}
}

/**
 * 将一个数组等分成多个子数组
 * @param array 要处理的数组
 * @param count 每个子数组的长度
 * @param maxCount 最多允许拆分的组数，如果超出限制后则剩余的项全部添加到最后一个子数组中
 * @returns 返回一个二维数组
 * @example split([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 */
export function split<T>(array: readonly T[], count = 1, maxCount?: number) {
	const result: T[][] = []
	for (let i = 0; i < array.length;) {
		if (maxCount! > 0 && result.length >= maxCount!) {
			result.push(array.slice(i))
			break
		}
		result.push(array.slice(i, i += count))
	}
	return result
}

/**
 * 将多维数组合并为新的一维数组
 * @param array 要处理的数组
 * @param maxDepth 最多展开的层级
 * @desc > 注意不支持循环引用
 * @example deepFlat([[1, 2], [[[3]]]]) // [1, 2, 3]
 */
export function deepFlat(array: readonly any[], maxDepth = Infinity) {
	if (maxDepth <= 0) {
		return array
	}
	const result: any[] = []
	for (const value of array) {
		Array.isArray(value) ? result.push(...deepFlat(value, maxDepth - 1)) : result.push(value)
	}
	return result
}

/**
 * 将所有的键和值一一配对组合新对象
 * @param keys 所有的键
 * @param values 所有的值
 * @example associate(["x", "y"], [1, 2]) // {x: 1, y: 2}
 */
export function associate<K extends PropertyKey, T>(keys: readonly K[], values: readonly T[]) {
	const result = {} as { [key in K]: T }
	const length = Math.min(values.length, keys.length)
	for (let i = 0; i < length; i++) {
		result[keys[i]] = values[i]
	}
	return result
}

/**
 * 获取数组每隔指定个数的项组成的新数组
 * @param array 要处理的数组
 * @param nth 要获取的周期
 * @example nth([1, 2, 3, 4, 5, 6], 2) // [2, 4, 6]
 */
export function nth<T>(array: readonly T[], nth: number) {
	return array.filter((_, i) => i % nth === nth - 1)
}

/**
 * 获取所有数组中公共项组成的无重复项的新数组
 * @param arrs 要处理的所有数组
 * @example intersect([1, 2, 3], [101, 2, 1, 10], [2, 1]) // [1, 2]
 */
export function intersect<T>(...arrs: readonly T[][]) {
	const result: T[] = []
	if (arrs.length) {
		next: for (const item of arrs[0]) {
			for (let i = 1; i < arrs.length; i++) {
				if (arrs[i].indexOf(item) < 0) {
					continue next
				}
			}
			result.push(item)
		}
	}
	return result
}

/**
 * 获取所有数组中出现过的项组成的无重复项的新数组
 * @param arrs 要处理的所有数组
 * @example union([1, 2], [1]) // [1, 2]
 */
export function union<T>(...arrs: readonly T[][]) {
	const result: T[] = []
	for (const array of arrs) {
		for (const item of array) {
			if (result.indexOf(item) < 0) result.push(item)
		}
	}
	return result
}

/**
 * 从数组中删除另一个数组的所有项，返回剩下的项组成的新数组
 * @param array 要处理的数组
 * @param other 需要被删除的项数组
 * @example exclude([1, 2], [1]) // [2]
 */
export function exclude<T>(array: readonly T[], other: readonly T[]) {
	const result: T[] = []
	for (const item of array) {
		if (other.indexOf(item) < 0) result.push(item)
	}
	return result
}

/**
 * 根据条件将元素拆分成两个数组
 * @param array 要处理的数组
 * @param callback 分组函数
 * @param callback.item 当前项的值
 * @param callback.index 当前项的索引（从 0 开始）
 * @param callback.return 如果函数返回 `true` 则分到第一组，否则分到第二组
 * @returns 返回长度为二的数组，每项表示一组
 * @example partition([1, 2, 3], item => item % 2 === 1) // [[1, 3], [2]]
 */
export function partition<T>(array: readonly T[], callback: (item: T, index: number) => boolean) {
	const result: [T[], T[]] = [[], []]
	for (let i = 0; i < array.length; i++) {
		const value = array[i]
		if (callback(value, i)) {
			result[0].push(value)
		} else {
			result[1].push(value)
		}
	}
	return result
}

/**
 * 将返回相同键的项归为一组并返回所有组组成的键值对
 * @param array 要处理的数组
 * @param key 用于取值的键名或自定义函数
 * @param key.item 当前项的值
 * @param key.index 当前项的索引（从 0 开始）
 * @example groupBy([{x: 1}, {x: 1}, {x: 2}], "x") // {1: [{x: 1}, {x: 1}]}, 2: [{x: 1}]}
 */
export function groupBy<T, K extends ((item: T, index: number) => any) | keyof T>(array: readonly T[], key: K) {
	const result = {} as { [key in K extends ((...args: any) => infer R) ? R : K extends keyof T ? T[K] : undefined]: T[] }
	for (let i = 0; i < array.length; i++) {
		const item = array[i]
		const groupKey = typeof key === "function" ? (key as Exclude<K, PropertyKey>)(item, i) : item[key as keyof T]
		const group = result[groupKey]
		if (group) {
			group.push(item)
		} else {
			result[groupKey] = [item]
		}
	}
	return result
}

/**
 * 将返回相同键的项归为一组并返回所有组组成的哈希表
 * @param array 要处理的数组
 * @param key 用于取值的键名或自定义函数
 * @param key.item 当前项的值
 * @param key.index 当前项的索引（从 0 开始）
 * @example groupByToMap([{x: 1}, {x: 1}, {x: 2}], "x")
 */
export function groupByToMap<T, K extends ((item: T, index: number) => any) | keyof T>(array: readonly T[], key: K) {
	const result = new Map<K extends ((...args: any) => infer R) ? R : K extends keyof T ? T[K] : undefined, T[]>()
	for (let i = 0; i < array.length; i++) {
		const item = array[i]
		const groupKey = typeof key === "function" ? (key as Exclude<K, PropertyKey>)(item, i) : item[key as keyof T]
		const group = result.get(groupKey)
		if (group) {
			group.push(item)
		} else {
			result.set(groupKey, [item])
		}
	}
	return result
}

/**
 * 计算指定项在数组中出现的次数
 * @param array 要处理的数组
 * @param item 要查找的项
 * @param startIndex 开始查找的索引（从 0 开始）
 * @param endIndex 结束查找的索引（从 0 开始，不含）
 * @example count(["x", "y"], "x") // 1
 */
export function count<T>(array: readonly T[], item: T, startIndex = 0, endIndex = array.length) {
	let result = 0
	for (; startIndex < endIndex; startIndex++) {
		if (array[startIndex] === item) {
			result++
		}
	}
	return result
}

/**
 * 统计每个项出现的次数
 * @param array 要处理的数组
 * @param key 用于取值的键名或自定义函数
 * @param key.item 当前项的值
 * @param key.index 当前项的索引（从 0 开始）
 * @example countBy([{x: 1}, {x: 1}, {x: 2}], "x") // {1: 2, 2: 1}
 */
export function countBy<T>(array: readonly T[], key: ((item: T, index: number) => any) | keyof T) {
	const result: { [key: string]: number } = {}
	for (let i = 0; i < array.length; i++) {
		const groupKey = typeof key === "function" ? key(array[i], i) : array[i][key]
		result[groupKey] = result[groupKey] + 1 || 1
	}
	return result
}

/**
 * 计算数组中所有项的和，计算时将忽略非数字的项
 * @param array 要处理的数组
 * @example sum([1, 2]) // 3
 */
export function sum(array: readonly number[]) {
	let sum = 0
	for (const num of array) {
		if (num === 0 || +num) {
			sum += +num
		}
	}
	return sum
}

/**
 * 计算数组中所有项的算术平均值，计算时将忽略非数字的项，如果数组为空则返回 `0`
 * @param array 要处理的数组
 * @example avg([1, 2]) // 1.5
 */
export function avg(array: readonly number[]) {
	let sum = 0
	let count = 0
	for (const num of array) {
		if (+num || num === 0) {
			sum += +num
			count++
		}
	}
	return count ? sum / count : 0
}