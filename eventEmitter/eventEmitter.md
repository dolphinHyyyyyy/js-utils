# 事件触发器
提供事件管理对象。

## 什么是事件
事件是一种设计模式，用于解决模块通信问题。
模块 A 可以通过事件通知模块 B，但模块 A 无需依赖模块 B。

### 定义事件
在模块 A 中可以创建一个事件触发器：
```js
import { EventEmitter } from "./eventEmitter"

const ee = new EventEmitter()
```

### 绑定事件
在模块 B 中绑定该事件：
```js
ee.on("hi", function (name) {
	console.log(name + " 来问好了")
})
```

### 触发事件
在模块 A 中触发已绑定的回调函数：
```js
ee.emit("hi", "小黑")
```
如果事件被绑定了多个回调函数，则这些函数会按绑定的顺序依次执行。

如果任一个事件函数返回 `false`，则 `emit()` 将返回 `false`，否则返回 `true`。

### 解绑事件
如果保留绑定的函数引用可解绑该事件：
```js
ee.off("hi", handleUserClick)

function handleUserClick(e) {
	console.log('点击', e)
}
```

如果同一个函数绑定多次，则必须解绑同样次数才能完全解绑。

> 另参考
> - {@link ../event/event.md}
> - [Node.js: Event](https://nodejs.org/api/events.html)