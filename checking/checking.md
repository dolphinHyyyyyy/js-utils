# 数据校验
检验数据是否合法。

## 密码复杂度
```html demo .doc
<input type="text" id="input" placeholder="输入密码" value="123456" />
<button onclick="var c = getComplexityOfPassword(input.value.trim()); output.textContent = c + ' ' + (c < 0 ? '太简单' : c == 0 ? '简单' : c < 3 ? '复杂' : '很复杂')">测试</button>
<div id="output"></div>
```

#### 原理
确定密码复杂度主要考查以下内容：
- 密码越长，复杂度越大
- 将字符分为四类：数字、小写字母、大写字母、其他字符。字符种类数越多，复杂度越大
- 重复、连续字符越多，复杂度越小
- 出现“asd”、“qwe”、“a123456”等常用密码的次数越高，复杂度越小