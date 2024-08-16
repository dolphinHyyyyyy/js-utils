# 数组扩展
扩展 JavaScript 内置对象 `Array` 的 API。

## 数组 API 一览
> 提示：以下代码中高亮显示的为 JavaScript 原生 API。

### 判断是否是数组
```js
// 判断是否是数组
> var isArray = Array.isArray(arr) // true
```

### 创建新数组
```js
// 创建固定内容的数组
> var arr = new Array(6).fill(1) // [1, 1, 1, 1, 1, 1]

// 创建等差数组
var arr = range(1, 7) // [1, 2, 3, 4, 5, 6]
var arr = range(1, 7, -1) // [6, 5, 4, 3, 2, 1]

// 从类数组创建数组
> var arr = Array.from(arguments)

// 复制一个数组
> var arr2 = arr.slice()
```

### 在数组中插入元素
```js
// 插入到末尾
> arr.push("item")
pushIfNotExists(arr, "item") // 仅不存在时插入

// 插入到开头
> arr.unshift("item")

// 插入到任意位置
> arr.splice(1, 0, "item")
insert(arr, 1, "item")

// 插入并排序
insertSorted(arr, "item")
insertSortedIfNotExists(arr, "item") // 仅不存在时插入
```

### 从数组移除元素
```js
// 移除末尾
> arr.pop()

// 移除开头
> arr.shift()

// 移除任意位置
> arr.splice(2, 3) // 移除索引 2、3、4（共 3 个）
removeAt(arr, 2) // 移除索引 2

// 移除某个项
> var arr2 = arr.filter(item => item !== "item") // 利用过滤实现类似移除的效果
remove(arr, "item") // 移除第一个
removeAll(arr, "item") // 全部移除
removeSorted(arr, "item") // 如果数组已排序，利用二分算法更快移除

// 清空数组
> arr.length = 0

// 移除 null/undefined
clean(["", false, 0, undefined, null, {}]) // ["", false, 0, {}]

// 移除重复项
var arr2 = unique([1, 9, 9, 0]) // [1, 9, 0]
var arr2 = filterNonUnique([1, 2, 2, 3, 4, 4, 5]) // [1, 3, 5]，只返回不重复的项
> var arr2 = arr.filter(item => arr.indexOf(item) !== arr.lastIndexOf(item)) // 移除重复三次及以上的元素
```

### 更新数组中的元素
```js
// 交换两个位置的值
swap(arr, 1, 3)

// 批量复制内部的值
> [1, 2].copyWithin(1, 0, 1) // [1, 1]

// 依次更新每个元素并组成新数组
> var arr2 = arr.map(item => item + 1)
var arr2 = update(arr, item => item + 1) // 类似 arr.map()，区别在如果所有项都没有变化，返回原数组引用以节约内存
> var arr2 = arr.flatMap(x => [x]) // 类似 arr.map()，区别在可以一对多，即一个元素处理后得到零个或多个元素

// 取对象数组中特定的键组成的新数组并忽略 undefined
var input = [{"user": "fred"}, {"user": "bred"}, {"user": undefined}]
var arr2 = select(input, "user") // ["fred", "bred"]
var arr2 = select(input, o => o.user) // ["fred", "bred"]
```

### 从数组取值
```js
// 取指定位置
> var item = arr.at(-1) // 取最后一个

// 随机取值
var item = randomGet(arr)

// 遍历每个值
> arr.forEach(item => {})
```

### 搜索
```js
// 查找第一个
> var index = arr.indexOf("item")
> var index = arr.findIndex(item => item === "item")
> var item = arr.find(item => item === "item")
var index = binarySearch(arr, "item") // 二分搜索，只针对已排序的数组有效，比常规搜索快

// 查找最后一个
> var index = arr.lastIndexOf("item")
var index = findLastIndex(arr, item => item === "item")
var item = findLast(arr, item => item === "item")

// 查找所有
> var arr2 = arr.filter(item => item === "item")

// 判断是否存在
> var exists = arr.includes("item")
> var exists = arr.some(item => item === "item") // 至少存在一项匹配
> var exists = arr.every(item => item === "item") // 全部匹配

// 判断是否已去重
var unique = isUnique([1, 9, 0])
```

