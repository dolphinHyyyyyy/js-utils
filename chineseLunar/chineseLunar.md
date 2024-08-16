# 中国农历
阳历和农历互相转换。

## 阳历转农历
```html demo .doc
<input type="date" id="input_solar" onchange="solar_to_chineseLunar()" value="2000-01-01">
<input type="button" value="阳历转农历" onclick="solar_to_chineseLunar()">
<span id="output_solar"></span>
<script>
	import { solarToChineseLunar, getSolarTerm, getChineseLunarMonthName, getChineseLunarYearGanZhi, getChineseLunarDayName, getSolarTermChineseName } from "./chineseLunar"
	export function solar_to_chineseLunar() {
		const date = input_solar.valueAsDate
		const lunar = solarToChineseLunar(date.getFullYear(), date.getMonth() + 1, date.getDate())
		const term = getSolarTermChineseName(getSolarTerm(date.getFullYear(), date.getMonth() + 1, date.getDate()))
		output_solar.textContent = `${getChineseLunarYearGanZhi(lunar.lunarYear)}${getChineseLunarMonthName(lunar.lunarMonth)}${getChineseLunarDayName(lunar.lunarDay)} ${term || ""}`
	}
</script>
```

## 农历转阳历
```html demo .doc
<input type="date" id="input_lunar" onchange="chineseLunar_solar_to()" value="2000-01-01">
<input type="button" value="农历转阳历" onclick="chineseLunar_solar_to()">
<span id="output_lunar"></span>
<script>
	import { chineseLunarToSolar } from "./chineseLunar"
	export function chineseLunar_solar_to() {
		const date = input_lunar.valueAsDate
		const solar = chineseLunarToSolar(date.getFullYear(), date.getMonth() + 1, date.getDate())
		output_lunar.textContent = solar.toLocaleDateString()
	}
</script>
```

## 生成数据表
为减少代码体积和提高性能，先计算好 1900-2100 的农历信息
```html run .doc
开始年份：<input type="number" id="generate_start" value="1900">
结束年份：<input type="number" id="generate_end" value="2100">
<input type="button" onclick="generateNow()" value="生成">
<textarea id="generate_output"></textarea>
<script>
	import { solarToChineseLunar, chineseLunarToSolar, getDateOfSolarTerm } from "./convert-full"

	export function generateNow() {
		const [lunarDatas, termDatas] = generateDatas(+generate_start.value - 1, +generate_end.value + 1)
		generate_output.value = `export const chineseLunarDatas = [${lunarDatas.join(", ")}]\n\nexport const solarTermDatas = [${termDatas.map((data, i) => i ? "0x" + data.toString(16) : data).join(", ")}]`
	}

	function generateDatas(startYear, endYear) {
		const lunarDatas = [startYear - 1]
		const termDatas = [startYear - 1]
		for (let year = startYear; year <= endYear; year++) {
			let lunarData = 0
			const leapMonth = getLeapMonth(year)
			let offset = 0
			for (let month = 1; month <= 12; month++, offset++) {
				const dayCount = Math.round(((month === leapMonth ? chineseLunarToSolar(year, -month, 1) : month === 12 ? chineseLunarToSolar(year + 1, 1, 1) : chineseLunarToSolar(year, month + 1, 1)) - chineseLunarToSolar(year, month, 1)) / 86400000)
				console.assert(dayCount === 29 || dayCount === 30, 'Invalid dayCount: ' + year + '/' + month)
				if (dayCount === 30) {
					lunarData |= 1 << offset
				}
				if (month === leapMonth) {
					offset++
					const dayCount = Math.round(((month === 12 ? chineseLunarToSolar(year + 1, 1, 1) : chineseLunarToSolar(year, month + 1, 1)) - chineseLunarToSolar(year, -month, 1)) / 86400000)
					console.assert(dayCount === 29 || dayCount === 30, 'Invalid dayCount: ' + year + '/' + month)
					if (dayCount === 30) {
						lunarData |= 1 << offset
					}
				}
			}
			lunarData |= leapMonth << 13
			const firstDay = chineseLunarToSolar(year, 1, 1)
			console.assert(firstDay.getMonth() === 0 || firstDay.getMonth() === 1, 'Invalid firstDay: ' + firstDay.toLocaleDateString())
			lunarData |= firstDay.getDate() << 17
			if (firstDay.getMonth() === 1) {
				lunarData |= 1 << 22
			}
			lunarDatas.push(lunarData)
			let termData = 0
			for (let i = 1; i <= 24; i++) {
				const day = new Date(2000, 0, Math.round(getDateOfSolarTerm(year, i)) + 1)
				const solarMonth = day.getMonth() + 1
				const solarDay = day.getDate()
				const dayStart = (solarDay < 16 ? 4 : 19) + (solarMonth > 6 ? 2 : solarMonth === 2 ? -1 : 0)
				const dayOffset = solarDay - dayStart
				console.assert(dayOffset >= 0 && dayOffset <= 3, 'Invalid dayOffset: ' + day.toLocaleDateString())
				termData += dayOffset * 2 ** ((i - 1) * 2)
			}
			termDatas.push(termData)
		}
		return [lunarDatas, termDatas]
	}

	function getLeapMonth(year) {
		const firstDay = chineseLunarToSolar(year, 1, 1)
		const lastDay = chineseLunarToSolar(year + 1, 1, 1)
		while (firstDay < lastDay) {
			const lunar = solarToChineseLunar(firstDay.getFullYear(), firstDay.getMonth() + 1, firstDay.getDate())
			if (lunar.lunarMonth < 0) {
				return -lunar.lunarMonth
			}
			firstDay.setDate(firstDay.getDate() + 1)
		}
		return 0
	}
</script>
```