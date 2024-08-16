# 唯一识别码
随机生成一个唯一识别码（UUID）。

```html demo .doc
<button onclick="output.textContent = uuid()">生成 UUIDv6</button>
<div id="output"></div>
```

## 唯一识别码介绍
唯一识别码（UUID, **U**niversally **U**nique **Id**entifier）是一个通过特定算法生成的随机数值，它设计的目的是确保每次生成的数值都是不同的。

唯一识别码无需通过数据库记录，也不需要一个权威机构来管理，完全依赖算法确保其全球唯一性。唯一识别码被广泛用于标识访客、网络请求等场景。

目前软件行业使用的唯一识别码都遵循 [RFC4122 规范](http://www.ietf.org/rfc/rfc4122.txt)。全球唯一标识码（GUID，Globally Unique Identifier）是微软公司对该规范的一种实现。

唯一识别码一般由 128 位二进制数字组成，最终写成 `xxxxxxx-xxxx-Vxxx-Nxxx-xxxxxxxxxxxx` 的格式（其中 x 为十六进制数字；V 为版本号，目前有 1-5；N 为 8、9、a 或 b），比如 `6ba7b810-9dad-11d1-80b4-00c04fd430c8`。

## 如何保证唯一性
首先，唯一识别码并不是 100% 唯一的，只是其发生重复的概率微乎其微，在实际环境中可以被忽略。

其次，唯一标识码可以使用不同的算法生成，一种比较好理解的算法是：基于当前时间（精确到纳秒）、当前设备序列号（比如网卡的 MAC 地址）、生成的次数计算最终结果。因此不同的设备一定会生成不同的随机码，同一个设备由于每次生成的时间和次数是不同的，也会产生不同的随机码。

在浏览器中，由于安全原因，我们无法获取设备的序列号，也无法获取非常精确的当前时间，因此早期生成一个唯一标识码是比较困难的。有的网站使用了名为“Canvas 指纹”的技术来生成唯一标识码，但该方法可能暴露用户隐私，在最新版浏览器中已无法使用。

不过庆幸的是新版浏览器提供了 [`crypto.getRandomValues()`](https://developer.mozilla.org/docs/Web/API/Crypto/getRandomValues) 原生函数，该函数可以获取符合密码学要求的安全的随机值。其兼容性见“[CanIUse: `crypto.getRandomValues()`](https://caniuse.com/#search=getRandomValues)”，不支持的浏览器可使用降级补丁（polyfill）。

> 另参考
> - [Online UUID Generator](https://www.uuidgenerator.net/)
> - [NPM: uuid](https://www.npmjs.com/package/uuid)
> - [UUID 规范：RFC4122](http://www.ietf.org/rfc/rfc4122.txt)