import { getDayInMonth } from "../date/date"

/** 表示一个定时器表达式 */
export class CronExpression {

	/** 秒部分的匹配规则 */
	seconds?: CronRule[]

	/** 分钟部分的匹配规则 */
	minutes: CronRule[]

	/** 小时部分的匹配规则 */
	hours: CronRule[]

	/** 日期部分的匹配规则 */
	dayOfMonth: CronRule[]

	/** 月份部分的匹配规则 */
	month: CronRule[]

	/** 星期部分的匹配规则 */
	dayOfWeek: CronRule[]

	/** 年部分的匹配规则 */
	year?: CronRule[]

	/** 毫秒部分的匹配规则 */
	milliseconds?: CronRule[]

	/**
	 * 初始化新的定时器表达式
	 * @param source 定时器表达式源码
	 * @param startTime 基准时间
	 * @param weekStart 星期天对应的编号
	 */
	constructor(source = "", readonly startTime = new Date(), readonly weekStart: 0 | 1 = 0) {
		const parts = source.toUpperCase().split(" ")
		// 仅 5 个字段时作省略秒处理
		if (parts.length < 6) parts.unshift("")
		this.seconds = parts[0] ? CronExpression._parseRules(parts[0]) : undefined
		this.minutes = CronExpression._parseRules(parts[1] ?? "")
		this.hours = CronExpression._parseRules(parts[2] ?? "")
		this.dayOfMonth = CronExpression._parseRules(parts[3] ?? "")
		this.month = CronExpression._parseRules(parts[4]?.replace(/[A-Z]{3}/g, word => ({
			JAN: 1,
			FEB: 2,
			MAR: 3,
			APR: 4,
			MAY: 5,
			JUN: 6,
			JUL: 7,
			AUG: 8,
			SEP: 9,
			OCT: 10,
			NOV: 11,
			DEC: 12
		})[word] as unknown as string ?? word) ?? "")
		this.dayOfWeek = CronExpression._parseRules(parts[5]?.replace(/[A-Z]{3}/g, word => {
			const replaced = {
				SUN: 0,
				MON: 1,
				TUE: 2,
				WED: 3,
				THU: 4,
				FRI: 5,
				SAT: 6
			}[word]
			if (replaced !== undefined) {
				return (replaced + weekStart) as unknown as string
			}
			return word
		}) ?? "")
		this.year = parts[6] ? CronExpression._parseRules(parts[6]) : undefined
		this.milliseconds = parts[7] ? CronExpression._parseRules(parts[7]) : undefined
	}

