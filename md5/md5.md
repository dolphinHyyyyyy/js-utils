# MD5 加密
纯 JavaScript 实现 MD5 加密算法。

```html demo .doc
<input type="text" id="input" style="width: 20em;" placeholder="要加密的内容" />
<button onclick="input.value = md5(input.value)">MD5 加密</button>
<button onclick="input.value = md5Base64(input.value)">Md5-Base64 加密</button>
<button onclick="input.value = hmacMD5(input.value, 'key')">HMAC-MD5 加密</button>
<button onclick="input.value = hmacMD5Base64(input.value, 'key')">HMAC-MD5-Base64 加密</button>
<script>
	export * from "./md5-more"
</script>
```