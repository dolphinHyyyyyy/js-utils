/** 表示一个已排序的数组 */
export class SortedArray<T> extends Array<T> {

	/**
	 * 初始化新的数组
	 * @param keySelector 用于获取每项元素待比较的键的回调函数
	 */
	constructor(readonly keySelector: (item: T) => any = item => item) {
		super()
	}

	/**
	 * 在已排序的数组中执行一次二分搜索，如果找到值则返回该值的位置，否则返回离该值最近的位置的位反值（总是小于 0）
	 * @param value 要搜索的值
	 * @param start 要开始搜索的位置
	 * @param end 要结束搜索的位置（不含）
	 */
	binarySearch(value: T, start = 0, end = this.length) {
		end--
		const key = this.keySelector(value)
		while (start <= end) {
			const middle = start + ((end - start) >> 1)
			const midKey = this.keySelector(this[middle])
			const result = midKey < key ? -1 : midKey > key ? 1 : 0
			if (result < 0) {
				start = middle + 1
			} else if (result > 0) {
				end = middle - 1
			} else {
				return middle
			}
		}
		return ~start
	}

	/**
	 * 根据顺序将值插入到已排序的数组中，返回实际插入的位置
	 * @param value 要插入的值
	 */
	add(value: T) {
		let index = this.binarySearch(value)
		if (index < 0) index = ~index
		super.splice(index, 0, value)
		return index
	}

	/**
	 * 如果当前数组不包含某项，则根据顺序将值插入到已排序的数组中，返回实际插入的位置，如果未插入返回 `undefined`
	 * @param value 要插入的值
	 */
	addIfNotExists(value: T) {
		if (!this.length) {
			super.push(value)
			return 0
		}
		const lastKey = this.keySelector(this[this.length - 1])
		const key = this.keySelector(value)
		const lastResult = lastKey < key ? -1 : lastKey > key ? 1 : 0
		if (lastResult <= 0) {
			if (lastResult === 0) {
				return undefined
			}
			super.push(value)
			return this.length - 1
		}
		let index = this.binarySearch(value)
		if (index >= 0) {
			return undefined
		}
		index = ~index
		super.splice(index, 0, value)
		return index
	}

	/**
	 * 移除已排序的数组中的某个值，返回实际移除的位置，如果未删除返回 `undefined`
	 * @param value 要移除的值
	 */
	remove(value: T) {
		const index = this.binarySearch(value)
		if (index >= 0) {
			super.splice(index, 1)
			return index
		}
	}

}