	/** 解析一个规则列表 */
	private static _parseRules(rulesSource: string) {
		const result: CronRule[] = []
		for (const ruleSource of rulesSource.split(",")) {
			const match = /^(\*|(-?\d*)(?:-(-?\d*))?)?(L)?(W)?(?:\/(\d+))?(?:#(\d+))?$/.exec(ruleSource)
			if (!match) {
				continue
			}
			result.push({
				start: match[2] ? parseInt(match[2]) : undefined,
				end: match[3] ? parseInt(match[3]) : undefined,
				last: match[4] !== undefined,
				weekDay: match[5] !== undefined,
				step: match[6] ? parseInt(match[6]) : undefined,
				count: match[7] ? parseInt(match[7]) : undefined
			})
		}
		return result
	}

	/** 格式化为表达式源码 */
	toString() {
		let result = ""
		if (this.seconds || this.year || this.milliseconds) {
			result += CronExpression._formatRules(this.seconds) + " "
		}
		result += `${CronExpression._formatRules(this.minutes)} ${CronExpression._formatRules(this.hours)} ${CronExpression._formatRules(this.dayOfMonth)} ${CronExpression._formatRules(this.month)} ${CronExpression._formatRules(this.dayOfWeek)}`
		if (this.year || this.milliseconds) {
			result += " " + CronExpression._formatRules(this.year)
		}
		if (this.milliseconds) {
			result += " " + CronExpression._formatRules(this.milliseconds)
		}
		return result
	}

	/** 格式化规则为字符串 */
	private static _formatRules(rules: CronRule[] | undefined) {
		if (rules === undefined) {
			return "*"
		}
		if (!rules.length) {
			return "?"
		}
		return rules.map(rule => `${rule.start !== undefined ? rule.start : "*"}${rule.end !== undefined ? "-" + rule.end : ""}${rule.last ? "L" : ""}${rule.weekDay ? "W" : ""}${rule.step !== undefined ? "/" + rule.step : ""}${rule.count !== undefined ? `#${rule.count}` : ""}`).join(",")
	}

	/**
	 * 获取从指定日期开始最近的计划时间，如果没有匹配项则返回 `null`
	 * @param startDate 日期，默认为当前时间
	 */
	next(startDate = new Date()) {
		const startYear = this.startTime.getFullYear()
		const startMonth = this.startTime.getMonth() + 1
		const startDay = this.startTime.getDate()
		const startWeekday = this.startTime.getDay() + this.weekStart
		const startHours = this.startTime.getHours()
		const startMinutes = this.startTime.getMinutes()
		const startSeconds = this.startTime.getSeconds()
		const startMilliseconds = this.startTime.getMilliseconds()
		startDate = new Date(startDate.getTime() + (this.milliseconds ? 1 : 1000 - startDate.getMilliseconds()))
		while (true) {
			const year = startDate.getFullYear()
			if (year > 9999) {
				return null
			}
			if (this.year && !CronExpression._matchRules(this.year, year, startYear, 10000)) {
				startDate.setFullYear(year + 1)
				startDate.setMonth(0)
				startDate.setDate(1)
				startDate.setHours(0)
				startDate.setMinutes(0)
				startDate.setSeconds(0)
				startDate.setMilliseconds(0)
				continue
			}
			const month = startDate.getMonth() + 1
			if (!CronExpression._matchRules(this.month, month, startMonth, 13)) {
				startDate.setMonth(month)
				startDate.setDate(1)
				startDate.setHours(0)
				startDate.setMinutes(0)
				startDate.setSeconds(0)
				startDate.setMilliseconds(0)
				continue
			}
			const dayOfMonth = startDate.getDate()
			if (!CronExpression._matchRules(this.dayOfMonth, dayOfMonth, startDay, 32, undefined, year, month) &&
				!CronExpression._matchRules(this.dayOfWeek, startDate.getDay() + this.weekStart, startWeekday, 7 + this.weekStart, this.weekStart, year, month, dayOfMonth)) {
				startDate.setDate(dayOfMonth + 1)
				startDate.setHours(0)
				startDate.setMinutes(0)
				startDate.setSeconds(0)
				startDate.setMilliseconds(0)
				continue
			}
			const hours = startDate.getHours()
			if (!CronExpression._matchRules(this.hours, hours, startHours, 24)) {
				startDate.setHours(hours + 1)
				startDate.setMinutes(0)
				startDate.setSeconds(0)
				startDate.setMilliseconds(0)
				continue
			}
			const minutes = startDate.getMinutes()
			if (!CronExpression._matchRules(this.minutes, minutes, startMinutes, 60)) {
				startDate.setMinutes(minutes + 1)
				startDate.setSeconds(0)
				startDate.setMilliseconds(0)
				continue
			}
			const seconds = startDate.getSeconds()
			if (this.seconds && !CronExpression._matchRules(this.seconds, seconds, startSeconds, 60)) {
				startDate.setSeconds(seconds + 1)
				startDate.setMilliseconds(0)
				continue
			}
			const milliseconds = startDate.getMilliseconds()
			if (this.milliseconds && !CronExpression._matchRules(this.milliseconds, milliseconds, startMilliseconds, 1000)) {
				startDate.setMilliseconds(milliseconds + 1)
				continue
			}
			break
		}
		return startDate
	}

	/**
	 * 判断指定的日期是否命中当前定时器
	 * @param date 日期
	 * @param startDate 开始的日期
	 */
	match(date: Date) {
		const year = date.getFullYear()
		const month = date.getMonth() + 1
		const dayOfMonth = date.getDate()
		return (!this.year || CronExpression._matchRules(this.year, date.getFullYear(), this.startTime.getFullYear(), 10000)) &&
			CronExpression._matchRules(this.month, date.getMonth() + 1, this.startTime.getMonth() + 1, 13) &&
			(CronExpression._matchRules(this.dayOfWeek, date.getDay(), this.startTime.getDate(), 32, undefined, year, month) ||
				CronExpression._matchRules(this.dayOfMonth, date.getDay() + this.weekStart, this.startTime.getDay() + this.weekStart, 7 + this.weekStart, this.weekStart, year, month, dayOfMonth)) &&
			CronExpression._matchRules(this.hours, date.getHours(), this.startTime.getHours(), 60) &&
			CronExpression._matchRules(this.minutes, date.getMinutes(), this.startTime.getMinutes(), 60) &&
			(!this.seconds || CronExpression._matchRules(this.seconds, date.getSeconds(), this.startTime.getSeconds(), 60)) &&
			(!this.milliseconds || CronExpression._matchRules(this.milliseconds, date.getSeconds(), this.startTime.getMilliseconds(), 1000))
	}

	/** 测试指定的值是否匹配指定的表达式 */
	private static _matchRules(rules: CronRule[], value: number, startValue: number, maxValue: number, weekStart?: number, year?: number, month?: number, day?: number) {
		for (const rule of rules) {
			if (month !== undefined) {
				if (rule.last) {
					if (weekStart === undefined) {
						// 月部分中，L 表示当月最后一天；dL 表示当前最后 d 天；LW 表示当月最后一周的工作日
						if (rule.weekDay) {
							// 当月最后一个工作日
							if (getLastWeekday(year!, month, 5) !== value) {
								continue
							}
						} else if (getDayInMonth(year!, month) - (rule.start ?? 1) + 1 !== value) {
							continue
						}
					} else {
						// 星期部分中，L 表示星期六；dL 表示当前最后一个星期 d
						if (rule.start === undefined) {
							if (value - weekStart === 6) {
								continue
							}
						} else {
							if (getLastWeekday(year!, month, rule.start - weekStart) !== day) {
								continue
							}
						}
					}
					return true
				}
				if (rule.weekDay && weekStart === undefined) {
					// 月部分中，dW 表示离 d 号最近的工作日
					if (getNearestWorkday(year!, month, rule.start ?? 1) !== value) {
						continue
					}
					return true
				}
				if (rule.count !== undefined && weekStart !== undefined && rule.start !== undefined) {
					// 星期部分中，d#n 表示本月第 n 个星期 d
					if (getNthWeekday(year!, month, rule.start - weekStart, rule.count - 1) !== day) {
						continue
					}
					return true
				}
			}
			const start = rule.start
			const end = rule.end
			const step = rule.step
			if (end === undefined && step === undefined) {
				// 精确匹配
				if (start !== undefined && start !== value) {
					continue
				}
			} else {
				// 区间匹配
				if (start !== undefined && value < start) {
					continue
				}
				if (end !== undefined && value > end) {
					continue
				}
				if (step !== undefined) {
					if (start !== undefined) {
						if (value < start || (value - start) % step !== 0) {
							continue
						}
					} else {
						if (day !== undefined && weekStart === undefined) {
							maxValue = getDayInMonth(year!, month!)
						}
						if ((value - startValue + (value < startValue ? maxValue : 0)) % step !== 0) {
							continue
						}
					}
				}
			}
			return true
		}
		return false
	}

}

/** 表示一个定时器规则 */
export interface CronRule {
	/** 开始数值（含） */
	start?: number
	/** 结束数值（含） */
	end?: number
	/** 步长 */
	step?: number
	/** 是否匹配最后一个（仅针对日期和星期有效）*/
	last?: boolean
	/** 是否仅匹配工作日（仅针对日期有效）*/
	weekDay?: boolean
	/** 匹配第几个项（仅针对星期有效）*/
	count?: number
}

/** 计算离指定日期最近且不跨月的工作日 */
function getNearestWorkday(year: number, month: number, day: number) {
	const weekDay = new Date(year, month - 1, day).getDay()
	if (weekDay === 0) {
		const dayCount = getDayInMonth(year, month)
		return day === dayCount ? dayCount - 2 : day + 1
	}
	if (weekDay === 6) {
		return day === 1 ? 3 : day - 1
	}
	return day
}

/** 获取当月第 N 个星期 W 对应的日期 */
function getNthWeekday(year: number, month: number, weekDay: number, count: number) {
	// 计算当月 1 号对应的星期
	const firstWeekDay = new Date(year, month - 1, 1).getDay()
	return 1 + count * 7 + weekDay - firstWeekDay + (weekDay >= firstWeekDay ? 0 : 7)
}

/** 获取当月最后一个星期 W 对应的日期 */
function getLastWeekday(year: number, month: number, weekDay: number) {
	// 计算当月最后一天对应的星期
	const lastDay = new Date(year, month, 0)
	const lastWeekDay = lastDay.getDay()
	return lastDay.getDate() - lastWeekDay + weekDay - (weekDay <= lastWeekDay ? 0 : 7)
}

/** 表示一个定时器表达式列表 */
export class CronExpressionList {

	/** 所有表达式 */
	readonly expressions: CronExpression[]

	/**
	 * 初始化新的表达式列表
	 * @param source 定时器表达式源码
	 * @param startTime 基准时间
	 * @param weekStart 星期天对应的编号
	 */
	constructor(source = "", readonly startTime = new Date(), readonly weekStart: 0 | 1 = 0) {
		this.expressions = source.split(";").map(source => new CronExpression(source, startTime, weekStart))
	}

	/**
	 * 获取从指定日期开始最近的计划时间，如果没有匹配项则返回 `null`
	 * @param startDate 日期，默认为当前时间
	 */
	next(startDate = new Date()) {
		let result: Date | null = null
		for (const expression of this.expressions) {
			const current = expression.next(startDate)
			if (!result || current && current < result) {
				result = current
			}
		}
		return result
	}

	/**
	 * 判断指定的日期是否命中当前定时器
	 * @param date 日期
	 * @param startDate 开始的日期
	 */
	match(date: Date) {
		return this.expressions.some(expression => expression.match(date))
	}
}

/**
 * 判断指定的字符串是否是合法的定时器表达式
 * @param value 要判断的字符串
 */
export function isValidCronExpression(value: string) {
	const parts = value.split(" ")
	if (parts.length === 5) parts.unshift("0")
	if (parts.length !== 6 && parts.length !== 7) {
		return false
	}
	for (let i = 0; i < parts.length; i++) {
		for (let rule of parts[i].split(",")) {
			rule = rule.replace("*", "1-1")
			let re: RegExp
			switch (i) {
				case 0:
				case 1:
					re = /^(?:\d|[1-5]\d)(?:-(?:\d|[1-5]\d))?(?:\/\d+)?$/
					break
				case 2:
					re = /^(?:\d|1\d|2[0-3])(?:-(?:\d|1\d|2[0-3]))?(?:\/\d+)?$/
					break
				case 3:
					re = /^(?:(?:[1-9]|[12]\d|3[01])(?:-(?:[1-9]|[12]\d|3[01]))?L?W?(?:\/\d+)?|LW?)$/
					break
				case 4:
					if (rule === "?") {
						continue
					}
					rule = rule.replace(/JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC/ig, "1")
					re = /^(?:[1-9]|1[012])(?:-(?:[1-9]|1[012]))?(?:\/(?:[1-9]|1[01]))?$/
					break
				case 5:
					if (rule === "?") {
						continue
					}
					rule = rule.replace(/SUN|MON|TUE|WED|THU|FRI|SAT/ig, "1")
					re = /^(?:[0-6](?:-[0-6])?(?:\/[0-6])?L?|L)(?:#\d+)?$/
					break
				default:
					re = /^\d+(?:-\d+)?(?:\/\d+)?$/
					break
			}
			if (!re.test(rule)) {
				return false
			}
		}
	}
	return true
}