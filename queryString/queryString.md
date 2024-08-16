# 查询字符串
解析和格式化查询字符串（如 `foo=1&goo=2&goo=3`）。

> [!] 注意
> 本模块实现了纯 JS 解析查询字符串的逻辑，对于多数应用，建议使用 {@link ../../web/query/query.md}，该模块使用了浏览器内置的 [URLSearchParams](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)，性能会更高。