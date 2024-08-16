# 中国移动运营商
获取手机号码所属的移动运营商。

> [!] 注意：本模块不联网校验手机号是否真实有效，也不支持携号转网的手机。

```html demo .doc
<input type="tel" pattern="\d{13}" value="15111111111" id="input" placeholder="输入手机号">
<button onclick="check()">识别运营商</button>
<div id="output"></div>
<script>
function check() {
    output.textContent = {
        chinaMobile: "中国移动",
        chinaUnion: "中国联通",
        chinaTelcom: "中国电信",
        unknown: "未知"
    }[getChineseMNO(input.value)]
}
</script>
```