### 排序
```js
// 自定义排序
> arr.sort() // 注意：原生排序会先将内容转为字符串然后排序，比如 [1, 2, 10] 排序结果是 [1, 10, 2]
> arr.sort((x, y) => x - y) // 对数字数组正序排序
> arr.sort((x, y) => y - x) // 对数字数组倒序排序
sortBy(arr, o => o) // 对数字或字符串数组排序
sortByDesc(arr, o => o) // 类似 sortBy，但是是倒序的

// 按字段排序
var input = [{"user": "fred"}, {"user": "bred"}]
sortBy(input, "user") // [{"user": "bred"}, {"user": "fred"}]
sortBy(input, "user", o => o.user) // [{"user": "bred"}, {"user": "fred"}]
sortByDesc(input, "user") // 类似 sortBy，但是是倒序的
sortByDesc(input, "user", o => o.user) // 类似 sortBy，但是是倒序的

// 判断是否已排序
var sorted = iSorted(arr)
var sorted = isSorted(arr, (x, y) => x - y)

// 倒序
> input.reverse()

// 全排列（计算相同元素不同顺序的所有可能）
var arr2 = permute([1, 2, 3]) // [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]

// 随机排序（打乱顺序）
shuffle(arr)
```

> 更多排序算法见 {@link ../sort/sort.md}。

### 数组转其他类型
```js
// 数组转字符串
> var str = arr.join(",")

// 字符串转数组
> var arr = str.split(",")

// 一维数组转多维
var arr2 = split([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]

// 多维数组转一维
> var arr2 = arr.flat() // 仅支持二维转一维
var arr2 = deepFlat([[1, 2], [[[3]]]]) // [1, 2, 3]，支持任意维

// 数组转对象
var arr2 = associate(["x", "y"], [1, 2]) // {x: 1, y: 2}

// 对象转数组
> var keys = Object.keys({x: 1, y: 2}) // ["x", "y"]
> var values = Object.values({x: 1, y: 2}) // [1, 2]
> var entries = Object.entries({x: 1, y: 2}) // [["x", 1], ["y", 2]]

// 合并为一个值
> arr.reduce((x, y) => x + y) // 全部求和
> arr.reduceRight((x, y) => x + y) // 全部求和，从右侧开始
```

### 集合操作
```js
// 取指定位置对应的子集
var arr2 = nth([1, 2, 3, 4, 5, 6], 2) // [2, 4, 6]

// 集合运算
var arr2 = intersect([1, 2, 3], [101, 2, 1, 10], [2, 1]) // 返回交集 [1, 2]
var arr2 = union([1, 2], [1]) // 返回并集 [1, 2]
var arr2 = exclude([1, 2], [1]) // 返回补集 [2]

// 分组
var arr2 = partition([1, 2, 3], item => item % 2 === 1) // [[1, 3], [2]]
var obj = groupBy([{x: 1}, {x: 1}, {x: 2}], "x") // {1: [{x: 1}, {x: 1}]}, 2: [{x: 1}]}
var map = groupByToMap([{x: 1}, {x: 1}, {x: 2}], "x")
```

### 统计
```js
// 统计个数
> arr.filter(x => x === "x").length
count(["x", "y"], "x") // 1
countBy([{x: 1}, {x: 1}, {x: 2}], "x") // {1: 2, 2: 1}，统计所有字段

// 求值
> Math.max(...[1, 2]) // 2，最大值
> Math.min(...[1, 2]) // 1，最小值
sum([1, 2]) // 3，求和
avg([1, 2]) // 1.5，平均值
```