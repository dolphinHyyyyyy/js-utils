/**
 * 获取农历年对应的干支纪年
 * @param lunarYear 农历年
 */
export function getChineseLunarYearGanZhi(lunarYear: number) {
	return getGanZhi((lunarYear - 4) % 60) + "年"
}

/** 天干表 */
export const ganMap = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]

/** 地支表 */
export const zhiMap = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]

/**
 * 获取干支
 * @param offset 相对甲子的偏移量
 */
export function getGanZhi(offset: number) {
	return ganMap[offset % 10] + zhiMap[offset % 12]
}

/** 农历月名表 */
export const chineseNameMap = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊", "正", "闰", "初", "廿"]

/**
 * 获取农历月对应的中文名称
 * @param lunarMonth 农历月（从 1 开始），如果是闰月则为负数
 */
export function getChineseLunarMonthName(lunarMonth: number) {
	let prefix = ""
	if (lunarMonth < 0) {
		prefix = chineseNameMap[13]
		lunarMonth = -lunarMonth
	}
	return `${prefix}${lunarMonth === 1 ? chineseNameMap[13] : chineseNameMap[lunarMonth]}月`
}

/**
 * 获取农历日对应的中文名称
 * @param lunarDay 农历日（从 1 开始）
 */
export function getChineseLunarDayName(lunarDay: number) {
	if (lunarDay <= 10) {
		return chineseNameMap[15] + chineseNameMap[lunarDay]
	}
	if (lunarDay < 20) {
		return chineseNameMap[10] + chineseNameMap[lunarDay % 10]
	}
	if (lunarDay === 20) {
		return chineseNameMap[2] + chineseNameMap[10]
	}
	if (lunarDay < 30) {
		return chineseNameMap[16] + chineseNameMap[lunarDay % 10]
	}
	if (lunarDay === 30) {
		return chineseNameMap[3] + chineseNameMap[10]
	}
}

/** 所有节气的中文名 */
export const solarTermChineseNames = ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"]

/**
 * 获取节气的中文名
 * @param index 节气索引
 */
export function getSolarTermChineseName(index: number) {
	return solarTermChineseNames[index - 1]
}