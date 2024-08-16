# 缓存装饰器
装饰一个方法，当第二次用相同的参数调用该函数时，会直接返回第一次的结果。

参数相同的标准为：值或引用相同，或者是内容相同的数组。

```ts demo
import { memoized } from "./memoized"

class A {
	@memoized fn(x, y) {
		console.log("fn(", x, ",", y, ")")
		return x + y
	}
}

const a = new A()
a.fn(1, 2)
a.fn(1, 2)
a.fn(1, 3)
```