# 标记位
将多个布尔值合并成一个整数。

## 标记位的原理
将整数写成二进制，每位都可以用来表示一个布尔值。

## 定义标记位
为了使代码更具语义化，可以使用 TypeScript 的枚举定义所有标记位：
```ts
enum Features {
    tall = 1 << 0,
    rich = 1 << 1,
    handsome = 1 << 2
}
```
也可以使用 JavaScript 的对象代替：
```js
const Features = {
    tall: 1 << 0,
    rich: 1 << 1,
    handsome: 1 << 2
}
```

## 使用标记位
`0` 表示不含任何标记位，使用位或运算可以得到多个标记位的组合值：
```js
const man = Features.tall | Features.handsome
```

使用库中提供的 `hasFlag` 判断对象是否包含指定的标记位：
```js
const isTall = hasFlag(man, Features.tall) // true
const isRich = hasFlag(man, Features.rich) // false
```

使用库中提供的 `setFlag` 可以得到更新标记位后的值：
```js
const man2 = setFlag(man, Features.handsome, false) // Features.tall
```