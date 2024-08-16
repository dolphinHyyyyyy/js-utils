# 拼音
查询汉字对应的拼音。

## 转拼音
```html demo .doc
<input type="text" id="input" placeholder="输入中文" value="中文" />
<button onclick="output.textContent = toPinYin(input.value, ' ')">转为拼音</button>
<div id="output"></div>
```

> [!!] 仅支持简体中文
> - 如果需要支持音调和多音字自动识别请参考 [Node: Pinyin](https://www.npmjs.com/package/pinyin) 或 [Node: fast-pinyin](https://www.npmjs.com/package/fast-pinyin)

> [i] 实现原理
> 在源码中有一个拼音检索表，函数会检索此表查询拼音。

## 拼音模糊搜索
模糊搜索匹配项，支持全拼和简拼搜索。

```html demo .doc
<textarea id="input_match" placholder="输入所有项，一行一个。">重庆
聪慧
出货
chh
</textarea>
<input type="search" id="input_search" placeholder="输入搜索的内容" value="chh" oninput="search()" />
<button type="button" onclick="search()">搜索</button>
<div id="output_match" style="white-space: pre;"></div>
<script>
	import { matchPinYin } from "./match"

	export function search() {
		output_match.textContent = input_match.value.split('\n').filter(item => matchPinYin(item, input_search.value)).join('\n')
	}
</script>
```

## 按拼音排序
支持中英文混排。

```html demo .doc
<textarea id="input_sort" placholder="输入所有项，一行一个。">重庆
聪慧
出货
chh
</textarea>
<button type="button" onclick="sort()">排序</button>
<div id="output_sort" style="white-space: pre;"></div>
<script>
	import { comparePinYin } from "./sort"

	export function sort() {
		output_sort.textContent = input_sort.value.split('\n').sort(comparePinYin).join('\n')
	}
</script>
```

## 支持繁体
为保障库的小巧，默认并未包含繁体字库，要支持繁体，可手动导入 `pinyin/pinyin-gbk`，导入后所有 API 默认支持繁体。