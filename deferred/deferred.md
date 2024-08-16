# 延时对象
同时等待多个异步任务。

## 同时等待多个异步任务
`Promise.all` 可以用于同时等待多个 `Promise`，并在所有 `Promise` 完成之后统一回调。
但 `Promise.all` 只适用于固定的 `Promise` 数，并不支持动态增删要等待的 `Promise`。

`Deferred` 则主要解决等待不确定数目的异步的任务。

```js demo
import { Deferred } from "./deferred"

const deferred = new Deferred()

// 等待所有异步任务执行完成
deferred.then(() => {
    console.log("all promise resolved")
})

deferred.reject() // 表示准备执行一个新的异步任务

Promise.resolve().then(() => {
	deferred.resolve() // 表示当前异步任务已执行完毕
})
```