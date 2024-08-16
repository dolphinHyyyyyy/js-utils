const dateFormatters = {
	__proto__: null!,
	y: (date: Date, format: string) => {
		const year = date.getFullYear()
		return format.length < 3 ? year % 100 : year
	},
	M: (date: Date) => date.getMonth() + 1,
	d: (date: Date) => date.getDate(),
	H: (date: Date) => date.getHours(),
	m: (date: Date) => date.getMinutes(),
	s: (date: Date) => date.getSeconds(),
	e: (date: Date) => "日一二三四五六".charAt(date.getDay())
}

/**
 * 格式化日期对象
 * @param date 日期对象
 * @param format 格式字符串，其中以下字符（区分大小写）会被替换：
 *
 * 字符| 意义          | 示例
 * ----|--------------|--------------------
 * y   | 年           | yyyy: 1999, yy: 99
 * M   | 月           | MM: 09, M: 9
 * d   | 日           | dd: 09, d: 9
 * H   | 时（24小时制）| HH: 13, H: 13
 * m   | 分           | mm: 06, m: 6
 * s   | 秒           | ss: 06, s: 6
 * e   | 周（中文）    | 周e: 周一
 *
 * @example formatDate(new Date("2016/01/01 00:00:00"), "yyyy-MM-dd HH:mm:ss") // "2016-01-01 00:00:00"
 * @see https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html
 */
export function formatDate(date: Date | string, format = "yyyy-MM-dd HH:mm:ss") {
	if (date && !(date instanceof Date)) {
		date = parseDate(date)
	}
	if (!+date) {
		return ""
	}
	return format.replace(/([yMdHmse])\1*/g, (source: string, key: keyof typeof dateFormatters) => {
		let value = dateFormatters[key](date as Date, source).toString()
		while (value.length < source.length) {
			value = "0" + value
		}
		return value
	})
}

/**
 * 解析字符串为日期对象
 * @param value 要解析的字符串，默认格式可以是标准日期格式或 “yyyy-MM-dd” 或 “yyyyMMdd”
 * @param format 如果指定了格式字符串，将按其格式解析日期，格式字符串中以下字符（区分大小写）会被填充为原数据：
 *
 * 字符| 意义         | 示例
 * ----|--------------|------
 * y   | 年           | 2014
 * M   | 月           | 9
 * d   | 日           | 9
 * H   | 时（24小时制）| 9
 * m   | 分           | 6
 * s   | 秒           | 6
 *
 * @returns 返回新日期对象
 * @example parseDate("2014-1-1") // new Date("2014/1/1")
 * @example parseDate("20140101") // new Date("2014/1/1")
 * @example parseDate("2014年1月1日", "yyyy年MM月dd日") // new Date("2014/1/1")
 */
export function parseDate(value: string, format?: string) {
	if (format) {
		const groups = [0]
		const obj: any = {}
		const match = new RegExp(format.replace(/[.\\(){}[\]+*?^$|]/g, "\\$&").replace(/([yMdHms])\1*/g, (_, w) => {
			groups.push(w)
			return "\\s*(\\d+)?\\s*"
		})).exec(value)
		if (match) {
			for (let i = 1; i < match.length; i++) {
				obj[groups[i]] = +match[i]
			}
		}
		return new Date(obj.y || new Date().getFullYear(), obj.M ? obj.M - 1 : new Date().getMonth(), obj.d || 1, obj.H || 0, obj.m || 0, obj.s || 0)
	}
	const obj = new Date(value)
	return +obj ? obj : new Date(String(value).replace(/(\d{4})\D*(\d\d?)\D*(\d\d?).*(\d\d?)\D*(\d\d?)\D*(\d\d?)/, "$1/$2/$3 $4:$5:$6").replace(/(\d{4})\D*(\d\d?)\D*(\d\d?)/, "$1/$2/$3"))
}

