/** 匹配首尾空格的正则表达式 */
export const spaceRegExp = /^\s*|\s*$/g

/** 白行的正则表达 */
export const blankLineRegExp = /\r?\n\s*\r?\n/

/** 包含双字节字符的正则表达式 */
export const wideCharRegExp = /[\x00-\xff]/

/** 匹配字母的正则表达式 */
export const letterRegExp = /^[a-zA-Z]+$/

/** 匹配小写字母的正则表达式 */
export const letterLowerCaseRegExp = /^[a-z]*$/

/** 匹配大写字母的正则表达式 */
export const letterUpperCaseRegExp = /^[A-Z]*$/

/** 匹配全数字的正则表达式 */
export const digitRegExp = /^\d+$/

/** 匹配字母或数字的正则表达式 */
export const letterOrDigitRegExp = /^[a-zA-Z\d]+$/

/** 含有特殊符号的正则表达式 */
export const symbolRegExp = /[%&',;=?$\x22]/

/** 匹配自然数的正则表达式 */
export const naturalRegExp = /^(?:0|[1-9]\d*)$/

/** 匹配整数的正则表达式 */
export const integerRegExp = /^[-+]?\d+$/

/** 匹配数字的正则表达式 */
export const numberRegExp = /^[-+]?\d+(?:\.\d*)?$/

/** 匹配十六进制数字的正则表达式 */
export const hexRegExp = /^[\da-fA-F]*$/

/** 匹配八进制数字的正则表达式 */
export const octalRegExp = /^[0-7]*$/

/** 匹配二进制数字的正则表达式 */
export const binaryRegExp = /^[01]*$/

/** 匹配合法标志名（字母、数字或下划线，但不允许数字开头）的正则表达式 */
export const identifierRegExp = /^[\u4E00-\u9FA5\uFE30-\uFFA0a-zA-Z_$][\u4E00-\u9FA5\uFE30-\uFFA0\w$]+$/

/** 匹配金额的正则表达式 */
export const currencyRegExp = /^(?:[1-9]\d*(\.\d\d?)?|0?\.\d\d?)$/

/** 匹配合法路径的正则表达式 */
export const pathRegExp = /^[^<>;:/\\?*"|]+$/

/** 匹配是否是地址的正则表达式 */
export const urlRegExp = /^(?:[-\w]+:)?\/\/./

/** 匹配邮箱的正则表达式 */
export const emailRegExp = /^[\u4E00-\u9FA5\uFE30-\uFFA0\w\-+\.]+@[\u4E00-\u9FA5\uFE30-\uFFA0\w\-]+(?:\.[\u4E00-\u9FA5\uFE30-\uFFA0\w\-]+)*$/

/** 匹配 IPv4 地址的正则表达式 */
export const ipv4RegExp = /^(?:[01]?\d?\d|2[0-4]\d|25[0-5])(?:\.(?:[01]?\d?\d|2[0-4]\d|25[0-5])){3}$/

/** 匹配 IPv6 地址的正则表达式 */
export const ipv6RegExp = /^(?:(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,7}:|(?:[0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,5}(?::[0-9a-fA-F]{1,4}){1,2}|(?:[0-9a-fA-F]{1,4}:){1,4}(?::[0-9a-fA-F]{1,4}){1,3}|(?:[0-9a-fA-F]{1,4}:){1,3}(?::[0-9a-fA-F]{1,4}){1,4}|(?:[0-9a-fA-F]{1,4}:){1,2}(?::[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:(?:(?::[0-9a-fA-F]{1,4}){1,6})|:(?:(?::[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(?::[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(?:ffff(?::0{1,4}){0,1}:){0,1}(?:(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9])|(?:[0-9a-fA-F]{1,4}:){1,4}:(?:(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/

/** 匹配 IP 地址的正则表达式 */
export const ipRegExp = /^(?:[01]?\d?\d|2[0-4]\d|25[0-5])(?:\.(?:[01]?\d?\d|2[0-4]\d|25[0-5])){3}$/

/** 匹配域名的正则表达式 */
export const domainRegExp = /[a-zA-Z\d][-a-zA-Z\d]{0,62}(?:\/.[a-zA-Z\d][-a-zA-Z\d]{0,62})+/

/** 匹配日期时间的正则表达式 */
export const dateTimeRegExp = /^(?:(?:1[6-9]|[2-9][0-9])[0-9]{2}([-/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:(?:1[6-9]|[2-9][0-9])(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00)([-/.]?)0?2\2(?:29))\s(?:[0-1]?\d|2[0-3]):(?:[0-5]?\d):(?:[0-5]?\d)$/

/** 匹配日期的正则表达式 */
export const dateRegExp = /^(?:(?:1[6-9]|[2-9][0-9])[0-9]{2}([-/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:(?:1[6-9]|[2-9][0-9])(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00)([-/.]?)0?2\2(?:29))$/

/** 匹配时间的正则表达式 */
export const timeRegExp = /^(?:[0-1]?\d|2[0-3]):(?:[0-5]?\d):(?:[0-5]?\d)$/

/** 匹配年的正则表达式 */
export const yearRegExp = /^\d{4}$/

/** 匹配月份的正则表达式 */
export const monthRegExp = /^(?:0?[1-9]|1[0-2])$/

/** 匹配天的正则表达式 */
export const dayRegExp = /^(?:0?[1-9]|[12][0-9]|30|31)$/

/** 匹配小时的正则表达式 */
export const hourRegExp = /^\d|1\d|2[0-3]$/

/** 匹配分钟或秒的正则表达式 */
export const minuteRegExp = /^\d|[1-5]\d$/

/** 包含 HTML 片段的正则表达式 */
export const htmlRegExp = /<\S*?[^>]*>/

/** 匹配 XML 文档的正则表达式 */
export const xmlDocumentRegExp = /^(?:[a-zA-Z]+-?)+[a-zA-Z0-9]+\\.[x|X][m|M][l|L]$/

/** 匹配合法账号的正则表达式 */
export const userNameRegExp = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/

/** 匹配密码（以字母开头，长度在6~18之间，只能包含字母、数字和下划线）的正则表达式 */
export const passwordRegExp = /^[a-zA-Z]\w{5,17}$/

/** 匹配强密码（必须包含大小写字母和数字的组合，不能使用特殊字符，长度在 8-10 之间）的正则表达式 */
export const passwordSafeRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/

/** 匹配手机号的正则表达式 */
export const phoneRegExp = /^(?:\+\d\d)?1\d{10}$/

/** 匹配手机号（带区号）的正则表达式 */
export const internationalPhoneRegExp = /^(?:\+\d{1-3})?1\d{10}$/

/** 匹配电话号码的正则表达式 */
export const telephoneRegExp = /^(?:\d{3,4}\-)?8?\d{7}$/

/** 包含英文的正则表达式 */
export const englishRegExp = /^[\-a-zA-Z\s]+$/

/** 包含中文的正则表达式 */
export const chineseCharacterRegExp = /[\u4E00-\u9FA5\uFE30-\uFFA0]/

/** 包含中文的正则表达式 */
export const chineseRegExp = /^[\u4E00-\u9FA5\uFE30-\uFFA0]+$/

/** 匹配中国身份证的正则表达式 */
export const chineseIDRegExp = /^[1-9]\d{5}[1-9]\d{3}(?:0\d|1[0-2])(?:[0|1|2]\d|3[0-1])\d{3}[\dxX]$/

/** 匹配中国邮政编码的正则表达式 */
export const chinesePostCodeRegExp = /^[1-9]\d{5}(?!\d)$/

/** 匹配中国车牌的正则表达式 */
export const chineseCarNumberRegExp = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z][A-Z](?:(?:[0-9]{5}[DF]|DF[0-9]{4}))|[A-HJ-NP-Z0-9][A-HJ-NP-Z0-9挂学警港澳]$/