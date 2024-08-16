/**
 * 表示一个补间动画
 * @example
 * const tween = new Tween()
 * tween.set = x => { console.log(x) }
 * tween.start()
 */
export class Tween {

	/** 执行动画的总毫秒数 */
	duration: number

	/** 每秒显示的帧数 */
	fps: number

	/**
	 * 初始化新的补间动画
	 * @param callback 要执行的动画回调函数
	 * @param callback.value：变化因子，大小在 0-1 之间，可以根据此变化因子设置实际的样式
	 * @param duration 动画执行的总毫秒数
	 * @param easing 渐变曲线，通过渐变曲线更改变化因子的变化方式
	 */
	constructor(callback?: Tween["set"], duration?: Tween["duration"], easing?: Tween["easing"]) {
		if (callback) {
			this.set = callback
			if (duration) this.duration = duration
			if (easing) this.easing = easing
			this.start()
		}
	}

	/**
	 * 渐变曲线，通过渐变曲线更改变化因子的变化方式
	 * @param value 变化因子，大小在 0-1 之间
	 * @returns 返回转换后的变化因子，大小在 0-1 之间
	 */
	easing(value: number) {
		return -(Math.cos(Math.PI * value) - 1) / 2
	}

	/**
	 * 当被子类重写时负责根据变化因子设置实际的值
	 * @param value 变化因子，大小在 0-1 之间，可以根据此变化因子设置实际的样式
	 * @virtual
	 */
	set(value: number) { }

	/** 动画结束后的回调函数 */
	end?(): void

	/** 本次动画的已执行时间 */
	private _time = 0

	/** 本次动画的计时器 */
	private _timer?: ReturnType<typeof setInterval>

	/** 开始执行动画 */
	start() {
		if (!this._timer) {
			this._time = Date.now() - this._time
			this._timer = setInterval(() => {
				const time = Date.now() - this._time
				if (time < this.duration) {
					this.set(this.easing(time / this.duration))
				} else {
					this.pause()
					this.set(1)
					this.end?.()
				}
			}, Math.round(1000 / this.fps))
		}
	}

	/** 停止执行动画 */
	stop() {
		this.pause()
		this.reset()
	}

	/** 暂停执行动画 */
	pause() {
		if (this._timer) {
			this._time = Date.now() - this._time
			clearInterval(this._timer)
			this._timer = undefined
		}
	}

	/** 重置动画 */
	reset() {
		this._time = 0
		this.set(0)
	}

	/** 判断当前是否正在执行动画 */
	get isRunning() { return !!this._timer }

}

Tween.prototype.duration = 300
Tween.prototype.fps = 50