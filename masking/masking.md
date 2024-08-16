# 数据脱敏
将数据的敏感部分换成 `*`。

> [!] 注意：所有数据应在后端脱敏；前端只适合做数据提交前的脱敏。

```html demo .doc
<input type="tel" id="tel" value="13111111111"><button onclick="tel.value = maskMobile(tel.value)">手机号脱敏</button>
<br>
<input type="tel" id="email" value="xuld@xuld.net"><button onclick="email.value = maskEmail(email.value)">手机号脱敏</button>
<br>
<input type="text" id="uname" value="木由"><button onclick="uname.value = maskChineseName(uname.value)">中文名脱敏</button>
<br>
<input type="text" id="cid" value="654022197901228286"><button onclick="cid.value = maskChineseID(cid.value)">身份证脱敏</button>
<br>
<input type="text" id="no" value="浙A00000"><button onclick="no.value = maskChineseCarNumber(no.value)">车牌脱敏</button>
```