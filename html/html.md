# HTML 编码
处理 `&amp;` 和 `&#1000;` 格式的编码。

```html demo .doc
<textarea id="input">&lt;div&gt;</textarea>
<button onclick="input.value = encodeHTML(input.value)">编码 HTML</button>
<button onclick="input.value = decodeHTML(input.value)">解码 HTML</button>
```