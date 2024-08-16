# URL 处理
提供解析和格式化 URL 的工具函数。

```html demo .doc
<input type="text" id="input" value="http://tealui.com/components/util/url/index.html?sample=1#示例" size="60" />
<button onclick="output.textContent = JSON.stringify(parseURL(input.value), undefined, 2)">解析地址</button>
<pre id="output"></pre>
```

## 地址介绍
URL（**U**niform **R**esource **L**ocator，统一资源定位器）用于指定互联网上的任意资源。

目前软件行业使用的 URL 都遵循 [RFC1738 规范](http://www.ietf.org/rfc/rfc1738.txt)，完整的 URL 格式为（带方括号 `[]` 的表示可选项）：
```
协议: // [用户名 [: 密码] @] 主机名 [:端口号] / 路径 [? 查询参数] [# 哈希值]
```

### 协议（Protocol）
协议表示网络传输的格式，常见的协议有“HTTP”、“HTTPS”、“FTP”等。

协议以冒号（`:`）结尾，理论上协议名可以由冒号以外的任意字符组成，不区分大小写。

### 双斜杠（//, Slahses）
双斜杠是 URL 中的固定组成部分。它的存在主要是因为历史原因，为了向前兼容而被保留。

### 用户名（User Name）和密码（Password）
对于有些需要登录才能访问的资源，可以在 URL 指定一个用户名和密码，以冒号（`:`）分割。

常见的邮箱地址如“bug@tealui.com”中“bug”就是用户名。

### 主机名（Host Name）
主机名表示请求的服务器地址，可以是 IPv4 地址（如`127.0.0.1`）、IPv6 地址（如 `[::1]`）或域名（如 `www.tealui.com`）（不区分大小写）。

### 端口号（Port）
端口就像通道，一个服务器最多可以开放 65535 个不同的端口，以同时进行多种不同的网络通信。

端口号是一个 0-65535 之间的整数，一共分三类：
- 端口号 0-1023 为系统预留的端口号。
- 端口号 1024-49151 为已注册的端口号，由 [IANA](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml) 维护。
- 端口号 49152-65535 是可供程序使用的临时、动态端口号。

如果缺省了端口号，则默认根据协议指定。常见协议的默认端口号如下：

| 协议  | 默认端口 | 说明                      |
| ----- | -------- | ------------------------- |
| http  | 80       | 超文本传输协议            |
| https | 443      | 基于 SSL 加密的 HTTP 协议 |
| ftp   | 21       | 文本传输协议              |
| smtp  | 25       | 电子邮件传输协议          |
| ssh   | 22       | Unix 终端登录             |

主机名和端口号统称为主机（Host）。常见的跨域问题，指的就是当前页面的 URL 的主机和要访问的另一个 URL 的主机不同。

### 路径（Path）
路径总是以 `/` 开头，用于指定服务器上资源的位置，比如 `/path/to/file.html`。

需要注意的是，路径的含义是由服务器指定的，其可能区分大小写。多数服务器会自动删除路径多余的 `/`（比如 `/components///ui/` 等价于 `/components/ui/`），但这并不是绝对的。路径末尾有无 `/` 有时也指代不同的资源。

### 查询参数（Query）
在路径后面可以紧跟问号 `?` 插入一个或多个查询参数，查询参数的格式为：
```
? 参数名1 = 参数值2 & 参数名2 = 参数值2 & ...
```

通过查询参数，服务器可以针对同一个资源返回不同的信息。

### 哈希值（Hash）
在查询参数后面可以紧跟问号 `#` 插入一个哈希值。哈希值用于表示页面内的资源位置，一般地，如果有哈希值，浏览器会在打开页面时自动滚到页面中 `name` 或 `id` 等于该哈希值的节点。

> [!] 注意
> 如果同时存在查询参数和哈希值，必须先写查询参数，后写哈希值。否则系统会将 `#` 后面的内容（包括 `?` 等）全部作哈希值处理。由于这是一个非常普遍的错误，有些框架也能支持解析 `#` 后的“查询参数”，但这是不符合 URL 规范的。

### URL 组成示例
URL “`http://tealui.com/components/util/url/index.html?sample=1#示例`” 
由以下部分组成：
- 协议(protocol)：`http:`
- 双斜杠(slashes)：`//`
- 主机名(hostname)：`tealui.com`
- 路径(path)：`/components/util/url/url.html`
- 查询参数(query)：`?sample=1`
- 哈希值(hash)：`#示例`

## 绝对地址和相对地址
绝对地址即一个完整的 `URL`，而相对地址则可以基于一个基绝对地址，计算实际的绝对地址。

给定一个基地址 `http://tealui.com/components/util/index.html` 和相对地址 `./../url/../index.html`，其计算方式如下：
1. 删除基地址最后一个斜杠 `/` 后的所有内容：`http://tealui.com/components/util/`
2. 跳过相对地址开头的 `./`，基地址不变：`http://tealui.com/components/util/`
3. 相对地址以 `../` 开头表示基地址回到上层：`http://tealui.com/components/`
4. 相对地址以 `url/` 开头，则直接追加到基地址：`http://tealui.com/components/url/`
5. 相对地址以 `../` 开头表示基地址回到上层：`http://tealui.com/components/`
6. 相对地址以 `index.html` 开头，则直接追加到基地址：`http://tealui.com/components/index.html`，其为最终计算结果。

## 处理 URL

### 解析和格式化
使用 `parseURL` 可以提取 URL 中的每个组成部分；使用 `formatURL` 可以组装回字符串。
```ts
import {parseURL, formatURL} from "./url"

const url = parseURL(`http://www.tealui.com/`)
url.port = 8081
const newURL = formatURL(url) // "http://www.tealui.com:8081/"
```

### 相对和绝对地址互相转换
使用 `resolveURL` 可以将相对地址转为绝对地址；使用 `relativeURL` 则相反。

```ts
import {resolveURL, relativeURL} from "./url"

resolveURL("http://www.tealui.com", "components") // "http://www.tealui.com/components"
relativeURL("http://www.tealui.com", "http://www.tealui.com/components") // "components"
```