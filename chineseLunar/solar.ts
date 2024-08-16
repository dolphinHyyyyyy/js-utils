/**
 * 农历每年大小月、闰月、正月初一的信息
 * @description 每个数字代表一个农历年的信息，数字共 23 位，每位的含义是：
 * - 第 0-12 位: 该农历年每月天数，0 表示 29 天，1 表示 30 天（一般十二位，如果有闰月则为十三位）
 * - 第 13-16 位: 该农历年的闰月，0 表示没有闰月
 * - 第 17-21 位: 该农历年正月初一对应的阳历日
 * - 第 22 位: 该农历年正月初一对应的阳历月，0 表示 1 月，1 表示 2 月
 */
export const chineseLunarDatas = [1898, 5507797, 4134610, 6686546, 5246629, 3847754, 6293067, 4721307, 3315030, 5899626, 4459353, 2905938, 5506898, 3988261, 6556453, 4983371, 3454123, 6029997, 4588907, 3033961, 5639593, 4390290, 6819474, 5246245, 3717709, 6294102, 4850358, 3184053, 5899988, 4460201, 3038866, 5508754, 3984678, 6423851, 4983383, 3453622, 6032218, 4720340, 3174089, 5637961, 4126355, 6687379, 5244203, 3590747, 6163117, 4851050, 3316565, 5901220, 4459337, 2906771, 5507733, 3863853, 6423862, 4983469, 3585450, 6030770, 4591013, 3177802, 5770570, 4131477, 6556311, 5244246, 3721909, 6163157, 4851410, 3313317, 5901989, 4458058, 2780311, 5376667, 3994970, 6423914, 4983657, 3585874, 6163282, 4590373, 3053131, 5638731, 4134059, 6554285, 5113197, 3722089, 6294953, 4853138, 3317029, 5901605, 4545101, 6818390, 5374646, 3851701, 6424277, 4984489, 3587730, 6164114, 4721958, 3041878, 5507671, 4134102, 6685530, 5113557, 3716809, 6293321, 4851347, 3183915, 5768491, 4328027, 2905434, 5375338, 3865429, 6556580, 5114697, 3455635, 6032021, 4588845, 3050157, 5507765, 4142506, 6686162, 5246373, 3726666, 6294858, 4852885, 3314990, 5768534, 4328117, 2905522, 5506770, 3853989, 6424357, 4982347, 3452055, 5901483, 4588890, 3042006, 5639017, 4159314, 6687570, 5245733, 3725899, 6163019, 4719787, 3188059, 5768621, 4328298, 2906962, 5508498, 3996965, 6425893, 4983381, 3454125, 6030518, 4457909, 3042730, 5639881, 4398738, 6688402, 5246246, 3721814, 6163031, 4719830, 3180245, 5769045, 4458313, 2780819, 5375635, 3863851, 6423851, 4852315, 3454298, 6030698, 4590437, 3053386, 5638986, 4135573, 6687381, 5113133, 3590829, 6163125, 4851114, 3181477, 5770661, 4459850, 2915477, 5377174, 3864910, 6423894, 4983477, 3454386, 6031058, 4591269, 3182154, 5506635, 4000919, 6554795, 5113179, 3590870, 6163306, 4851538, 3315493, 5770021, 4328075, 2774171, 5375147, 3860827]

/**
 * 获取指定阳历日期对应的中国农历日期
 * @param solarYear 阳历年（仅支持 1900-2100），如 1990
 * @param solarMonth 阳历月（从 1 开始），如 12
 * @param solarDay 阳历日（从 1 开始），如 6
 */
export function solarToChineseLunar(solarYear: number, solarMonth: number, solarDay: number) {
	console.assert(solarYear >= chineseLunarDatas[0] + 2 && solarYear <= chineseLunarDatas[0] + chineseLunarDatas.length - 2, `Only support years between ${chineseLunarDatas[0] + 2} and ${chineseLunarDatas[0] + chineseLunarDatas.length - 2}`)
	// 1) 找到离该阳历年最近的农历正月初一
	let lunarYear = solarYear
	let lunarData = chineseLunarDatas[lunarYear - chineseLunarDatas[0]]
	let solarMonthStart = (lunarData >> 22 & 1) + 1
	let solarDayStart = lunarData >> 17 & 0b11111
	// 当年正月初一晚于目标日期，回退到去年正月初一
	if (solarMonthStart > solarMonth || solarMonthStart === solarMonth && solarDayStart > solarDay) {
		lunarYear--
		lunarData = chineseLunarDatas[lunarYear - chineseLunarDatas[0]]
		solarMonthStart = (lunarData >> 22 & 1) + 1
		solarDayStart = lunarData >> 17 & 0b11111
	}
	// 2) 从该农历初一往下数对应天数，确定农历日期
	let dayOffset = Math.round(((new Date(solarYear, solarMonth - 1, solarDay) as unknown as number) - (new Date(lunarYear, solarMonthStart - 1, solarDayStart) as unknown as number)) / 86400000)
	let lunarMonth = 1
	while (true) {
		const dayCount = lunarData >> (lunarMonth - 1) & 1 ? 30 : 29
		if (dayOffset < dayCount) {
			break
		}
		dayOffset -= dayCount
		lunarMonth++
	}
	// 3) 闰月及之后的月号减一
	const leapMonth = lunarData >> 13 & 0b1111
	if (leapMonth > 0 && lunarMonth > leapMonth) {
		lunarMonth--
		if (lunarMonth === leapMonth) {
			lunarMonth = -lunarMonth
		}
	}
	return { lunarYear, lunarMonth, lunarDay: dayOffset + 1 } as ChineseLunarDate
}

/** 表示中国农历日期 */
export interface ChineseLunarDate {
	/** 农历年 */
	lunarYear: number
	/** 农历月（从 1 开始），如果是闰月则为负数 */
	lunarMonth: number
	/** 农历日（从 1 开始） */
	lunarDay: number
}

/**
 * 获取指定中国农历日期对应的阳历日期
 * @param lunarYear 农历年（仅支持 1900-2100），如 1990
 * @param lunarMonth 农历月（从 1 开始），如果是闰月则为负数
 * @param lunarDay 农历日（从 1 开始）
 */
export function chineseLunarToSolar(lunarYear: number, lunarMonth: number, lunarDay: number) {
	// 修正月份计数
	const lunarData = chineseLunarDatas[lunarYear - chineseLunarDatas[0]]
	if (lunarMonth < 0) {
		lunarMonth = -lunarMonth
	} else {
		const leapMonth = lunarData >> 13 & 0b1111
		if (leapMonth === 0 || lunarMonth <= leapMonth) {
			lunarMonth--
		}
	}
	// 计算指定日期和当年农历正月初一的相差天数
	let dayOffset = lunarDay - 1
	for (let i = 0; i < lunarMonth; i++) {
		dayOffset += lunarData >> i & 1 ? 30 : 29
	}
	// 从农历正月初一对应的阳历日期往下数相同天数
	return new Date(lunarYear, lunarData >> 22 & 1, (lunarData >> 17 & 0b11111) + dayOffset)
}