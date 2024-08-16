/** 中国生肖表 */
export const chineseZodiacMap = "鼠牛虎兔龙蛇马羊猴鸡狗猪"

/**
 * 获取指定农历年对应的生肖
 * @param lunarYear 农历年
 */
export function getChineseZodiac(lunarYear: number) {
	return chineseZodiacMap[(lunarYear - 4) % 12]
}