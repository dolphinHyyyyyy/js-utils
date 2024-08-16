import { CronExpressionList } from "./cronExpression"

/** 表示一个计划任务 */
export class CronJob {

	/** 定时器表达式 */
	readonly expression: CronExpressionList

	/** 客户端时间与实际时间的误差毫秒数 */
	timeOffset: number

	/**
	 * 初始化新的计划任务
	 * @param cronExpression 计划时间表达式
	 * @param callback 任务回调函数
	 * @param timeOffset 客户端时间与实际时间的误差秒数
	 */
	constructor(cronExpression: string | CronExpressionList, readonly callback: () => void, now?: Date) {
		this.timeOffset = now ? (now as unknown as number) - (new Date() as unknown as number) : 0
		this.expression = typeof cronExpression === "string" ? new CronExpressionList(cronExpression) : cronExpression ?? new CronExpressionList()
		this.callback = callback
	}

	/** 计时器 */
	private _timer?: ReturnType<typeof setTimeout>

	/** 启动当前任务 */
	start() {
		if (this._timer) {
			return
		}
		const now = this._nextRunTime = new Date(this.now())
		this._next()
		if (this.expression.match(now)) {
			this.callback()
		}
	}

	/** 获取当前时间 */
	now() { return Date.now() + this.timeOffset }

	/** 计划的下次任务执行时间 */
	private _nextRunTime?: Date | null

	/** 执行下一次任务 */
	private _next() {
		if (!this._nextRunTime) {
			return
		}
		const next = this._nextRunTime = this.expression.next(this._nextRunTime)
		if (!next) {
			return
		}
		// FIXME: 浏览器最大支持延时 2147483647ms
		this._timer = setTimeout(() => {
			this.callback()
			// 如果期间未停止任务，继续下轮
			if (this._timer) {
				this._next()
			}
		}, (next as unknown as number) - this.now())
	}

	/** 停止当前任务 */
	stop() {
		if (this._timer) {
			clearTimeout(this._timer)
			this._timer = undefined
		}
	}

}