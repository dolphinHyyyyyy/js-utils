/** 表示一个历史堆栈 */
export class HistoryStack<T> {

	/**
	 * 初始化新的历史堆栈
	 * @param capacity 堆栈的容量
	 */
	constructor(readonly capacity = 520) { }

	/** 获取所有项 */
	private readonly _items: T[] = []

	/** 撤销栈的长度 */
	private _undoCount = 0

	/** 获取当前栈顶的元素 */
	get top() { return this._items[this._undoCount - 1] }

	/** 添加一个操作项 */
	push(item: T) {
		if (this._undoCount === this.capacity) {
			this._items.shift()
			this._undoCount--
		}
		this._items[this._undoCount] = item
		// 清空恢复记录栈
		this._items.length = ++this._undoCount
	}

	/** 判断当前是否可执行撤销操作 */
	get canUndo() { return this._undoCount > 0 }

	/** 判断当前是否可执行重做操作 */
	get canRedo() { return this._undoCount < this._items.length }

	/** 执行一次撤销操作 */
	undo() {
		if (this._undoCount === 0) {
			return
		}
		return this._items[--this._undoCount]
	}

	/** 执行一次重做操作 */
	redo() {
		if (this._undoCount === this._items.length) {
			return
		}
		return this._items[this._undoCount++]
	}

	/** 清空撤销堆栈 */
	clear() {
		this._undoCount = this._items.length = 0
	}

}