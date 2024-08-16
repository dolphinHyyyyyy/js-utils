/**
 * 对类数组进行冒泡排序
 * @param arrayLike 要排序的类数组
 * @param comparer 用于确定顺序的回调函数
 * @param comparer.x 要比较的第一个参数
 * @param comparer.y 要比较的第二个参数
 * @param comparer.return 如果返回正数，则说明 *x* 应该排在 *y* 之前；如果返回负数，则说明 *x* 应该排在 *y* 之后
 * @param start 开始排序的索引（从 0 开始，含）
 * @param end 结束排序的索引（从 0 开始，不含）
 * @description 冒泡排序是稳定排序算法，时间复杂度为 O(n²)
 * @example bubbleSort([1, 3, 5, 4, 3]) // [1, 3, 3, 4, 5]
 */
export function bubbleSort<T>(arrayLike: ArrayLike<T>, comparer = (x: T, y: T): number => x < y ? -1 : x > y ? 1 : 0, start = 0, end = arrayLike.length) {
	for (; start < end; start++) {
		for (let i = start + 1; i < end; i++) {
			if (comparer(arrayLike[i], arrayLike[start]) < 0) {
				const t = arrayLike[start]
				arrayLike[start] = arrayLike[i]
				arrayLike[i] = t
			}
		}
	}
}

/**
 * 对类数组进行快速排序
 * @param arrayLike 要排序的类数组
 * @param comparer 用于确定顺序的回调函数
 * @param comparer.x 要比较的第一个参数
 * @param comparer.y 要比较的第二个参数
 * @param comparer.return 如果返回正数，则说明 *x* 应该排在 *y* 之前；如果返回负数，则说明 *x* 应该排在 *y* 之后
 * @param start 开始排序的索引（从 0 开始，含）
 * @param end 结束排序的索引（从 0 开始，不含）
 * @description 快速排序是不稳定排序算法，时间复杂度为 O(n*log(n))
 * @example quickSort([1, 3, 5, 4, 3]) // [1, 3, 3, 4, 5]
 */
export function quickSort<T>(arrayLike: ArrayLike<T>, comparer = (x: T, y: T): number => x < y ? -1 : x > y ? 1 : 0, start = 0, end = arrayLike.length) {
	if (start < end) {
		const t = arrayLike[start]
		let low = start
		let high = end
		do {
			while (high > low && !(comparer(arrayLike[high], t) < 0)) {
				high--
			}
			if (low < high) {
				arrayLike[low++] = arrayLike[high]
			}
			while (low < high && comparer(arrayLike[low], t) < 0) {
				low++
			}
			if (low < high) {
				arrayLike[high--] = arrayLike[low]
			}
		} while (low < high)
		arrayLike[low] = t
		quickSort(arrayLike, comparer, start, high - 1)
		quickSort(arrayLike, comparer, high + 1, end)
	}
}

/**
 * 对类数组进行希尔排序
 * @param arrayLike 要排序的类数组
 * @param comparer 用于确定顺序的回调函数
 * @param comparer.x 要比较的第一个参数
 * @param comparer.y 要比较的第二个参数
 * @param comparer.return 如果返回正数，则说明 *x* 应该排在 *y* 之前；如果返回负数，则说明 *x* 应该排在 *y* 之后
 * @param start 开始排序的索引（从 0 开始，含）
 * @param end 结束排序的索引（从 0 开始，不含）
 * @description 希尔排序是不稳定排序算法，适用于数据量不大的场景
 * @example shellSort([1, 3, 5, 4, 3]) // [1, 3, 3, 4, 5]
 */
export function shellSort<T>(arrayLike: ArrayLike<T>, comparer = (x: T, y: T): number => x < y ? -1 : x > y ? 1 : 0, start = 0, end = arrayLike.length) {
	for (let gap = (end - start) >> 1; gap > 0; gap >>= 1) {
		for (let i = gap + start; i < end; i++) {
			const t = arrayLike[i]
			let j = i
			for (; j - gap >= start && comparer(t, arrayLike[j - gap]) < 0; j -= gap) {
				arrayLike[j] = arrayLike[j - gap]
			}
			arrayLike[j] = t
		}
	}
}

/** 表示一个类数组 */
export interface ArrayLike<T> {
	/** 获取或设置指定索引的值 */
	[index: number]: T
	/** 获取类数组的长度 */
	readonly length: number
}