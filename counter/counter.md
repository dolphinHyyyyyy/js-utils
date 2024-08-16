# 计时器
实现倒计时和正计时效果。

## 倒计时
```js demo
import { countDown } from "./counter"

countDown(new Date('2020/1/1'), (days, hours, minutes, seconds, total) => {
    __root__.textContent = `还有${days}天${hours}小时${minutes}分${seconds}秒`
}, new Date('2019/1/1'))
```

## 隐藏天数
```js demo
import { countDown } from "./counter"

countDown(new Date('2020/1/1'), (days, hours, minutes, seconds, total) => {
    __root__.textContent = `还有${+days * 24 + +hours}小时${minutes}分${seconds}秒`
}, new Date('2019/1/1'))
```

## 正计时
```js demo
import { countUp } from "./counter"

countUp(new Date('2011/8/12'), (years, days, hours, minutes, seconds, total) => {
    __root__.textContent = `TealUI 已发布：${years}年${days}天${hours}小时${minutes}分${seconds}秒`
})
```