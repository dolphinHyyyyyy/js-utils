# 模板引擎
最简 EJS（ASP/JSP）风格模板引擎：仅 10 行代码！

```html demo .doc
<textarea id="input_tpl" placeholder="输入模板">Hello <%= $.name %>!</textarea> 
<textarea id="input_data" placeholder="输入数据">{"name": "World"}</textarea> 
<button onclick="output.value = renderTemplate(input_tpl.value, JSON.parse(input_data.value))">渲染模板</button>
<textarea id="output" placeholder="渲染结果"></textarea>
```

## Hello World
使用 {@link #renderTemplate} 传入模板内容和数据，返回渲染后的结果。
```js
import { renderTemplate } from "./tpl"

const result = renderTemplate("Hello <%= $.name %>!", {
	name: "World"
}) // "Hello world!"
```

## 原理
模板引擎的原理是先将模板编译为 JavaScript 函数，然后通过调用函数生成最终的字符串内容。

可以使用 `compileTemplate` 将模板编译为函数，下次直接调用此函数即可渲染模板。

```js
import { compileTemplate } from "./tpl"

const render = compileTemplate("Hello <%= $.name %>!")
const result = render({name: "World1"}) // "Hello world1!"
```

## 模板语法
在模板中，使用 `<% ... %>` 插入一个 JavaScript 代码段，如 `<% console.log('hello') %>`

使用 `<%= ... %>` 可以将代码的执行结果渲染到结果，如 `Hello <%= 1 + 1 %>`

## 调试模板
在模板中插入 `<% debugger %>`，执行模板时会在该位置断点。

> ##### 另参考
> - [EJS](http://www.embeddedjs.com/)