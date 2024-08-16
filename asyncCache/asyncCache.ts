/** 表示一个异步缓存 */
export class AsyncCache<T> {

	/**
	 * 初始化新的缓存
	 * @param loader 载入数据的回调函数
	 */
	constructor(readonly loader: () => Promise<T>) { }

	/** 已载入的数据或确认对象 */
	private _data?: T | Promise<T>

	/** 读取数据 */
	async load() {
		const data = this._data
		if (data !== undefined) {
			return data
		}
		return this.reload()
	}

	/** 清空缓存并重新读取数据 */
	async reload() {
		const promise = this._data = this.loader()
		const data = await promise
		if (this._data === promise) {
			this._data = data
			const readyCallback = this._readyCallback
			if (readyCallback) {
				if (Array.isArray(readyCallback)) {
					for (const callback of readyCallback) {
						callback(data)
					}
				} else {
					readyCallback(data)
				}
				delete this._readyCallback
			}
		}
		return data
	}

	/** 首次添加数据的回调函数 */
	private _readyCallback?: ((data: T) => void) | ((data: T) => void)[]

	/**
	 * 添加数据加载后的回调函数
	 * @param callback 回调函数
	 */
	ready(callback: (data: T) => void) {
		// 如果数据已加载则立即执行
		const data = this._data
		if (data !== undefined && !(data instanceof Promise)) {
			callback(data)
			return
		}
		const readyCallback = this._readyCallback
		if (readyCallback) {
			if (Array.isArray(readyCallback)) {
				readyCallback.push(callback)
			} else {
				this._readyCallback = [readyCallback, callback]
			}
		} else {
			this._readyCallback = callback
		}
	}

	/** 清除当前缓存 */
	clear() {
		this._data = undefined
	}

}