import { chineseLunarDatas } from "./solar"

/** 所有阳历节日 */
export const chineseSonarFestivals = {
	101: "元旦",
	308: "妇女节",
	312: "植树节",
	501: "劳动节",
	504: "青年节",
	601: "儿童节",
	701: "建党节",
	801: "建军节",
	910: "教师节",
	1001: "国庆节"
}

/**
 * 获取指定阳历日期对应的节日，如果该日期不是节日则返回 `undefined`
 * @param solarYear 阳历年，如 1990
 * @param solarMonth 阳历月（从 1 开始），如 12
 * @param solarDay 阳历日（从 1 开始），如 6
 */
export function getChineseSonarFestival(solarYear: number, solarMonth: number, solarDay: number) {
	return chineseSonarFestivals[solarMonth * 100 + solarDay]
}

/** 所有农历节日 */
export const chineseLunarFestivals = {
	101: "春节",
	115: "元宵节",
	505: "端午节",
	707: "七夕节",
	815: "中秋节",
	909: "重阳节",
	1208: "腊八节",
	1230: "除夕"
}

/**
 * 获取指定农历日期对应的节日，如果该日期不是节日则返回 `undefined`
 * @param lunarYear 农历年（仅支持 1900-2100），如 1990
 * @param lunarMonth 农历月（从 1 开始），如果是闰月则为负数
 * @param lunarDay 农历日（从 1 开始）
 */
export function getChineseLunarFestival(lunarYear: number, lunarMonth: number, lunarDay: number) {
	// 如果农历腊月廿九是该年最后一天则该日为除夕
	if (lunarDay === 29 && lunarMonth === 12) {
		const lunarData = chineseLunarDatas[lunarYear - chineseLunarDatas[0]]
		return lunarData >> 12 & 1 ? undefined : chineseLunarFestivals[1230]
	}
	return chineseLunarFestivals[lunarMonth * 100 + lunarDay]
}