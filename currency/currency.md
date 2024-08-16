# 货币处理
货币精确运算和格式化。

直接使用 JavaScript 自带的数字作四则运算可能出现误差，如果需要处理货币应使用本组件提供的函数计算以确保精确度。

> [!] 本组件最大支持：10,000,000,000,000.00。

```html demo .doc
<input type="number" id="input" placeholder="输入金额" value="3000" />
<button onclick="output.textContent = formatCurrency(+input.value)">格式化</button>
<button onclick="output.textContent = formatCurrencyToTranditionalChinese(+input.value)">转中文大写</button>
<div id="output"></div>
```