/**
 * 阳历每年节气的信息
 * @description 每个数字代表一个阳历年的信息，数字中每位代表每个节气对应的阳历日和最小可能值的偏差
 */
export const solarTermDatas = [1898, 0x55aaa9aa5a55, 0x5afaa9ea5a56, 0x6afeeaee9a5a, 0xaafeeefeaa6a, 0xaafffeffafaa, 0x5afaa9ea5aab, 0x6afeeaee9a5a, 0xaafeeeeeaa6a, 0xaafffeffafaa, 0x5afaa9ea5aab, 0x6afeeaee9a5a, 0xaafeeeeeaa6a, 0xaafffeffafaa, 0x56faa9ea5aab, 0x6afaeaee9a56, 0xaafeeeee9a5a, 0xaaffeefeaeaa, 0x56eaa9ea5aaa, 0x6afaeaea9a56, 0x6afeeeee9a5a, 0xaaffeefeaeaa, 0x56eaa9ea5aaa, 0x5afaeaea5a56, 0x6afeeeee9a5a, 0xaaffeefeaa6a, 0x56eaa9ea5aaa, 0x5afaeaea5a56, 0x6afeeaee9a5a, 0xaaffeefeaa6a, 0x55aaa9ea5aaa, 0x5afaa9ea5a56, 0x6afeeaee9a5a, 0xaafeeefeaa6a, 0x55aaa9aa5aaa, 0x5afaa9ea5a56, 0x6afeeaee9a5a, 0xaafeeeeeaa6a, 0x55aaa9aa5aaa, 0x5afaa9ea5a56, 0x6afeeaee9a5a, 0xaafeeeeeaa6a, 0x55aaa9aa5aaa, 0x5afaa9ea5a56, 0x6afeeaee9a5a, 0xaafeeeeeaa6a, 0x55aaa9a95aaa, 0x56eaa9ea5a56, 0x6afaeaee9a56, 0xaafeeeee9a5a, 0x55aa99a959aa, 0x56eaa9ea5a55, 0x6afaeaea5a56, 0xaafeeeee9a5a, 0x55aa99a959aa, 0x56eaa9ea5a55, 0x5afaeaea5a56, 0x6afeeaee9a5a, 0x55aa99a955aa, 0x56eaa9ea5a55, 0x5afaa9ea5a56, 0x6afeeaee9a5a, 0x55a999a9556a, 0x55aaa9aa5a55, 0x5afaa9ea5a56, 0x6afeeaee9a5a, 0x55a999a9556a, 0x55aaa9aa5a55, 0x5afaa9ea5a56, 0x6afeeaee9a5a, 0x55a99999556a, 0x55aaa9aa5a55, 0x5afaa9ea5a56, 0x6afeeaee9a5a, 0x55a99999556a, 0x55aaa9a95a55, 0x5afaa9ea5a56, 0x6afaeaee9a5a, 0x55a99999456a, 0x55aa99a95a55, 0x5aeaa9ea5a56, 0x6afaeaea9a56, 0x55a99999456a, 0x55aa99a95a55, 0x56eaa9ea5a56, 0x6afaeaea5a56, 0x55a99599455a, 0x55aa99a95955, 0x56eaa9ea5a55, 0x5afae9ea5a56, 0x15a99599455a, 0x55a999a95555, 0x56eaa9aa5a55, 0x5afaa9ea5a56, 0x15a99599455a, 0x55a999a95515, 0x55aaa9aa5a55, 0x5afaa9ea5a56, 0x15a99599455a, 0x55a999995515, 0x55aaa9aa5a55, 0x5afaa9ea5a56, 0x15a99599455a, 0x55a999995515, 0x55aaa9aa5a55, 0x5afaa9ea5a56, 0x15a99599455a, 0x55a999995515, 0x55aa99a95a55, 0x5afaa9ea5a56, 0x15a59599455a, 0x55a999994515, 0x55aa99a95a55, 0x5aeaa9ea5a56, 0x15a59595455a, 0x55a995994515, 0x55aa99a95a55, 0x56eaa9ea5a56, 0x15a595950556, 0x55a995994505, 0x55aa99a95955, 0x56eaa9aa5a55, 0x15a554950556, 0x15a995994505, 0x55a999a95555, 0x56eaa9aa5a55, 0x5a554950556, 0x15a995994505, 0x55a999995515, 0x55aaa9aa5a55, 0x5a554950556, 0x15a995994505, 0x55a999995515, 0x55aaa9aa5a55, 0x5a554950556, 0x15a995994505, 0x55a999995515, 0x55aa99a95a55, 0x5a554950556, 0x15a995994505, 0x55a999995515, 0x55aa99a95a55, 0x5a554950556, 0x15a595954505, 0x55a999994515, 0x55aa99a95a55, 0x59554950556, 0x15a595950505, 0x55a995994515, 0x55aa99a95a55, 0x19554550556, 0x15a554950501, 0x55a995994505, 0x55a999a95555, 0x19554550555, 0x15a554950501, 0x55a995994505, 0x55a999995555, 0x19554550555, 0x5a554950501, 0x15a995994505, 0x55a999995555, 0x5554550555, 0x5a554950501, 0x15a995994505, 0x55a999995515, 0x5554550555, 0x5a554950501, 0x15a995994505, 0x55a999995515, 0x5544540555, 0x5a554950501, 0x15a595954505, 0x55a999995515, 0x5544540555, 0x59554950501, 0x15a595954505, 0x55a995994515, 0x5544540555, 0x59554950501, 0x15a594950505, 0x55a995994515, 0x5544540555, 0x19554550501, 0x15a554950505, 0x55a995994505, 0x5444540055, 0x19554550500, 0x15a554950501, 0x55a995994505, 0x5444440055, 0x19554550500, 0x5a554950501, 0x15a995994505, 0x5444440055, 0x5554550500, 0x5a554950501, 0x15a995994505, 0x5444440015, 0x5544550500, 0x5a554950501, 0x15a995994505, 0x55a999995515, 0x55aa99a95a55]