/** 获取今天凌晨的日期 */
export function today() {
	const date = new Date()
	return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

/**
 * 判断指定的日期是否是周一到周五
 * @param date 要判断的日期
 */
export function isWeekday(date: Date) {
	return date.getDay() % 6 !== 0
}

/**
 * 获取日期所在的周数
 * @param date 日期对象
 * @param base 作为第一周的日期。如果未指定则使用今年第一天作为第一周
 * @example getWeek(new Date("2014/1/15")) // 3
 * @example getWeek(new Date("2014/1/15"), new Date("2014/1/1")) // 3
 */
export function getWeek(date: Date, base = new Date(date.getFullYear(), 0, 1)) {
	return Math.floor(((date as any) - (base as any)) / 604800000) + 1
}

/**
 * 创建当前日期对象的副本
 * @example clone(new Date("2014/1/1")) // new Date("2014/1/1")
 */
export function clone(date: Date) {
	return new Date(+date)
}

/**
 * 获取日期的日期部分
 * @returns 返回新日期对象，其小时部分已被清零
 * @example toDay(new Date("2014/1/1 12:00:00")) // new Date("2014/1/1")
 */
export function toDay(date: Date) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

/**
 * 获取当前月的第一天
 * @param date 日期对象
 * @returns 返回新日期对象
 * @example toFirstDay(new Date("2016/2/15")) // new Date("2016/2/1")
 */
export function toFirstDay(date: Date) {
	const result = new Date(+date)
	result.setDate(1)
	return result
}

/**
 * 获取当前月的最后一天
 * @param date 日期对象
 * @returns 返回新日期对象
 * @example toLastDay(new Date("2016/2/15")) // new Date("2016/2/29")
 */
export function toLastDay(date: Date) {
	const result = new Date(+date)
	result.setDate(1)
	result.setMonth(result.getMonth() + 1)
	result.setDate(result.getDate() - 1)
	return result
}

/**
 * 获取本周的第一天(星期六是最后一天)
 * @param date 日期对象
 * @returns 返回新日期对象
 * @example toFirstDayOfWeek(new Date("2016/2/15"))
 */
export function toFirstDayOfWeek(date: Date) {
	return addDay(date, -date.getDay())
}

/**
 * 获取本周的最后一天(星期六是最后一天)
 * @param date 日期对象
 * @returns 返回新日期对象
 * @example toLastDayOfWeek(new Date("2016/2/15"))
 */
export function toLastDayOfWeek(date: Date) {
	return addDay(date, 6 - date.getDay())
}

/**
 * 获取本季度的第一天
 * @param date 日期对象
 * @returns 返回新日期对象
 * @example toFirstDayOfQuarter(new Date("2016/2/15"))
 */
export function toFirstDayOfQuarter(date: Date) {
	let month = date.getMonth()
	month = month - (month % 3)
	return new Date(date.getFullYear(), month, 1)
}

/**
 * 获取本季度的最后一天
 * @param date 日期对象
 * @returns 返回新日期对象
 * @example toLastDayOfQuarter(new Date("2016/2/15"))
 */
export function toLastDayOfQuarter(date: Date) {
	let month = date.getMonth()
	month = month - (month % 3) + 3
	return new Date(date.getFullYear(), month + 1, 0)
}

/**
 * 获取今年的第一天
 * @param date 日期对象
 * @returns 返回新日期对象
 * @example toLastDayOfYear(new Date("2016/2/15"))
 */
export function toFirstDayOfYear(date: Date) {
	return new Date(date.getFullYear(), 0, 1)
}

/**
 * 获取今年的最后一天
 * @param date 日期对象
 * @returns 返回新日期对象
 * @example toLastDayOfYear(new Date("2016/2/15"))
 */
export function toLastDayOfYear(date: Date) {
	return new Date(date.getFullYear() + 1, 0, 0)
}

/**
 * 计算日期添加指定年数后的新日期
 * @param value 要添加的年数，如果小于 0 则倒数
 * @returns 返回新日期对象
 * @example addYear(new Date("2014/1/1"), 1) // new Date("2015/1/1")
 */
export function addYear(date: Date, value: number) {
	const result = new Date(+date)
	result.setFullYear(date.getFullYear() + value)
	return result
}

/**
 * 计算日期添加指定月数后的新日期
 * @param value 要添加的月数，如果小于 0 则倒数
 * @returns 返回新日期对象
 * @example addMonth(new Date("2014/1/1"), 1) // new Date("2014/2/1")
 */
export function addMonth(date: Date, value: number) {
	const result = new Date(+date)
	result.setMonth(result.getMonth() + value)
	if (date.getDate() !== result.getDate()) {
		result.setDate(0)
	}
	return result
}

/**
 * 计算日期添加指定周后的新日期
 * @param value 要添加的周数，如果小于 0 则倒数
 * @returns 返回新日期对象
 * @example addWeek(new Date("2014/1/1"), 1) // new Date("2014/1/8")
 */
export function addWeek(date: Date, value: number) {
	return new Date(+date + value * 604800000)
}

/**
 * 计算日期添加指定天数后的新日期
 * @param value 要添加的天数，如果小于 0 则倒数
 * @returns 返回新日期对象
 * @example addDay(new Date("2014/1/1"), 1) // new Date("2014/1/2")
 */
export function addDay(date: Date, value: number) {
	return new Date(+date + value * 86400000)
}

/**
 * 计算日期添加指定小时后的新日期
 * @param value 要添加的小时数，如果小于 0 则倒数
 * @returns 返回新日期对象
 * @example addHours(new Date("2014/1/1"), 1) // new Date("2014/1/1 01:00:00")
 */
export function addHours(date: Date, value: number) {
	return new Date(+date + value * 3600000)
}

/**
 * 计算日期添加指定分钟数后的新日期
 * @param value 要添加的分钟数，如果小于 0 则倒数
 * @returns 返回新日期对象
 * @example addMinutes(new Date("2014/1/1"), 1) // new Date("2014/1/1 00:01:00")
 */
export function addMinutes(date: Date, value: number) {
	return new Date(+date + value * 60000)
}

/**
 * 计算日期添加指定秒后的新日期
 * @param value 要添加的秒数，如果小于 0 则倒数
 * @returns 返回新日期对象
 * @example addSeconds(new Date("2014/1/1"), 1) // new Date("2014/1/1 00:00:01")
 */
export function addSeconds(date: Date, value: number) {
	return new Date(+date + value * 1000)
}

/**
 * 计算日期添加指定毫秒后的新日期
 * @param value 要添加的毫秒数，如果小于 0 则倒数
 * @returns 返回新日期对象
 * @example addMilliseconds(new Date("2014/1/1"), 1000) // new Date("2014/1/1 00:00:01")
 */
export function addMilliseconds(date: Date, value: number) {
	return new Date(+date + value)
}

/**
 * 获取两个日期相差的年份，不满一年的部分会被忽略
 * @param left 要比较的左值
 * @param right 要比较的右值
 * @example compareYear(new Date(2014, 1, 1), new Date(2013, 1, 2)) // 1
 */
export function compareYear(left: Date, right: Date) {
	const monthX = left.getMonth()
	const monthY = right.getMonth()
	return left.getFullYear() - right.getFullYear() - (monthX < monthY || monthX === monthY && left.getDate() < right.getDate() ? 1 : 0)
}

/**
 * 获取两个日期相差的天数，不足一天的部分会被忽略
 * @param left 要比较的左值
 * @param right 要比较的右值
 * @example compareDay(new Date(2014, 1, 2), new Date(2014, 1, 1)) // 1
 */
export function compareDay(left: Date, right: Date) {
	return Math.floor((left as any - (right as any)) / 86400000)
}

/**
 * 计算日期到今年指定日期的剩余天数，如果今年指定日期已过，则计算到明年该日期的剩余天数
 * @param date 要计算的日期对象
 * @param month 月
 * @param day 天
 * @example dayLeft(new Date("2014/12/3"), 12, 5) // 2
 * @example dayLeft(new Date("2014/12/4"), 12, 5) // 1
 * @example dayLeft(new Date("2014/12/5"), 12, 5) // 0
 * @example dayLeft(new Date("2014/12/6"), 12, 5) // 364
 */
export function dayLeft(date: Date, month: number, day: number) {
	const tmp = new Date(date.getFullYear(), date.getMonth(), date.getDate())
	let offset = new Date(date.getFullYear(), month - 1, day) as any - (tmp as any)
	if (offset < 0) {
		offset = new Date(date.getFullYear() + 1, month - 1, day) as any - (tmp as any)
	}
	return offset / 86400000
}

/**
 * 判断指定数值所表示的日期是否合法（如 2 月 30 日是不合法的）
 * @param year 年
 * @param month 月（从 1 开始）
 * @param day 日（从 1 开始）
 * @param hour 时（从 0 开始）
 * @param minute 分（从 0 开始）
 * @param second 秒（从 0 开始）
 * @param milliSecond 毫秒（从 0 开始）
 * @example isValidDate(2000, 2, 29) // false
 * @example isValidDate(2004, 2, 29) // true
 */
export function isValidDate(year: number, month: number, day = 1, hour = 0, minute = 0, second = 0, milliSecond = 0) {
	const date = new Date(year, month - 1, day, hour, minute, second, milliSecond)
	return year === date.getFullYear() && month === date.getMonth() + 1 && day === date.getDate() && hour === date.getHours() && minute === date.getMinutes() && second === date.getSeconds() && milliSecond === date.getMilliseconds()
}

/**
 * 判断指定年份是否是闰年
 * @param year 要判断的年份
 * @example isLeapYear(2004) // true
 * @example isLeapYear(2000) // true
 * @example isLeapYear(2100) // false
 * @example isLeapYear(2002) // false
 */
export function isLeapYear(year: number) {
	return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0
}

/**
 * 获取指定年的指定月的天数
 * @param year 年
 * @param month 月
 * @example getDayInMonth(2001, 1) // 31
 * @example getDayInMonth(2001, 2) // 28
 * @example getDayInMonth(2004, 2) // 29
 */
export function getDayInMonth(year: number, month: number) {
	return (new Date(year, month) as any - (new Date(year, month - 1) as any)) / 86400000
}

export function formatShortDate(date: Date, now = new Date()) {
	if (date.getFullYear() !== now.getFullYear()) {
		return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
	}
	if (date.getMonth() !== now.getMonth() || date.getDate() !== now.getDate()) {
		return `${date.getMonth() + 1}-${date.getDate()}`
	}
	return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
}

/**
 * 格式化日期为中文相对格式（如“3 分钟前”）
 * @param date 要格式化的日期对象
 * @param now 当前时间
 * @returns 根据指定的时间与当前时间的差距，返回以下格式之一：“刚刚”、“N 秒前”、“N 分钟前”、“N 小时前”、“昨天”、“前天”、“N 天前”、“N月N日”或“N年N月N日”
 * @example formatChineseRelativeDate(new Date("2000/1/1"), new Date("2000/1/2")) // "昨天"
 * @example formatChineseRelativeDate(new Date("2000/1/1"), new Date("2000/1/3")) // "2 天前"
 */
export function formatChineseRelativeDate(date: Date, now = new Date()) {
	if (now >= date && date.getFullYear() === now.getFullYear()) {
		if (date.getMonth() === now.getMonth()) {
			const delta = Math.floor(((now as any) - (date as any)) / 1000)
			if (date.getDate() === now.getDate()) {
				if (delta < 1) {
					return `刚刚`
				}
				if (delta < 60) {
					return `${delta}秒前`
				}
				if (delta < 60 * 60) {
					return `${Math.floor(delta / 60)}分钟前`
				}
				if (delta < 60 * 60 * 24) {
					return `${Math.floor(delta / (60 * 60))}小时前`
				}
			}
			if (delta < 60 * 60 * 24 * 2) {
				return `昨天`
			}
			if (delta < 60 * 60 * 24 * 3) {
				return `前天`
			}
			return `${Math.round(delta / (60 * 60 * 24))}天前`
		}
		return `${date.getMonth() + 1}月${date.getDate()}日`
	}
	return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

/**
 * 格式化时间为中文相对格式（如“3 分钟前”）
 * @param date 要格式化的日期对象
 * @param now 当前时间
 * @returns 根据指定的时间与当前时间的差距，返回以下格式之一：“12:00”、“昨天 12:00”、“N 天前 12:00”、“N月N日 12:00”或“N年N月N日 12:00”
 */
export function formatChineseRelativeTime(date: Date, now = new Date()) {
	const timeString = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
	return compareDay(now, date) === 0 ? timeString : `${formatChineseRelativeDate(date, now)} ${timeString}`
}