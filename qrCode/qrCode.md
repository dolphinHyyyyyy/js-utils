# 二维码生成
纯 JavaScript 生成二维码。

```html demo doc hide
<input type="text" id="input" placeholder="输入文本或网址" value="生成二维码t 😑" style="width: 20rem" />
<button onclick="genQRCode()">生成二维码</button>
<div id="output"></div>
<script>
	import { createQRCodeSVG, svgToURL} from "./qrcode"
    export function genQRCode() {
        output.innerHTML = createQRCodeSVG(input.value)
    }
</script>
```