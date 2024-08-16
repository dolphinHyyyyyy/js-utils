/** 表示一个数据缓存 */
export class DataStore<T> {

	/** 实际存储的数据 */
	private _data: T

	/** 当前数据 */
	get data() { return this._data }
	set data(value) {
		this._data = value
		const useCallback = this._useCallback
		if (useCallback) {
			if (Array.isArray(useCallback)) {
				for (const callback of useCallback) {
					callback(value)
				}
			} else {
				useCallback(value)
			}
		}
	}

	/**
	 * 初始化新的数据缓存
	 * @param data 初始数据
	 */
	constructor(data?: T) {
		this._data = data!
	}

	/** 当数据准备就绪的回调函数 */
	private _useCallback?: ((data: T) => void) | ((data: T) => void)[]

	/**
	 * 当数据更新后执行回调函数
	 * @param callback 回调函数
	 */
	use(callback: (data: T) => void) {
		const useCallback = this._useCallback
		if (useCallback) {
			if (Array.isArray(useCallback)) {
				useCallback.push(callback)
			} else {
				this._useCallback = [useCallback, callback]
			}
		} else {
			this._useCallback = callback
		}
		// 如果数据已加载则立即执行一次
		const data = this._data
		if (data !== undefined) {
			callback(data)
		}
	}

}