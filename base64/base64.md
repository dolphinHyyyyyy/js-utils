# Base64 编码
提供 Base 64 编码和解码实现。

```html demo .doc
<input type="text" id="input" placeholder="输入任意内容" />
<button onclick="input.value = encodeBase64(input.value)">Base64 编码</button>
<button onclick="input.value = decodeBase64(input.value)">Base64 解码</button>
```

> [i] 浏览器已内置 Base64 编码和解码函数 `btoa`/`atob`，但其不支持中文。

## 图片转 Base64

```html demo .doc
<input type="file" id="input_file" onchange="encode()" />
<button onclick="encode()">Base64 编码</button>
<button onclick="decode()">Base64 解码</button>
<textarea id="output_base64" oninput="decode()"></textarea>
<img id="output_preview">
<script>
	function encode() {
		const file = input_file.files[0]
		if (!file) return
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => {
			output_base64.value = reader.result
			decode()
		}
	}
	function decode() {
		output_preview.src = output_base64.value
	}
</script>
```