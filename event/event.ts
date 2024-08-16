interface GlobalLogListenerParam {
	name?: string ,
	event: Event<any[], void>,
	args : any[]

}

/** 表示一个事件对象 */
export class Event<Parameters extends any[], ReturnType = void> {

	public static  GlobalLogListener : (param: GlobalLogListenerParam ) => void

	constructor(private name? : string ) {

	}
	/** 唯一的监听器 */
	private _listener?: (...args: Parameters) => ReturnType

	/** 多个监听器 */
	private _listeners?: ((...args: Parameters) => ReturnType)[]

	/**
	 * 添加一个事件监听器
	 * @param listener 要添加的监听器
	 */
	add(listener: (...args: Parameters) => ReturnType) {
		if (this._listeners) {
			this._listeners.push(listener)
		} else if (this._listener) {
			this._listeners = [this._listener, listener]
			this._listener = undefined
		} else {
			this._listener = listener
		}
	}

	/**
	 * 移除一个事件监听器
	 * @param listener 要添加的监听器
	 */
	remove(listener: (...args: Parameters) => ReturnType) {
		if (this._listeners) {
			const index = this._listeners.indexOf(listener)
			if (index >= 0) {
				this._listeners.splice(index, 1)
			}
		} else if (this._listener === listener) {
			this._listener = undefined
		}
	}

	/**
	 * 立即触发事件
	 * @param args 传递给事件监听器的回调函数
	 */
	emit(...args: Parameters) {
		if (this._listener) {
			return this._listener(...args)
		}
		if (this._listeners) {
			let result: ReturnType | undefined
			for (const listener of this._listeners.slice(0)) {
				const currentResult = listener(...args)
				if (currentResult !== undefined) {
					result = currentResult
				}
			}
			if(Event.GlobalLogListener) {
				Event.GlobalLogListener({
					name : this.name,
					event: this as any,
					args
				})
			}
			return result
		}
	}

	/** 清空所有监听器 */
	removeAll() {
		this._listeners = this._listener = undefined
	}

	/** 获取当前已绑定的监听器数目 */
	get listenerCount() {
		return this._listeners ? this._listeners.length : this._listener ? 1 : 0
	}

	/**
	 * 判断是否已添加指定的事件监听器
	 * @param listener 要检测的监听器
	 */
	has(listener: (...args: Parameters) => ReturnType) {
		if (this._listeners) {
			return this._listeners.includes(listener)
		}
		return this._listener === listener
	}

	/** 遍历所有监听器 */
	*[Symbol.iterator]() {
		if (this._listeners) {
			yield* this._listeners
		} else if (this._listener) {
			yield this._listener
		}
	}

}
