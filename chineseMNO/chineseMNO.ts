/**
 * 获取手机号码所属的移动运营商（不支持携号转网的手机号）
 * @param mobile 手机号码
 * @returns 返回运营商英文标识
 */
export function getChineseMNO(mobile: string) {
	if (/^(?:134[0-8]|13[5-9]|1440|14[78]|15[0-27-9]|165|170[356]|17[28]|18[2-478]|19[578])/.test(mobile)) {
		return "chinaMobile"
	}
	if (/^(?:13[0-2]|1400|14[56]|15[56]|16[67]|170[4789]|17[156]|18[56]|196)/.test(mobile)) {
		return "chinaUnion"
	}
	if (/^(?:133|1349|1410|149|153|162|170[0-2]|17[37]|1740[0-5]|18[019]|19[0139])/.test(mobile)) {
		return "chinaTelcom"
	}
	return "unknown"
}