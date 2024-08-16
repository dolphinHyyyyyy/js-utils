# 字符串扩展
扩展 JavaScript 内置对象 `String` 的 API。

## 字符串 API 一览
> 提示：以下代码中高亮显示的为 JavaScript 原生 API。

### 判断是否是字符串
```js
// 判断是否是字符串
> var isString = typeof str === "string" // true
var isString = isString(str) // 基础类型或引用类型
```

### 创建新字符串
```js
// 从 Unicode 码转字符串
> var str = String.fromCharCode(59)
> var str = String.fromCodePoint(59) // 类似 String.fromCharCode()，区别在于支持 Emoji 等双宽 Unicode 字符
> var str = String.raw`\n` // 获取未转义的原始字符串

// 创建固定内容的字符串
> var str = "x".repeat(6) // "xxxxxx"

// 格式化字符串
var str = formatString("x = {0}, y = {1}", 1, 3) // "x = 1, y = 3"
var str = formatString("x = {x}", {x: 1}) // "x = 1"

// 生成随机字符串
var str = getRandomString(10)
```

### 添加字符
```js
// 添加头尾字符
> var str2 = str.padStart(4, " ")
> var str2 = str.padEnd(4, ".")

// 添加和删除缩进
var str2 = indent("x\ny")
var str2 = unindent("  x\n  y")
```

### 替换字符
```js
// 替换内容（替换成空即删除）
> var str2 = str.replace("1", "2") // 注意仅移除第一项
> var str2 = str.replace(/\d/, "$&") // 支持正则，注意仅移除第一项
> var str2 = str.replaceAll("1", "2")
> var str2 = str.replaceAll(/\d/, "$&") // 支持正则

// 转大写
> var str2 = str.toUpperCase() // 仅支持英文字母
> var str2 = str.toLocaleUpperCase() // 类似 str.toUpperCase()，区别在支持更多语言

// 转小写
> var str2 = str.toLowerCase() // 仅支持英文字母
> var str2 = str.toLocaleLowerCase() // 类似 str.toUpperCase()，区别在支持更多语言

// 首字母大写
> var str2 = capitalize(str)
> var str2 = uncapitalize(str) // 取消首字母大写
> var str2 = capitalizeWords(str) // 每个单次首字母大写

// 转风格
var str2 = toCamelCase(str)
var str2 = toKebabCase(str)

// 规范化 Unicode 字符
> var str2 = str.normalize()

// 判断是否是全小写
var r = isLowerCase(str)

// 判断是否是全大写
var r = isUpperCase(str)

var str2 = mask("1234567890", 1, 2) // "1*******90"
```

### 删除字符
```js
// 删除头尾空白
> var str2 = str.trim()
> var str2 = str.trimStart()
> var str2 = str.trimEnd()

// 获取子字符串
> var str2 = str.substring(0, 10)
> var str2 = str.slice(0, 10) // 类似 str.substring(), 区别在第二个参数如果是负数，表示从末尾开始

// 获取左右子字符串
var str2 = start(str, 3)
var str2 = end(str, 3)

// 超出部分改为省略号
var str2 = truncate(str)
var str2 = truncateByWord(str) // 尽量不在单词边界截断单词

// 删除空白
var str2 = clean(str) // 删除空白
var str2 = compactWhitespace(str) // 超过 2 个空白合并为 1 个

// 删除非 ASCII 字符
var str2 = removeNonASCII(str)

// 删除重复字符
var str2 = unique(str)
```

### 获取单个字符
```js
// 获取字符
> var char = str.at(-1) // 取最后一个
> var char = str.charAt(0) // 取指定字符

// 获取字符编码
> var code = str.charCodeAt(0) // 取指定字符的 Unicode 码
> var code = str.codePointAt(0) // 类似 str.charCodeAt()，区别在于支持 Emoji 等双宽 Unicode 字符
```

### 搜索
```js
// 查找第一个
> var index = str.indexOf("item")

// 查找最后一个
> var index = str.lastIndexOf("item")

// 搜索正则
var index = str.search(/item/)

// 判断是否存在
> var exists = str.includes("item") // 任意位置
> var exists = str.startsWith("item") // 开头
> var exists = str.endsWith("item") // 结尾

// 查找正则匹配位置
> var match = str.match(/\d/)
> var match = str.matchAll(/\d/)

// 区分单词边界判断是否存在
var exists = containsWord("xyz xy", "x")

// 获取所有单词
var words = words("fontSize")
```

### 排序
```js
//比较两者的排序，考虑本地字典（比如中文按拼音顺序）
> var result = str.localeCompare(str2)

// 倒序
var str2 = reverse("foobar")
```

### 统计
```js
// 统计字符串个数
var count = count("xyz", "x")  // 1

// 统计字节长度（中文算两个个字符）
var count = byteLength("xyz")  // 3

// 获取哈希值
var hash = getHashCode(str)

// 获取字符串相似度
var same = levenshteinDistance(str1, str2)
```

### 字符串转其他类型
```js
// 字符串转数组
> var arr = str.split(",")
var arr = split(str, ",")

// 按行拆成多个
var arr = splitLines(str)
var arr = splitByLength(str， 4)

// 数组转字符串
> var str = arr.join(",")
```