# 事件装饰器
装饰一个事件字段，使其支持通过 `+=` 和 `-=` 语法糖绑定和解绑事件。

## 什么是事件
事件是一种设计模式，用于解决模块通信问题。
模块 A 可以通过事件通知模块 B，但模块 A 无需依赖模块 B。

### 定义事件
在模块 A 中可以使用以下方式定义一个名为 `onUserClick` 的事件：
```js
import { event } from "./event"

class A {
	@event onUserClick
}
```

### 绑定事件
在模块 B 中可以使用 `+=` 语法绑定该事件：
```js
var a = new A()
a.onUserClick += e => {
	console.log("事件 onUserClick 被触发了，参数：", e)
}
```

### 触发事件
在模块 A 中通过函数调用的方式执行已绑定的回调函数：
```js
a.onUserClick?.()
// 也可以在触发时传递参数，如：
a.onUserClick?.("data")
```
其中，`?.` 是必须的，因为当事件未绑定过时，该事件的值是 `undefined`。

如果事件被绑定了多个回调函数，则这些函数会按绑定的顺序依次执行。

### 解绑事件
使用 `-=` 相同的函数引用可解绑该事件：
```js
var a = new A()
a.onUserClick += handleUserClick // 注意不能用箭头函数，不然解绑时拿不到该引用
a.onUserClick(1)

a.onUserClick -= handleUserClick
a.onUserClick(3)

function handleUserClick(e) {
	console.log('点击', e)
}
```

如果同一个函数绑定多次，则必须解绑同样次数才能完全解绑。

> 事件装饰器仅是一个语法糖，也可以使用标准的 {@link ../eventEmitter/eventEmitter.md} 实现相同的功能。