/**
 * 获取指定阳历日期对应的节气索引，如果该日期不是节气则返回 0
 * @param solarYear 阳历年（仅支持 1900-2100），如 1990
 * @param solarMonth 阳历月（从 1 开始），如 12
 * @param solarDay 阳历日（从 1 开始），如 6
 * @returns 各索引含义如下：
 * - 1: 小寒(slightCold)
 * - 2: 大寒(greatCold)
 * - 3 立春(springBegins)
 * - 4: 雨水(theRains)
 * - 5: 惊蛰(insectsAwaken)
 * - 6: 春分(vernalEquinox)
 * - 7: 清明(clearAndBright)
 * - 8: 谷雨(grainRain)
 * - 9: 立夏(summerBegins)
 * - 10: 小满(grainBuds)
 * - 11: 芒种(grainInEar)
 * - 12: 夏至(summerSolstice)
 * - 13: 小暑(slightHeat)
 * - 14: 大暑(greatHeat)
 * - 15: 立秋(autumnBegins)
 * - 16: 处暑(stoppingTheHeat)
 * - 17: 白露(whiteDews)
 * - 18: 秋分(autumnEquinox)
 * - 19: 寒露(coldDews)
 * - 20: 霜降(hoarFrostFalls)
 * - 21: 立冬(winterBegins)
 * - 22: 小雪(lightSnow)
 * - 23: 大雪(heavySnow)
 * - 24: 冬至(winterSolstice)
 */
export function getSolarTerm(solarYear: number, solarMonth: number, solarDay: number) {
	const solarTermIndex = solarMonth * 2 + (solarDay < 16 ? -1 : 0)
	const solarTermData = solarTermDatas[solarYear - solarTermDatas[0]]
	const dayStart = (solarDay < 16 ? 4 : 19) + (solarMonth > 6 ? 2 : solarMonth === 2 ? -1 : 0)
	// 由于 JavaScript 不支持 64 位整数位运算，超过 32 位的数字先用除法取得高位部分
	if (dayStart + (solarTermIndex < 16 ? solarTermData >> (solarTermIndex - 1) * 2 & 0b11 : (solarTermData / 2 ** 16) >> ((solarTermIndex - 1) * 2 - 16) & 0b11) === solarDay) {
		return solarTermIndex
	}
	return 0
}